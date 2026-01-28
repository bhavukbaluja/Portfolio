import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import React, { useContext, createContext, useState, useEffect } from "react";
import "./Sidebar.scss";
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Grid } from '@mui/material';
import BrandLogo from '@ui/components/BrandLogo/BrandLogo';
import AvatarWithAuth from '@ui/components/UI/widgets/AvatarWithAuth';
import theme from '@utils/Config/Theme';
import { URL_CONFIG, URL_Get_Profile_Img } from '@utils/Config/URLs';
import { Link } from 'react-router-dom';
import AccountPopover from './AccountPopover';
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LanguagePopover from '@ui/pages/Common/LanguagePopover'; // ✅ Import the language popover

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import useNavigateTo from '@utils/helper/ApiConfig/useNavigateTo.js';

import { IconButton, useTheme } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { ColorModeContext } from '@utils/Config/ThemeProvider';

const SidebarContext = createContext()

export default function Sidebar({ isMobile, sideBarContent, setSelectedItem, selectedItem, setImageRefreshKey, imageRefreshKey }) {
  const [expanded, setExpanded] = useState(false)
  const { user } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);
  const NavigateTo = useNavigateTo();
  const [anchorEl, setAnchorEl] = useState(null);
  const [closeTrigger, setCloseTrigger] = useState(0); // 🔹 New state to force-close items
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const languageOpen = Boolean(languageAnchor);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleClick = (path, isSubItem) => {
    if(!isSubItem){setCloseTrigger(prev => prev + 1); }// 🔹 Tell all items to close
    NavigateTo("/" + path, "", true);
  };
  const handleAccountClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle popover
  };

  const open = Boolean(anchorEl);
  return (
    <aside className="sidebar-container">
      <nav className="sidebar-nav">
        <div className="sidebar-header" style={{ justifyContent: expanded ? "space-between" : "center" }}>
          {
            expanded && (
                <BrandLogo entity="sideBar" fontSize="80px" isMobile={isMobile}/>
            )
          }
          <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
          {
            expanded && (
              <>
                <IconButton onClick={colorMode.toggleColorMode} className="sidebar-toggle">
                  {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton>
                <IconButton
                  className="sidebar-toggle"
                  onClick={(e) => setLanguageAnchor(languageAnchor? null:e.currentTarget)}
                  >
                        <LanguageOutlinedIcon />
                      <LanguagePopover
                        anchorEl={languageAnchor}
                        open={languageOpen}
                        handleClose={() => setLanguageAnchor(null)}
                      />
                </IconButton>
              </>
            )}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="sidebar-toggle"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded, closeTrigger }}>
          <ul className="sidebar-list">
            {sideBarContent.map((item)=>[
                <SidebarItem
                  key={item.text} // or use some other unique value for the `key`
                  icon={item.icon}
                  text={item.text}
                  active={item?.path? selectedItem=="/"+item?.path: selectedItem=="/"+item?.text}
                  alert={item.alert}
                  subItems={item.subItems}
                  path={item?.path}
                  handleClick={handleClick}
                  selectedItem={selectedItem}
                />
            ])}
          </ul>
        </SidebarContext.Provider>

        <div className="sidebar-footer">
        <Box className="nav-link" sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <div  onClick={handleAccountClick}>
              {user==null?
                (
                  <AccountCircleOutlinedIcon className="navbar-icon-acc" />
                ):(

                  <AvatarWithAuth 
                      imageRefreshKey={imageRefreshKey} 
                      setImageRefreshKey={setImageRefreshKey} 
                      user={user} 
                      size={expanded? 60: 60} 
                      name={user?.firstName + " " + user?.lastName} imageUrl={URL_CONFIG.API_URL+URL_Get_Profile_Img}
                  />
                )
              }
            </div>
          <div className={`sidebar-user ${expanded ? "expanded" : "collapsed"}`}>
            <div className="sidebar-user-info">
              <h4 className="sidebar-user-name">{user!=null? (user?.firstName+" "+user?.lastName): Literal[lang].welcome}</h4>
              <span className="sidebar-user-email">{user!=null? (user?.email || user?.mobile) : Literal[lang].accountInstruction}</span>
            </div>
            <MoreVertical size={20} onClick={handleAccountClick}/>
          </div>
          </Box>
        </div>
      </nav>
      <AccountPopover 
        isMobile={isMobile}
        anchorEl={anchorEl} 
        // handleMouseEnter={() => clearTimeout(hoverTimeout)}
        // handleMouseLeave={() => {
        //   hoverTimeout = setTimeout(() => {
        //     setAnchorEl(null);
        //   }, 300);
        // }}
        id="account"
        open={open}
        setAnchorEl={setAnchorEl}
        // hoverTimeout={hoverTimeout}
        // onLoginClick={onLoginClick}
        imageRefreshKey={imageRefreshKey} 
        setImageRefreshKey={setImageRefreshKey} 
      />
    </aside>
  )
  
}
function SidebarItem({ icon, text, active, alert, subItems, path, handleClick, selectedItem }) {
  const { expanded, closeTrigger } = useContext(SidebarContext);
  const { lang } = useContext(LanguageContext);

  // Check if any subitem matches the selectedItem
  const shouldBeOpen =
  selectedItem === "/" + (path || text) ||
  subItems?.some(sub => selectedItem==("/" + (sub?.path || sub?.text)));


  const [isOpen, setIsOpen] = useState(shouldBeOpen);

  // 🔹 Whenever closeTrigger changes, collapse this item
  useEffect(() => {
    setIsOpen(false);
  }, [closeTrigger]);

  useEffect(() => {
    setTimeout(() => setIsOpen(shouldBeOpen), 0); // open after closing others
  }, [shouldBeOpen]);
  
  const toggleSubItems = (path, text) => {
    handleClick(path ? path : text, false); // This will trigger the parent to close others
  
    if (subItems) {
      setIsOpen(false); // ensure closed first
      setTimeout(() => setIsOpen(true), 0); // open after closing others
    }
  };
  

  return (
    <>
      <li
        className={`sidebar-item ${active ? "active" : ""}`}
        onClick={() =>
          subItems ? toggleSubItems(path, text) : handleClick(path ? path : text, false)
        }
      >
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

      {isOpen && subItems?.map((sub, idx) => (
        <li
          key={idx}
          className={`sidebar-subitem ${selectedItem === "/" + (sub?.path || sub?.text) ? "active" : ""}`}
          onClick={() => handleClick(sub?.path || sub?.text, true)}
        >
          <div className="sidebar-subitem-content" style={{ paddingLeft: expanded ? '3rem' : '0rem' }}>
            {sub.icon}
            <span
              className={`sidebar-text ${expanded ? "expanded" : "collapsed"}`}
              style={{ paddingLeft: "10px" }}
            >
              {Literal[lang][sub.text] || sub.text}
            </span>
            {sub?.alert>0 && (<span className={`sidebar-badge ${expanded ? "expanded" : "collapsed"}`}>{sub.alert}</span>)}
          </div>
        </li>
      )
    )}
    </>
  );
}
