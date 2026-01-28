// DashboardLayout.js
import React, { useRef, forwardRef } from "react";
import SideBarHeader from "../pages/Header/SideBarHeader.js";
import "./Layouts.scss";
import { Outlet } from "react-router-dom";
import BreadCrumb from "../pages/Header/BreadCrumb.js";

export const DashboardContext = React.createContext(null);

const DashboardLayout = forwardRef(({ children, ...props }, ref) => {
  return (
    <DashboardContext.Provider value={{ sidebarHeaderRef: ref }}>
      <div className="dashboard-layout">
        <SideBarHeader ref={ref} {...props} />
        <div className="dashboard-content">
          <BreadCrumb isMobile={props?.isMobile} setLoading={props?.setLoading}/>
          <Outlet />
        </div>
      </div>
    </DashboardContext.Provider>
  );
});

export default DashboardLayout;
