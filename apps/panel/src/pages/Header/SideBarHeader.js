import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { OrderServices } from "@utils/services/OrderServices";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Sidebar from "./SideBar";

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
    
    // ✅ Get User Role
    // const { user } = useContext(AuthContext);
    // // Ensure we handle case sensitivity if DB returns 'admin' vs 'ADMIN'
    // const userRole = user?.role ? user.role.toUpperCase() : null; 
    
    // Wrapped in useMemo to recalculate when counts/lang/userRole changes
    const sideBarContent = useMemo(() => {
      
      // Helper function defined inside useMemo to access 'counts'
      const getAlertCount = (textKeys = []) => {
        let total = 0;
        textKeys.forEach((key) => {
          const statuses = Literal[lang].orderPages[key]?.statuses || [];
          statuses.forEach((status) => {
            total += counts?.[status] || 0;
          });
        });
        return total;
      };

      // 1. Define All Possible Items
      // Note: If 'allowedRoles' is missing, it implies accessible by BOTH Admin & Manager
      const allMenuItems = [
        {
          text: "home",
          icon: <HomeOutlinedIcon/>,
          // allowedRoles: ["ADMIN", "MANAGER"], // Optional: implied since only they can login
        },
        {
          text: "about",
          icon: <PersonOutlineOutlinedIcon />,
        },
        { text: "resume", icon: <DescriptionOutlinedIcon /> },
        { text: "portfolio", icon: <CollectionsOutlinedIcon /> },
        { text: "services", icon: <DynamicFeedOutlinedIcon /> },
        { text: "contact", icon: <EmailOutlinedIcon /> },
        
      ];

      // 2. Filter Function based on 'userRole'
      const filterMenuItems = (items) => {
        return items.reduce((acc, item) => {
          // Rule 1: Check Permissions
          if (item.allowedRoles && !item.allowedRoles.includes(userRole)) {
            return acc; // Skip this item if role doesn't match
          }

          // Rule 2: Recursively filter subItems if they exist
          let processedSubItems = item.subItems;
          if (item.subItems && item.subItems.length > 0) {
            processedSubItems = filterMenuItems(item.subItems);
          }

          // Push to accumulator
          acc.push({ ...item, subItems: processedSubItems });
          return acc;
        }, []);
      };

      return filterMenuItems(allMenuItems);

    }, [counts, lang
      // , userRole
    ]); 

    return (
      <div className="header-main-container">
        {/* {!isMobile && ( */}
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
        {/* )} */}
      </div>
    );
  }
);

export default Header;