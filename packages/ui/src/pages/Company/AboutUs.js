import { Box } from "@mui/material";
import he from "he";
import { RichTextReadOnly } from "mui-tiptap";
import React, { useContext, useEffect, useState } from "react";
import useExtensions from "@ui/components/TipTap/useExtensions";
import { URL_About_Us, URL_CONFIG } from "@utils/Config/URLs";
import { AccountServices } from "@utils/services/AccountServices";
import "./AboutUs.scss";
import { AuthContext } from "@utils/helper/ApiConfig/AuthProvider";

const AboutUs=({isMobile})=>{
    const { user } = useContext(AuthContext);
    const [data, setData] = useState("");
    const { getAboutUs } = AccountServices();
    const extensions = useExtensions({
        placeholder: "Loading Content...",
    });
    useEffect(()=>{
        const fetchData=async ()=>{
            let response = await getAboutUs(URL_About_Us,{}).then((res)=>{
                setData(he.decode(res?.["About Us"]).replaceAll("$BASE_URL",URL_CONFIG.API_URL));
            }).catch((error)=>{

            });
        }
        fetchData();
    },[]);
    return(
        <div container className={isMobile? "about-us-main-container-mobile" : "about-us-main-container-pc"}>
           <Box mt={3}>          
            <RichTextReadOnly
              content={data}
              extensions={extensions}
            />
          </Box>
        </div>
    )
}
export default AboutUs;