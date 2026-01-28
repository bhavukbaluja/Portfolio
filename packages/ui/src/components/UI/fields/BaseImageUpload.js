import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { URL_Crop_ProfileImage, URL_CONFIG } from "@utils/Config/URLs";
import { loadProfileImage, fetchImage } from "@utils/helper/Helper";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { ImageServices } from "@utils/services/ImageServices";
import ReactCropComponent from "../widgets/ReactCropComponent";

 
 const BaseImageUpload = forwardRef(({ upload_url, setLoading, setTempSrc, showSnackBar, croppable = false, imageUrl, imageRefreshKey, setImageRefreshKey, entity, isProfileImg = true, aspectRatio, cropImage_Url }, ref, ) =>{
     const { lang } = React.useContext(LanguageContext);
     const {uploadImage, cropImage} = ImageServices();
     const [imageTempUrl, setImageTempUrl] = useState("");
     const [openCropper, setOpenCropper] = useState(null);
     const [isCropper, setIsCropper] = useState(false);
    const imageHandleUpload = useCallback((file) => {
        if (file) {
          return uploadImg(file); // ✅ return the Promise
        }
      }, []);
      

  // 👇 Expose function to parent
  useImperativeHandle(ref, () => ({
    uploadImageFromParent(file) {
      return imageHandleUpload(file); // ✅ returns the URL
    }
  }));
  

  const uploadImg = async (file) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("uploadedFile", file);
    try {
      const res = await uploadImage(upload_url, formData)
      if (res?.success) {
        if(setImageRefreshKey){
          setImageRefreshKey(Date.now());
        }
        if(setTempSrc){
          setTempSrc(res?.tempUrl);
        }
        if(croppable){
          let blobUrl = "";
          if(isProfileImg){
          //   const refreshedUrl = `${imageUrl}?t=${imageRefreshKey}`;
            blobUrl = await loadProfileImage(imageUrl, Date.now());
          }
          else{
            blobUrl = await fetchImage(URL_CONFIG.API_URL + "/"+res?.tempUrl, Date.now());
          }
          setOpenCropper(blobUrl);
          setImageTempUrl(res?.tempUrl);
          setIsCropper(true);
        }
        if(showSnackBar){
          return true;
        }
        return res?.tempUrl; // ✅ return the uploaded URL
      } else if (res.status === 400) {
        console.warn("Bad request during image upload");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleChangeBtnClick = () => {};
  const fieldNamePrefix = "uploadPartnerLogo";
  /* Handle Croper Save */
  const cropSaveHandler = async (url, crop, completedCrop) => {
    // Extract just the image path or name from the URL if needed
    // For example, if your URL is something like /uploads/image.png
    // You can extract the relative path from it
    // const imagePath = new URL(url, window.location.origin).pathname;
  
    let jsonData = {
      // imagePath: imagePath, // send this to backend to locate image
      W: Math.round(completedCrop.width).toFixed(),
      H: Math.round(completedCrop.height).toFixed(),
      X1: Math.round(completedCrop.x).toFixed(),
      Y1: Math.round(completedCrop.y).toFixed(),
      url: imageTempUrl,
      headerlogo: "false", // or "true" depending on your logic
    };
  
    await cropImage(cropImage_Url || (URL_Crop_ProfileImage+entity+"Img"), jsonData)
      .then((res) => {
        setImageRefreshKey(Date.now());
        // Backend should return new cropped image URL
        if (res && (res.status === 200 || res.includes("success"))) {
          // const newCroppedImageUrl = res.data?.croppedImageUrl;
          if(showSnackBar){
            showSnackBar(Literal[lang].imageCropped);
          }
          // console.log("Image cropped successfully:", newCroppedImageUrl);
        }
      })
      .catch((err) => {
        console.error("Cropping failed:", err);
      });
  
    // Finally, close the cropper dialog
    setOpenCropper(null);
  };
  
  return(
    <div>
    <ReactCropComponent
        handleImageChange={handleChangeBtnClick}
        show={isCropper}
        setShow={setIsCropper}
        imgSrc={openCropper}
        setImgSrc={setOpenCropper}
        onHandlecropSave={cropSaveHandler}
        setImageRefreshKey={setImageRefreshKey}
        namePrefix={fieldNamePrefix}
        aspectRatio={aspectRatio || 1}
        setLoading={setLoading}
    />
    </div>
  );
});
export default BaseImageUpload;
