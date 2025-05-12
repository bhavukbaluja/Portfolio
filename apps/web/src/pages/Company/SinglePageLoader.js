// import GenericPageRenderer from "./GenericPageRenderer"; // Adjust the import path as needed
import "./AboutUs.scss";
import { Page_URL, URL_CONFIG } from '@utils/Config/URLs';
// import { convertEntities } from '@utils/helper/Helper';
import { PanelServices } from '@utils/services/PanelServices';
import { Box } from "@mui/material";
import he from "he";
import { RichTextReadOnly } from "mui-tiptap";
import React, { useContext, useEffect, useState } from "react";
import useExtensions from "@ui/components/TipTap/useExtensions";

const SinglePageLoader = ({ page, isMobile, loading, setLoading }) => {

    const [pageData, setPageData] = useState("");
    const { getGridData } = PanelServices();
    const extensions = useExtensions({
        placeholder: "Loading Content...",
    });
    useEffect(() => {
        const fetchPage = async () => {
            await getGridData(Page_URL+`/getPageData?id=`+page?.value).then((res)=>{
            setPageData(he.decode(res?.description).replaceAll("$BASE_URL",URL_CONFIG.API_URL));
            
        }) .catch ((err)=> {
            console.error("Failed to fetch page data:", err);
        })
            setLoading(false);
        }

        fetchPage();
    }, [page]);

    if (loading) return <div>Loading...</div>;
    if (!pageData) return <div>Error loading page</div>;

    return (
        // <GenericPageRenderer
        //   title={title}
        //   htmlContent={pageData.description}
        //   isMobile={isMobile}
        // />
        <div container className={isMobile? "about-us-main-container-mobile" : "about-us-main-container-pc"}>
            <Box mt={3}>          
                <RichTextReadOnly
                content={pageData}
                extensions={extensions}
                />
            </Box>
            </div>
    );
};

export default SinglePageLoader;
 