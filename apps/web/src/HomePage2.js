import React from "react";
import Middle from "./pages/Middle/Middle";
const HomePage=({isMobile, loading, setLoading, setImageRefreshKey, imageRefreshKey})=>{
    return(
        <div className="main-container">
          <Middle isMobile={isMobile} setLoading={setLoading} loading={loading}  setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>
        </div>
    )
}
export default HomePage;