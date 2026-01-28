import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material';
import theme from '@utils/Config/Theme';
import { URL_CONFIG, URL_Get_Profile_Img } from '@utils/Config/URLs';
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AvatarWithAuth from '@ui/components/UI/widgets/AvatarWithAuth';
import Literal from '@ui/literals';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import "./Header.scss";
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import DomainAddOutlinedIcon from '@mui/icons-material/DomainAddOutlined';
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";

const AccountPopover = ({ isMobile, id, open, anchorEl, handleMouseEnter, handleMouseLeave, setAnchorEl, hoverTimeout, onLoginClick, imageRefreshKey,  setImageRefreshKey }) => {
  const { lang } = React.useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const NavigateTo = useNavigateTo();
  const handleClose = (forceClose = false) => {
    if (!forceClose && isMobile) return; // ✅ Prevents auto-closing in mobile
    
    setTimeout(() => setAnchorEl(null), forceClose ? 50 : 200);
  };
  
  useEffect(() => {
    if (open) {
      setTimeout(() => setAnchorEl(anchorEl), 10); // ✅ Ensures popover stays open
    }
  }, [open]);

  const logout = ()=>{
    NavigateTo("/logout","",true);
  }
  

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => handleClose()}
      disableAutoFocus
      disableEnforceFocus
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      style={{ 
        pointerEvents: 'auto',
       }}
      PaperProps={{
        onMouseLeave: !isMobile ? () => handleClose(true) : undefined, // ✅ Prevents accidental closing on mobile
        style: { padding: "16px", width: "auto", overflow: "visible",
        backgroundColor: "var(--color-gray-50)"
         },
        onClick: (e) => e.stopPropagation(), 
      }}
      onTouchStart={(e) => e.stopPropagation()} // Prevents touch interactions from triggering close
    >
      <Box 
        sx={{ width: 300, p: 2 }} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={!isMobile ? handleMouseLeave : undefined} 
      >
        {/* User Info */}
        <Box display="flex" alignItems="center">
          {/* <AccountCircleOutlinedIcon sx={{ fontSize: 80, mr: 2 }} /> */}
          <div>
            {user==null?
              (
                <AccountCircleOutlinedIcon sx={{fontSize: 80}} />
              ):(
                <AvatarWithAuth 
                  user={user} 
                  size={80} 
                  name={user?.firstName + " " + user?.lastName} 
                  imageUrl={URL_CONFIG.API_URL+URL_Get_Profile_Img}
                  imageRefreshKey={imageRefreshKey}
                />
              )}
          </div>
          <Box sx={{ml: 3}}>
            <Typography variant="subtitle1" color="var(--primarytext-color)"><b>{Literal[lang].welcome}</b></Typography>
            <Typography variant="body1" color="text.secondary">{user==null? Literal[lang].accountInstruction: user.firstName+" "+user.lastName}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Menu Options */}
        <List>
        {user==null ?
          (
            <ListItem button component={Link} className='signup-login-button' onClick={() => {onLoginClick(); handleClose(true);}}>
              <ListItemText className="signup-login" primary={Literal[lang].loginSignup} />
            </ListItem>
          ):
          (
            <>
            <ListItem button component={Link} to="/profile" onClick={handleClose}>
              <ListItemIcon>
                <AccountCircleOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={Literal[lang].profile} className='account-options-list'/>
            </ListItem>
            <ListItem button component={Link} to="/addresses" onClick={handleClose}>
              <ListItemIcon>
                <DomainAddOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={Literal[lang].addresses} className='account-options-list'/>
            </ListItem>
            <ListItem button component={Link} to="/sizes" onClick={handleClose}>
              <ListItemIcon>
                <StraightenOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={Literal[lang].sizes} className='account-options-list'/>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            <ListItem button component={Link} to="/orders" onClick={handleClose}>
              <ListItemIcon>
                <LocalShippingOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={Literal[lang].orders} className='account-options-list'/>
            </ListItem>
            <ListItem button component={Link} to="/wishlist" onClick={handleClose}>
              <ListItemIcon>
              <FavoriteIcon sx={{ color: theme.colors.favorite }} className='navbar-icon-fav' />
              </ListItemIcon>
              <ListItemText primary={Literal[lang].wishlist} className='account-options-list'/>
            </ListItem>
            </>
          )}
          <Divider />
          <ListItem button component={Link} to="/contactUs" onClick={() => handleClose(true)}>
            <ListItemIcon>
              <SupportAgentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={Literal[lang].contactUs} className='account-options-list'/>
          </ListItem>
          <ListItem button component={Link} to="/aboutUs" onClick={() => handleClose(true)}>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={Literal[lang].aboutUs} className='account-options-list'/>
          </ListItem>
          {user!=null && (
            <>
            <Divider />
            <ListItem button onClick={() => {console.log("Logout clicked"); handleClose(); logout();}}>
              <ListItemIcon>
                <PowerSettingsNewOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={Literal[lang].logout} className='account-options-list'/>
            </ListItem>
            </>
          )}
        </List>
      </Box>
    </Popover>
  );
};

export default AccountPopover;
