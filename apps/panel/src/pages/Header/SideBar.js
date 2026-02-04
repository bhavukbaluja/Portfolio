import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

// UI Components
import { Box, Grid, IconButton, useTheme, Drawer, Fab } from '@mui/material';
import { ChevronFirst, ChevronLast, Menu as MenuIcon } from "lucide-react"; // Added MenuIcon
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

// Custom Components & Config
import BaseAvatar from '@ui/components/UI/widgets/BaseAvatar';
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import LanguagePopover from '@ui/pages/Common/LanguagePopover';
import propertiesData from "@utils/Config/Properties.json";
import useNavigateTo from '@utils/helper/ApiConfig/useNavigateTo.js';
import { ColorModeContext } from '@utils/Config/ThemeProvider';
import { Instagram_URL, Facebook_URL, Linkedin_URL } from "@utils/Config/URLs";
import UserSquareImg from "@assets/UserImageSquare.png";

// Styles
import "./Sidebar.scss";
import "../Footer/Footer.scss";

// --- Context ---
const SidebarContext = createContext({
  expanded: true,
  closeTrigger: 0,
  activeHash: '',
  isMobile: false
});

export default function Sidebar({ isMobile, sideBarContent, setSelectedItem, selectedItem, mobileOpen, setMobileOpen, handleDrawerToggle, setImageRefreshKey, imageRefreshKey }) {
  // Desktop State
  const [expanded, setExpanded] = useState(true);
  
  // Mobile State

  const { lang } = useContext(LanguageContext);
  const user = propertiesData[lang].user;
  const NavigateTo = useNavigateTo();
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(window.location.hash || '#home'); 
  const [closeTrigger, setCloseTrigger] = useState(0); 

  // --- Logic ---

  const handleClick = (path, isSubItem) => {
    if(!isSubItem){ setCloseTrigger(prev => prev + 1); }
    const newHash = "#" + (path || "").replace('#', '');
    setActiveHash(newHash);
    NavigateTo(newHash, "", true);

    // ✅ Close drawer on mobile after clicking
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // ✅ Listen for React Router changes
  useEffect(() => {
    if (location.hash) {
      setActiveHash(location.hash);
    }
  }, [location]);

  // ✅ Listen for Custom Event
  useEffect(() => {
    const handleScrollUpdate = (e) => {
      if (e.detail && e.detail !== activeHash) {
        setActiveHash(e.detail);
      }
    };
    window.addEventListener('active-section-update', handleScrollUpdate);
    const interval = setInterval(() => {
        if(window.location.hash && window.location.hash !== activeHash) {
            setActiveHash(window.location.hash);
        }
    }, 1000);
    return () => {
        window.removeEventListener('active-section-update', handleScrollUpdate);
        clearInterval(interval);
    };
  }, [activeHash]);

  // --- Render Props for Inner Content ---
  // On mobile, the sidebar is always "expanded" visually when the drawer is open
  const isExpanded = isMobile ? true : expanded; 

  return (
    <>
      {/* 🟢 MOBILE: Floating Button */}
      {/* {isMobile && (
        <Fab 
          color="primary" 
          aria-label="open drawer" 
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            bottom: 20, // Or top: 20
            right: 20,  // Or left: 20
            zIndex: 1300, // Higher than most elements
            display: mobileOpen ? 'none' : 'flex' // Hide when open
          }}
        >
          <MenuIcon />
        </Fab>
      )} */}

      {/* 🟢 MOBILE: Drawer */}
      {isMobile ? (
         <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile
            sx={{
              '& .MuiDrawer-paper': { 
                width: '280px', // Fixed width for mobile drawer
                boxSizing: 'border-box',
                backgroundColor: 'var(--bg-color)', // Match your theme
                borderRight: '1px solid var(--divider-color)'
              },
            }}
         >
            <SidebarContent 
              expanded={true} // Always expanded in drawer
              setExpanded={() => {}} // No toggle inside drawer
              isMobile={true}
              closeTrigger={closeTrigger}
              activeHash={activeHash}
              sideBarContent={sideBarContent}
              handleClick={handleClick}
              selectedItem={selectedItem}
              user={user}
              lang={lang}
              imageRefreshKey={imageRefreshKey}
              setImageRefreshKey={setImageRefreshKey}
            />
         </Drawer>
      ) : (
        /* 🔵 DESKTOP: Traditional Sidebar */
        <aside className="sidebar-container">
           <SidebarContent 
              expanded={expanded}
              setExpanded={setExpanded}
              isMobile={false}
              closeTrigger={closeTrigger}
              activeHash={activeHash}
              sideBarContent={sideBarContent}
              handleClick={handleClick}
              selectedItem={selectedItem}
              user={user}
              lang={lang}
              imageRefreshKey={imageRefreshKey}
              setImageRefreshKey={setImageRefreshKey}
           />
        </aside>
      )}
    </>
  )
}

// ----------------------------------------------------------------------
// 🔹 REUSABLE INNER CONTENT COMPONENT
// ----------------------------------------------------------------------
function SidebarContent({ 
  expanded, setExpanded, isMobile, closeTrigger, activeHash, 
  sideBarContent, handleClick, selectedItem, user, lang, 
  imageRefreshKey, setImageRefreshKey 
}) {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const languageOpen = Boolean(languageAnchor);

  const handleAccountClick = (event) => setAnchorEl(anchorEl ? null : event.currentTarget);

  return (
    <nav className="sidebar-nav" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header (Toggle + Theme/Lang) */}
        <div className="sidebar-header" style={{ justifyContent: expanded ? "space-between" : "center", padding: "10px" }}>
          {expanded && (
              <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                <IconButton className="sidebar-toggle" onClick={(e) => setLanguageAnchor(languageAnchor? null:e.currentTarget)}>
                    <LanguageOutlinedIcon />
                    <LanguagePopover
                      anchorEl={languageAnchor}
                      open={languageOpen}
                      handleClose={() => setLanguageAnchor(null)}
                    />
                </IconButton>
                <IconButton onClick={colorMode.toggleColorMode} className="sidebar-toggle">
                  {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton>
              </div>
            )}
          
          {/* Hide Collapse button on Mobile */}
          {!isMobile && (
            <button onClick={() => setExpanded((curr) => !curr)} className="sidebar-toggle">
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          )}
        </div>

        {/* User Info */}
        <Box className="sidebar-user-group">
          <div className='sidebar-footer'>
              <div className="sidebar-user-info" style={{alignItems: 'center'}}>
                <div onClick={handleAccountClick}>
                  {user==null? (
                      <AccountCircleOutlinedIcon className="navbar-icon-acc" />
                    ):(
                      <BaseAvatar 
                          imageRefreshKey={imageRefreshKey} 
                          setImageRefreshKey={setImageRefreshKey} 
                          user={user} 
                          imageUrl={UserSquareImg}
                          size={expanded? 125: 80} 
                          name={user?.firstName + " " + user?.lastName} 
                      />
                    )
                  }
                </div>
                {user!=null? 
                    ( 
                      <div style={{display: 'flex', flexDirection: expanded? 'row':'column', gap: expanded? '5px': '0px', alignItems: 'center', justifyContent: 'center', paddingTop: '10px'}}>
                        <h4 className="sidebar-user-name">{user?.firstName}</h4>
                        <h4 className="sidebar-user-name">{user?.lastName}</h4>
                      </div>
                    ): (
                      <h4 className="sidebar-user-name">{Literal[lang].welcomeUser}</h4>
                    )
                  }
                <div className={`sidebar-user ${expanded ? "expanded" : "collapsed"}`}>
                    <Grid item xs={4} display="flex" flexDirection="row" gap="10px" alignItems="center">
                        {[
                            { icon: faInstagram, url: Instagram_URL },
                            { icon: faFacebookF, url: Facebook_URL },
                            { icon: faLinkedinIn, url: Linkedin_URL }
                        ].map((item, idx) => (
                            <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={item.icon} className='social-media-icons' />
                            </a>
                        ))}
                    </Grid>
                </div>
              </div>
           </div>
        </Box>

        {/* Navigation List */}
        <SidebarContext.Provider value={{ expanded, closeTrigger, activeHash, isMobile }}>
          <ul className="sidebar-list" style={{ flex: 1, overflowY: 'auto' }}>
            {sideBarContent.map((item)=>(
                <SidebarItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  alert={item.alert}
                  subItems={item.subItems}
                  path={item?.path}
                  handleClick={handleClick}
                  selectedItem={selectedItem}
                />
            ))}
          </ul>
        </SidebarContext.Provider>
    </nav>
  );
}

// ----------------------------------------------------------------------
// 🔹 SIDEBAR ITEM COMPONENT (Unchanged logic, just cleanup)
// ----------------------------------------------------------------------
function SidebarItem({ icon, text, alert, subItems, path, handleClick }) {
  const { expanded, closeTrigger, activeHash } = useContext(SidebarContext);
  const { lang } = useContext(LanguageContext);

  const currentHashClean = (activeHash || "").replace('#', '').toLowerCase();
  const itemTarget = (path || text || "").toLowerCase();
  
  const isSelfActive = currentHashClean === itemTarget;
  const isSubActive = subItems?.some(sub => {
    const subTarget = (sub.path || sub.text || "").toLowerCase();
    return currentHashClean === subTarget;
  });

  const isActive = isSelfActive || isSubActive;
  const shouldBeOpen = isActive && !!subItems;
  const [isOpen, setIsOpen] = useState(shouldBeOpen);

  useEffect(() => { setIsOpen(false); }, [closeTrigger]);

  useEffect(() => { 
    if(isSubActive) setIsOpen(true);
  }, [isSubActive]);
  
  const toggleSubItems = () => {
    if (subItems) {
        setIsOpen(!isOpen);
    } else {
        handleClick(path ? path : text, false); 
    }
  };

  const handleParentClick = () => {
    if (subItems) {
      toggleSubItems();
    } else {
      handleClick(path ? path : text, false);
    }
  };

  return (
    <>
      <li className={`sidebar-item ${isActive ? "active" : ""}`} onClick={handleParentClick}>
        <div className="sidebar-item-content">
          <div className={`sidebar-item-icon ${expanded ? "expanded" : "collapsed"}`}>
            <div className={`sidebar-item-icon ${expanded ? "expanded" : "collapsed"}`}>
              {icon}
              <span className={`sidebar-text ${expanded ? "expanded" : "collapsed"}`}>
                {Literal[lang][text] || text}
              </span>
              {alert>0 && <span className="sidebar-badge">{alert}</span>}
            </div>
            <div className="expand-collapse">
              {subItems && expanded && (
                isOpen ? <ExpandLessIcon fontSize="medium" /> : <ExpandMoreIcon fontSize="medium" />
              )}
            </div>
          </div>
          {!expanded && (
            <div className="sidebar-tooltip">
              {Literal[lang][text] || text}
            </div>
          )}
        </div>
      </li>

      {isOpen && subItems?.map((sub, idx) => {
        const subTarget = (sub.path || sub.text || "").toLowerCase();
        const isThisSubActive = currentHashClean === subTarget;
        return (
            <li
              key={idx}
              className={`sidebar-subitem ${isThisSubActive ? "active" : ""}`}
              onClick={(e) => {
                  e.stopPropagation();
                  handleClick(sub?.path || sub?.text, true);
              }}
            >
            <div className="sidebar-subitem-content" style={{ paddingLeft: expanded ? '3rem' : '0rem' }}>
                {sub.icon}
                <span className={`sidebar-text ${expanded ? "expanded" : "collapsed"}`} style={{ paddingLeft: "10px" }}>
                  {Literal[lang][sub.text] || sub.text}
                </span>
                {sub?.alert>0 && (<span className={`sidebar-badge ${expanded ? "expanded" : "collapsed"}`}>{sub.alert}</span>)}
            </div>
            </li>
        )
      })}
    </>
  );
}