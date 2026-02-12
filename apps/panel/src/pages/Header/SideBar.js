import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

// UI Components
import { Box, Grid, IconButton, useTheme, Drawer } from '@mui/material';
import { ChevronFirst, ChevronLast } from "lucide-react"; 
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
  const [expanded, setExpanded] = useState(true);
  
  const { lang } = useContext(LanguageContext);
  const user = propertiesData[lang].user;
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(window.location.hash || '#home'); 
  const [closeTrigger, setCloseTrigger] = useState(0); 

  // --- 🛠️ HANDLE CLICK LOGIC ---
  const handleClick = (path, isSubItem) => {
    if(!isSubItem){ setCloseTrigger(prev => prev + 1); }

    const cleanId = (path || "").toString().replace(/^[#/]+/, '').toLowerCase();
    const newHash = `#${cleanId}`;

    if (!cleanId) return;

    // 1. 🔒 DISPATCH LOCK EVENT
    // This tells Home.js to STOP listening to scroll events for a moment
    window.dispatchEvent(new CustomEvent('manual-scroll-start'));

    // 2. Force Scroll
    const element = document.getElementById(cleanId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 3. Update URL Safely
    if (window.history.pushState) {
        const newUrl = `${window.location.pathname}${newHash}`;
        window.history.pushState(null, null, newUrl);
    } else {
        window.location.hash = newHash;
    }

    // 4. Update Internal State Immediately
    setActiveHash(newHash);

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

  // ✅ Listen for Scroll Spy Events (from Home.js)
  useEffect(() => {
    const handleScrollUpdate = (e) => {
      // Only update if different to prevent loops
      if (e.detail && e.detail !== activeHash) {
        setActiveHash(e.detail);
      }
    };
    
    window.addEventListener('active-section-update', handleScrollUpdate);
    
    const interval = setInterval(() => {
        // Double check hash cleanliness
        if (window.location.hash.includes('#/#')) {
            const fixedHash = window.location.hash.replace('#/#', '#');
            window.history.replaceState(null, null, `${window.location.pathname}${fixedHash}`);
            setActiveHash(fixedHash);
        } 
        else if(window.location.hash && window.location.hash !== activeHash) {
            setActiveHash(window.location.hash);
        }
    }, 1000);

    return () => {
        window.removeEventListener('active-section-update', handleScrollUpdate);
        clearInterval(interval);
    };
  }, [activeHash]);

  return (
    <>
      {isMobile ? (
         <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }} 
            sx={{
              '& .MuiDrawer-paper': { 
                width: '280px', 
                boxSizing: 'border-box',
                backgroundColor: 'var(--bg-color)', 
                borderRight: '1px solid var(--divider-color)'
              },
            }}
         >
            <SidebarContent 
              expanded={true} 
              setExpanded={() => {}} 
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

// ... (SidebarContent and SidebarItem remain exactly the same as previous step)
function SidebarContent({ expanded, setExpanded, isMobile, closeTrigger, activeHash, sideBarContent, handleClick, selectedItem, user, lang, imageRefreshKey, setImageRefreshKey }) {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const languageOpen = Boolean(languageAnchor);

  const handleAccountClick = (event) => setAnchorEl(anchorEl ? null : event.currentTarget);

  return (
    <nav className="sidebar-nav" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          {!isMobile && (
            <button onClick={() => setExpanded((curr) => !curr)} className="sidebar-toggle">
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          )}
        </div>

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