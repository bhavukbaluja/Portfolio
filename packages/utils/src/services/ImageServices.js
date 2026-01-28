import { useCallApi } from "@utils/helper/CallApi";

export const ImageServices = () => {
  const { CallApi } = useCallApi();

  const uploadImage = async (url, data) => {
    return await CallApi(url, "POST", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    });
  }
  const getImage = async (url, data) =>{
    return await CallApi(url, "GET", data)
  }

  const cropImage = async (url, data) => {
    return await CallApi(url, "POST", data, {});
  }

  const postImageforUrl = (payload) => {
    /* Use Only this one if processing image and giving url from backend */
    /*  let url = "/profile/uploadimage.json";
    return await CallApi(url, "GET", payload); */
  
    /* Remove this  
      Using the Blob Image Dataurl here*/
    console.log("Payload", payload);
    const ObjectUrl = payload;
    return {
      status: 200,
      message: "Data Loaded Successfully",
      data: {
        imgurl: ObjectUrl,
      },
    };
  }
  


return { uploadImage, cropImage , postImageforUrl, getImage};
};
