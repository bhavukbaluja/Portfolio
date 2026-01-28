import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Grid } from '@mui/material';
import BrandLogo from '@ui/components/BrandLogo/BrandLogo';
import AvatarWithAuth from '@ui/components/UI/widgets/AvatarWithAuth';
import theme from '@utils/Config/Theme';
import { URL_CONFIG, URL_Get_Profile_Img } from '@utils/Config/URLs';
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountPopover from './AccountPopover';
import './Header.scss';
import SideBar from './SideBar';

const NavBar = ({ isMobile, selectedItem, setSelectedItem, onLoginClick, imageRefreshKey,  setImageRefreshKey, sideBarContent }) => {

  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  let hoverTimeout;

  const handleMouseEnter = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };
  
  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setAnchorEl(null);
    }, 100); // Delay closing to allow movement into popover
  };
  const handleAccountClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle popover
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Grid container className='navbar-main-container' alignItems="center">
        
        {/* Mobile: Sidebar Toggle at Top Left */}
        {/* {isMobile && ( */}
          {/* <Grid item xs={1} className='navbar-contents'>
            <SideBar isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} children={sideBarContent}/> {/* Collapsible menu button */}
          {/* </Grid> */}
        {/* )} */}

        {/* PC Sidebar (Expanded)
        {!isMobile && (
          <Grid item xs={3} className='navbar-contents' sx={{ paddingLeft: "15px" }}>
            <SideBar isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
          </Grid>
        )} */}
        
        {/* Logo - Adjusted for Mobile & PC */}
        <Grid 
          item 
          xs={isMobile ? 1 : 3} 
          className='navbar-contents' 
          sx={{ justifyContent: isMobile ? "left" : "center", paddingLeft: "0px" }}
        >
          <BrandLogo isMobile={isMobile} />
        </Grid>


        {/* Right-Side Navigation */}
        <Grid 
          item 
          xs={isMobile ? 8 : 6} // Takes rest of space on mobile, 6/12 on PC
          className='navbar-contents' 
          sx={{ justifyContent: "flex-end" }}
        >
          <div className='navigation-container'>
            <ul className='list navbarTabs' style={{ alignItems: 'left', justifyContent: 'flex-end' }}>
              <li className='nav-item'>
                <SearchIcon className='navbar-icon' />
                {isMobile ? "" : <span className='Nav-text'>Search</span>}
              </li>
              <li 
                className={`nav-item ${open ? "active" : ""}`}
                onMouseEnter={(e) => {
                  clearTimeout(hoverTimeout); // Prevent immediate closing
                  setAnchorEl(e.currentTarget);
                }} 
                onMouseLeave={() => {
                  hoverTimeout = setTimeout(() => {
                    setAnchorEl(null);
                  }, 300); // Small delay to allow smooth interaction
                }}
                onClick={(e) => {
                  if (isMobile) {
                    setAnchorEl(anchorEl ? null : e.currentTarget); // Toggle on mobile
                  }
                }}
              >
                <Box className="nav-link" sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                  {user==null?
                    (
                      <AccountCircleOutlinedIcon className="navbar-icon-acc" />
                    ):(

                      <AvatarWithAuth 
                          imageRefreshKey={imageRefreshKey} 
                          setImageRefreshKey={setImageRefreshKey} 
                          user={user} 
                          size={40} 
                          name={user?.firstName + " " + user?.lastName} imageUrl={URL_CONFIG.API_URL+URL_Get_Profile_Img}
                      />
                    )}
                  {!isMobile && <span className='Nav-text'>Account</span>}
                  <AccountPopover 
                    isMobile={isMobile}
                    anchorEl={anchorEl} 
                    handleMouseEnter={() => clearTimeout(hoverTimeout)}
                    handleMouseLeave={() => {
                      hoverTimeout = setTimeout(() => {
                        setAnchorEl(null);
                      }, 300);
                    }}
                    id="account"
                    open={open}
                    setAnchorEl={setAnchorEl}
                    hoverTimeout={hoverTimeout}
                    onLoginClick={onLoginClick}
                    imageRefreshKey={imageRefreshKey} 
                    setImageRefreshKey={setImageRefreshKey} 
                  />
                </Box>
              </li>

              <li className='nav-item'                   
                      onMouseEnter={() => {
                        if (open) {
                            setAnchorEl(null); // Close popover when hovering over another item
                        }
                    }} 
              >
                <Link to="/wishlist" className="nav-link">
                  <span className='badge'>3</span>
                  <FavoriteIcon sx={{ color: theme.colors.favorite }} className='navbar-icon-fav' />
                  {isMobile ? "" : <span className='Nav-text'>Wishlist</span>}
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/cart" className="nav-link">
                  <span className='badge'>3</span>
                  <ShoppingCartOutlinedIcon className='navbar-icon' />
                  {isMobile ? "" : <span className='Nav-text'>Cart</span>}
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default NavBar;
