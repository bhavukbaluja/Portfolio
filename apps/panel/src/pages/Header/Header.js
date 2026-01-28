import React, { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar";
import BreadCrumb from "./BreadCrumb";
const Header = ({isMobile, selectedItem, setSelectedItem, onLoginClick, imageRefreshKey,  setImageRefreshKey}) => {

    return(
        <div className="header-main-container">
            <NavBar isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} onLoginClick={onLoginClick}  imageRefreshKey={imageRefreshKey} setImageRefreshKey={setImageRefreshKey}/>
            <BreadCrumb isMobile={isMobile} />
        </div>
    )    
}
export default Header;