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
    
    // Wrapped in useMemo to recalculate when counts/lang changes
    const sideBarContent = useMemo(() => {
      
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

      // ✅ FIX: Explicitly added 'path' to every item to prevent navigation errors
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
        },
        { 
          text: "contact", 
          icon: <EmailOutlinedIcon />,
        },
      ];

      // Filter Function based on 'userRole' (if needed later)
      const filterMenuItems = (items) => {
        return items.reduce((acc, item) => {
          // Rule: Recursively filter subItems if they exist
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