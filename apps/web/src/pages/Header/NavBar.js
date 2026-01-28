import React, { useContext, useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

import BrandLogo from '@ui/components/BrandLogo/BrandLogo';
import AvatarWithAuth from '@ui/components/UI/widgets/AvatarWithAuth';
import AccountPopover from './AccountPopover';
import SideBar from './SideBar';
import LanguagePopover from '@ui/pages/Common/LanguagePopover'; // ✅ Import the language popover
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';
import { useWishlist } from "@utils/helper/ApiConfig/WishlistContext";
import { useCart } from "@utils/helper/ApiConfig/CartContext";
import { URL_CONFIG, URL_Get_Profile_Img } from '@utils/Config/URLs';
import theme from '@utils/Config/Theme';
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import BgImg from "@assets/header-bg-color.png";

import './Header.scss';

const NavBar = ({ isMobile, selectedItem, setSelectedItem, onLoginClick, imageRefreshKey, setImageRefreshKey }) => {
  const { user } = useContext(AuthContext);
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { lang } = useContext(LanguageContext);

  const [accountAnchor, setAccountAnchor] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  let hoverTimeout;

  const accountOpen = Boolean(accountAnchor);
  const languageOpen = Boolean(languageAnchor);

  return (
    <>
      <div 
        container 
        className='navbar-main-container bg-opacity-50 backdrop-blur-lg' 
        alignItems="center"
        style={{
          // Use the imported image variable here
          // backgroundImage: `url(${BgImg})`,
          // Ensure the image covers the entire navbar area
          backgroundSize: 'cover', 
          // Center the image
          backgroundPosition: 'center', 
          // Prevent tiling
          backgroundRepeat: 'no-repeat' 
        }}
      >
                {/* Sidebar */}
        {isMobile && (
          <div className='navbar-contents' style={{flex: isMobile? 0.1: 1}}>
            <SideBar isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          </div>
        )}
        {!isMobile && (
          <Grid item xs={3} className='navbar-contents' sx={{ paddingLeft: "15px" }}>
            <SideBar isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          </Grid>
        )}

        {/* Logo */}
        <div
          sx={{ display: 'flex', justifyContent: isMobile ? "left" : "center", alignItems: 'center', flex: isMobile ? 0.2 : 1}}
        >
          <BrandLogo entity="header" fontSize="50px" isMobile={isMobile}/>
        </div>

        {/* Right-side navigation */}
        <div className='navbar-contents' sx={{ justifyContent: "flex-end" , flex: isMobile? 0.7: 1}}>
          <div className='navigation-container'>
            <ul className='list navbarTabs' style={{ alignItems: 'left', justifyContent: 'flex-end' }}>

              {/* Language Selector */}
              <li
                className={`nav-item ${languageOpen ? "active" : ""}`}
                onClick={(e) => setLanguageAnchor(languageAnchor? null:e.currentTarget)}
              >
                <Box className="nav-link" sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <LanguageOutlinedIcon className='navbar-icon' />
                  {!isMobile && <span className='Nav-text'>{Literal[lang].language}</span>}
                  <LanguagePopover
                    anchorEl={languageAnchor}
                    open={languageOpen}
                    handleClose={() => setLanguageAnchor(null)}
                  />
                </Box>
              </li>

              {/* Search */}
              {/* <li className='nav-item'>
                <SearchIcon className='navbar-icon' />
                {!isMobile && <span className='Nav-text'>{Literal[lang].search}</span>}
              </li> */}

              {/* Account */}
              <li
                className={`nav-item ${accountOpen ? "active" : ""}`}
                onMouseEnter={(e) => {
                  if(!isMobile){
                      clearTimeout(hoverTimeout);
                      setAccountAnchor(e.currentTarget);
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    hoverTimeout = setTimeout(() => {
                      setAccountAnchor(null);
                    }, 300);
                  }
                }}
                onClick={(e) => setAccountAnchor(accountAnchor ? null : e.currentTarget)}
              >
                <Box className="nav-link" sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                  {user == null ? (
                    <AccountCircleOutlinedIcon className="navbar-icon-acc" />
                  ) : (
                    <AvatarWithAuth
                      imageRefreshKey={imageRefreshKey}
                      setImageRefreshKey={setImageRefreshKey}
                      user={user}
                      size={50}
                      name={user?.firstName + " " + user?.lastName}
                      imageUrl={URL_CONFIG.API_URL + URL_Get_Profile_Img}
                    />
                  )}
                  {!isMobile && <span className='Nav-text'>{Literal[lang].account}</span>}
                  <AccountPopover
                    isMobile={isMobile}
                    anchorEl={accountAnchor}
                    handleMouseEnter={() => clearTimeout(hoverTimeout)}
                    handleMouseLeave={() => {
                      hoverTimeout = setTimeout(() => setAccountAnchor(null), 300);
                    }}
                    id="account"
                    open={accountOpen}
                    setAnchorEl={setAccountAnchor}
                    hoverTimeout={hoverTimeout}
                    onLoginClick={onLoginClick}
                    imageRefreshKey={imageRefreshKey}
                    setImageRefreshKey={setImageRefreshKey}
                  />
                </Box>
              </li>

              {/* Wishlist */}
              <li className='nav-item'>
                <Link to="/wishlist" className="nav-link">
                  {wishlist?.length > 0 && <span className='badge'>{wishlist.length}</span>}
                  <FavoriteIcon sx={{ color: theme.colors.favorite }} className='navbar-icon-fav' />
                  {!isMobile && <span className='Nav-text'>{Literal[lang].wishlist}</span>}
                </Link>
              </li>

              {/* Cart */}
              <li className='nav-item'>
                <Link to="/cart" className="nav-link">
                  {cart.length > 0 && <span className='badge'>{cart.length}</span>}
                  <ShoppingCartOutlinedIcon className='navbar-icon' />
                  {!isMobile && <span className='Nav-text'>{Literal[lang].cart}</span>}
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
