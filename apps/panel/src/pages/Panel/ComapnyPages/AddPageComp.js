import React, { useEffect, useRef, useState } from "react";
import BaseTipTapEditor from "@ui/components/TipTap/BaseTipTapEditor";
import { URL_About_Us, URL_CONFIG, URL_Update_About_Us, URL_Upload_Image } from "@utils/Config/URLs";
import { AccountServices } from "@utils/services/AccountServices";
import BaseImageUpload from "@ui/components/UI/fields/BaseImageUpload";
import "./Page.scss";

const AddPageComp = ({isMobile, loading, setLoading, showSnackBar, data, setData, clickSubmit, setImageRefreshKey, readOnly}) =>{
    // const { getAboutUs, updateAboutUs } = AccountServices();
    // const [file, setFile] = useState(null);
    const [tempSrc, setTempSrc] = useState(null);
    const imageUploaderRef = useRef();

    const saveData = async (content)=>{
        setLoading(true);
        // const jsonData = {};
        // jsonData["About Us"] = content;

        // await updateAboutUs(URL_Update_About_Us, jsonData ).then((response)=>{
        //     if (response?.contains("success")) {
        //         showSnackBar(response);
        //     }
        //     }).catch((error)=>{
        // });
        setData(content);
        clickSubmit(content);
        setLoading(false);
    }

    const imageHandleUpload = async (event) => {
        const files = event;
        if (!files || !Array.isArray(files) || files.length === 0) {
          console.warn("No valid files to upload.");
          return;
        }
      
        const file = files[0];
        if (file && imageUploaderRef.current) {
          setLoading(true);
          let tempSrc = await imageUploaderRef.current.uploadImageFromParent(file);
          return tempSrc;
        }
      };
      
      

    return(
        <div container className={isMobile? "about-us-main-container-mobile" : "about-us-main-container-pc"}>
            <BaseTipTapEditor 
                saveData = {saveData} 
                prevContent = {data} 
                setPrevContent = {setData}
                imageHandleUpload={imageHandleUpload}
                readOnly={readOnly}
            />
            <BaseImageUpload 
                upload_url={URL_Upload_Image+"?entityType=companyPage"} 
                setLoading={setLoading} 
                setTempSrc={setTempSrc} 
                ref={imageUploaderRef}
                setImageRefreshKey={setImageRefreshKey}    
            />
      </div>
    )
}
export default AddPageComp;