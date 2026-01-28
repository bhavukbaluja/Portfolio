import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import BreadCrumb from "./BreadCrumb";

const Header = ({isMobile, selectedItem, setSelectedItem, onLoginClick, imageRefreshKey,  setImageRefreshKey, setLoading}) => {

    return(
        <div className="header-main-container">
            <NavBar isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} onLoginClick={onLoginClick}  imageRefreshKey={imageRefreshKey} setImageRefreshKey={setImageRefreshKey}/>
            <BreadCrumb isMobile={isMobile} setLoading={setLoading}/>
        </div>
    )    
}
export default Header;