import React, { useEffect, useRef, useState } from "react";
import BaseImageUpload from "./BaseImageUpload";
import fallbackImgLight from "@assets/UploadImage-light.png"; // Light mode fallback
import fallbackImgDark from "@assets/UploadImage-dark.png";   // Dark mode fallback
import { URL_Upload_Image, URL_CONFIG, URL_Crop_Image } from "@utils/Config/URLs";
import { fetchImage } from '@utils/helper/Helper';
import BaseShowImage from "./BaseShowImage";
import { Box, useTheme } from "@mui/material"; // ✅ Import useTheme
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./Base.scss";

const ImageUploaderGrid = ({ maxImages = 10, imageRefreshKey, entity, setLoading, setImageRefreshKey, setImageUrls, imageUrls, readOnly, aspect, imageWidth }) => {
  
  const [images, setImages] = useState([]);
  let aspectRatio = aspect || 2/3;
  const prevKeyRef = useRef(null);
  const prevUrlsRef = useRef(null);
  
  // ✅ 1. Get Current Theme Mode
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // ✅ 2. Select Fallback Image based on Mode
  const fallbackImg = isDark ? fallbackImgDark : fallbackImgLight;

  useEffect(() => {
    const isSameUrls = JSON.stringify(prevUrlsRef.current) === JSON.stringify(imageUrls);
    const isSameKey = prevKeyRef.current === imageRefreshKey;
  
    if (isSameUrls && isSameKey) return;
  
    prevUrlsRef.current = imageUrls;
    prevKeyRef.current = imageRefreshKey;
  
    const loadImages = async () => {
      const imageObjs = await Promise.all(
        imageUrls.map(async (url) => {

          const refreshedUrl = `${url}?t=${imageRefreshKey}`;
          const blobUrl = await fetchImage(URL_CONFIG.API_URL + "/" + refreshedUrl);
          return { url: blobUrl, isUploaded: true };
        })
      );
  
      // Add only one fallback placeholder if none exists
      if (imageObjs.length < maxImages) {
        imageObjs.push({ url: null, isUploaded: false });
      }
  
      setImages(imageObjs);
      for(let imageURL of imageObjs){
        console.log(imageURL?.url);
      }
    };
  
    loadImages();
  }, [imageUrls, imageRefreshKey, maxImages]);
  

  const imageUploadRefs = useRef([]);

  const handleUploadClick = (index) => {
    if (imageUploadRefs.current[index]) {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = await imageUploadRefs.current[index].uploadImageFromParent(file);
          if (imageUrl) {
            setImageRefreshKey(Date.now());

            setImageUrls((prev) => {
              let images = [];
              let len = index<prev.length? prev.length : prev.length+1
              for(let i=0; i< len; i++){
                if(i!=index){
                  images.push(prev[i]);
                }
                else{
                  images.push(imageUrl);
                }
              }
              return(images);
            });
            const updated = [...images];
            const refreshedUrl = `${imageUrl}?t=${Date.now()}`;
            const blobUrl = await fetchImage(URL_CONFIG.API_URL + "/"+refreshedUrl);
            updated[index] = { url: blobUrl, isUploaded: true };
  
            // 🔁 Only add one fallback slot after successful upload if space is available
            const hasFallback = updated.some((img) => img.url === null && !img.isUploaded);
            if (!hasFallback && updated.length < maxImages) {
              updated.push({ url: null, isUploaded: false });
            }
  
            setImages(updated);
          }
        }
      };
      fileInput.click();
    }
  };
  

  const handleReplace = (index) => {
    handleUploadClick(index);
  };

  const handleDelete = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);

    const updatedUrls = [...imageUrls];
    updatedUrls.splice(index, 1);
    setImageUrls(updatedUrls);
  };

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {images.slice(0, maxImages).map((image, index) => (
        <div 
            key={index} 
            style={{ 
                width: imageWidth? imageWidth : 150, 
                // ✅ Updated Border color logic (You can use theme.palette.divider if you prefer standard MUI borders)
                border: `1px solid ${isDark ? 'var(--maindark-color)' : 'var(--mainlight-color)'}`, 
                borderRadius: '7px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                flexDirection: 'column', 
                alignItems: 'center',
                backgroundColor: theme.palette.background.paper // ✅ Ensure background matches theme
            }}
        >
          <div style={{height: '100%' }}>
          <BaseShowImage 
            // ✅ Use the dynamic fallbackImg variable
            imageUrl={image?.url || fallbackImg} 
            alt={`Image-${index+1}`}
            aspectRatio={aspectRatio}
          />
          </div>
          {image.isUploaded ? (
            <Box style={{ marginTop: 5, borderRadius: '7px', marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
              <button 
                type="button"
                className="small-button"
                disabled={readOnly}
                onClick={() => handleReplace(index)}
              >
                  <UpgradeOutlinedIcon/> 
              </button>
              <button 
                type="button"
                className="small-delete-button"
                onClick={() => handleDelete(index)}
                disabled={readOnly}
                style={{ marginLeft: 5 }}
              >
                  <DeleteOutlineOutlinedIcon/>
              </button>
            </Box>
          ) : (
            <Box style={{ marginTop: 5, marginBottom: 5 }}>
              <button  
                type="button"
                className="small-button"
                disabled={readOnly}
                onClick={() => handleUploadClick(index)}
              >
                  <UpgradeOutlinedIcon/> 
              </button>
            </Box>
          )}
          {/* Hidden BaseImageUpload for logic */}
          <BaseImageUpload
            ref={(el) => (imageUploadRefs.current[index] = el)}
            upload_url={URL_Upload_Image+"?entityType="+entity} // customize as needed
            setLoading={setLoading}
            imageUrl={URL_CONFIG.API_URL + "/"+image?.url}
            imageRefreshKey={Date.now()}
            setImageRefreshKey={setImageRefreshKey}
            entity={entity}
            croppable={true}
            isProfileImg={false}
            cropImage_Url={URL_Crop_Image}
            aspectRatio={aspectRatio}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageUploaderGrid;