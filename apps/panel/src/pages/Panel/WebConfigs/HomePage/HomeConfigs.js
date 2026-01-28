import React from "react";
import HomePageCarousel from "./HomePageCarousel";

const HomeConfigs = ({isMobile, setImageRefreshKey, imageRefreshKey, setLoading, showSnackBar}) =>{
    return(
        <HomePageCarousel isMobile={isMobile} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey} setLoading={setLoading} showSnackBar={showSnackBar}/>
    )
}
export default HomeConfigs;