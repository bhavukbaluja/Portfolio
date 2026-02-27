import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

// 1. IMPORT THE SERVICE ICONS
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import MonitorOutlinedIcon from '@mui/icons-material/MonitorOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { OrderServices } from "@utils/services/OrderServices";
import propertiesData from "@utils/Config/Properties.json";
import React, {
  forwardRef,
  useContext,
  useMemo,
  useState,
} from "react";
import Sidebar from "./SideBar";

// 2. CREATE THE MAPPING OBJECT (Without the .tile-icon class, as the sidebar likely has its own icon styling)
const MuiIconMap = {
  LayersOutlined: <LayersOutlinedIcon />,
  WebOutlined: <WebOutlinedIcon />,
  MonitorOutlined: <MonitorOutlinedIcon />,
  StorageOutlined: <StorageOutlinedIcon />,
  ApiOutlined: <ApiOutlinedIcon />,
  DatasetOutlined: <DatasetOutlinedIcon />,
  StorefrontOutlined: <StorefrontOutlinedIcon />,
  CloudUploadOutlined: <CloudUploadOutlinedIcon />,
  BuildOutlined: <BuildOutlinedIcon />,
  BugReportOutlined: <BugReportOutlinedIcon />
};

const Header = forwardRef(
  (
    {
      isMobile,
      loading,
      setLoading,
      selectedItem,
      mobileOpen,
      setMobileOpen,
      handleDrawerToggle,
      setSelectedItem,
      onLoginClick,
      imageRefreshKey,
      setImageRefreshKey,
    },
    ref
  ) => {
    const { getOrdersCountforAllStatuses } = OrderServices();
    const [counts, setCounts] = useState({});
    const { lang } = useContext(LanguageContext);
    
    const sideBarContent = useMemo(() => {
      
      const services = propertiesData[lang]?.services || [];

      const allMenuItems = [
        {
          text: "home",
          icon: <HomeOutlinedIcon/>,
        },
        {
          text: "about",
          icon: <PersonOutlineOutlinedIcon />,
        },
        { 
          text: "resume", 
          icon: <DescriptionOutlinedIcon />,
        },
        { 
          text: "portfolio", 
          icon: <CollectionsOutlinedIcon />,
        },
        { 
          text: "services", 
          icon: <DynamicFeedOutlinedIcon />,
          // 3. MAP THE STRING TO THE ICON COMPONENT HERE
          subItems: services.map((service, index) => ({
            text: service.title,
            path: `#service-${index}`,
            icon: MuiIconMap[service.icon] || <DynamicFeedOutlinedIcon /> // Fallback icon just in case
          }))
        },
        { 
          text: "contact", 
          icon: <EmailOutlinedIcon />,
        },
      ];

      const filterMenuItems = (items) => {
        return items.reduce((acc, item) => {
          let processedSubItems = item.subItems;
          if (item.subItems && item.subItems.length > 0) {
            processedSubItems = filterMenuItems(item.subItems);
          }
          acc.push({ ...item, subItems: processedSubItems });
          return acc;
        }, []);
      };

      return filterMenuItems(allMenuItems);

    }, [counts, lang]); 

    return (
      <div className="header-main-container">
        <Sidebar
          isMobile={isMobile}
          selectedItem={selectedItem}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          setSelectedItem={setSelectedItem}
          onLoginClick={onLoginClick}
          imageRefreshKey={imageRefreshKey}
          setImageRefreshKey={setImageRefreshKey}
          sideBarContent={sideBarContent}
        />
      </div>
    );
  }
);

export default Header;