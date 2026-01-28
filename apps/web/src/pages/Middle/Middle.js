import ImageCarousel from '@ui/components/UI/widgets/ImageCarousel';
import './Middle.scss';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { URL_CONFIG } from "@utils/Config/URLs";
import { PanelServices } from "@utils/services/PanelServices";
import BrandSpecialities from "./BrandSpecialities";
import Categories from "./Categories";

const Middle = ({isMobile, loading, setLoading, setImageRefreshKey, imageRefreshKey, showSnackBar}) => {
    const [images, setImages] = useState([]);
    const { getGridData } = PanelServices();

      useEffect(()=>{
        const loadImages = async () =>{
            setLoading(true);
            await getGridData(URL_CONFIG.PUBLIC_URL+"/getCarouselImages?deviceType="+(isMobile?"mobile":"pc")).then((res) => {
                setImages(res?.data);
                setLoading(false);
              })
              .catch((error)=>{
                setLoading(false);
              })
              .finally(()=>{
              });
        }
        loadImages();
      }, [isMobile])
    return(
            <div className='middle-main-container2'>
                {/* <h2>Middle</h2> */}
                <div style={{width:'100%'}}>
                    <ImageCarousel images={images} setImages={setImages} aspectRatio={isMobile? 3/4: 2.5} imageRefreshKey={imageRefreshKey}/>
                    <BrandSpecialities/>
                    <Categories 
                      isMobile={isMobile}                         
                      setLoading={setLoading}
                      loading={loading}
                      showSnackBar={showSnackBar}
                    />
                </div>
            </div>
    );
}
export default Middle;