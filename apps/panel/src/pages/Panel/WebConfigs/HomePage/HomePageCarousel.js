import { Box, Divider, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import ImageUploaderGrid from "@ui/components/UI/fields/ImageUploaderGrid";
import { WebCarouselImages_URL, URL_CONFIG } from "@utils/Config/URLs";
import { PanelServices } from "@utils/services/PanelServices";

const HomePageCarousel = ({isMobile, setImageRefreshKey, imageRefreshKey, setLoading, showSnackBar})=>{

    const { lang } = useContext(LanguageContext);
    const [ imageUrlsForPC, setImageUrlsForPC] = useState([]);
    const [ imageUrlsForMobile, setImageUrlsForMobile] = useState([]);
    let entity="homePageCarousel";
    const { getGridData, updateEntity } = PanelServices();

    const loadImages = async () =>{
        setLoading(true);
        await getGridData(URL_CONFIG.PUBLIC_URL+"/getCarouselImages?deviceType=all").then((res) => {
            setImageUrlsForPC(res?.data?.pc);
            setImageUrlsForMobile(res?.data?.mobile);
            setLoading(false);
          })
          .catch((error)=>{
            setLoading(false);
          })
          .finally(()=>{
          });
    }
    
    useEffect(()=>{
        loadImages();
    },[])

    const clickSubmit = async () => {
        setLoading(true);
    
        const jsonData = {
          pc: imageUrlsForPC,
          mobile: imageUrlsForMobile,
        };

        const url = WebCarouselImages_URL;
    
        await updateEntity(url, jsonData)
          .then((response) => {
            showSnackBar(response?.message || response);
            setDialogOpen(false);
            refresh();
            resetForm();
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      };
    
    return(
        <div className="middle-main-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography
                variant='h3'
            >
                {Literal[lang].homePage}
            </Typography>
            <Divider/>
            <Typography
                variant='h5'
            >
                {Literal[lang].homePageCarousel}
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="stretch" gap={2} width="100%">
                <Box sx={{ flex: 1, minWidth: "48%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5">{Literal[lang].forPC}</Typography>
                    <ImageUploaderGrid
                        maxImages={15}
                        imageUrls={imageUrlsForPC}
                        setImageUrls={setImageUrlsForPC}
                        imageRefreshKe={imageRefreshKey}
                        entity={entity}
                        setLoading={setLoading}
                        aspect={2}
                        readOnly={false}
                        setImageRefreshKey={setImageRefreshKey}
                        imageWidth='48%'
                    />
                </Box>

                <Divider
                    orientation="vertical"
                    sx={{ width: '1px', color: 'transparent' }}
                />

                <Box sx={{ flex: 1, minWidth: "48%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5">{Literal[lang].forMobile}</Typography>
                    <ImageUploaderGrid
                        maxImages={15}
                        imageUrls={imageUrlsForMobile}
                        setImageUrls={setImageUrlsForMobile}
                        imageRefreshKe={imageRefreshKey}
                        entity={entity}
                        setLoading={setLoading}
                        aspect={3/4}
                        readOnly={false}
                        imageWidth='30%'
                        setImageRefreshKey={setImageRefreshKey}
                    />
                </Box>
            </Box>
            <Box style={{padding: '30px', display: 'flex', gap: 20}}>
                <button 
                    type="button"
                    onClick={loadImages}
                    className="form-skip-button"
                >
                    {Literal[lang].reset}
                </button>
                <button 
                    type="button"
                    onClick={clickSubmit}
                    className="form-button"
                >
                    {Literal[lang].save}
                </button>
            </Box>

        </div>
    )
}
export default HomePageCarousel;