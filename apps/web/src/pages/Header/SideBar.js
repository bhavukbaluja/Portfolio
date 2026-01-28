import React, { useEffect, useState } from "react";
import { Drawer, IconButton, Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./Header.scss";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { PanelServices } from '@utils/services/PanelServices';
import {  convertEntities } from "@utils/helper/Helper";
import { Category_URL } from "@utils/Config/URLs";

const SideBar = ({ isMobile, selectedItem, setSelectedItem }) => {
  const [open, setOpen] = useState(false);
  const { getGridData, setSubcategories } = PanelServices(); // 👈 Assumes service method for product API
  const [sidebarItems, setSidebarItems] = useState([]);
  const toggleSideBar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getGridData(Category_URL + "/allParents?isTileVisible=false&statuses=ACTIVE");
        setSidebarItems(convertEntities(res?.data, null, "ACTIVE")); // Also fix the call
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    loadCategories();
  }, []); // ✅ runs only once
  

  // const sidebarItems = [
  //   { label: "Bridal", path: "/bridal" },
  //   { label: "Luxe", path: "/luxury" },
  //   { label: "Women", path: "/women" },
  //   { label: "Men", path: "/men" },
  //   { label: "Kids", path: "/kids" },
  // ];

  return (
    <>
      {isMobile ? (
        // Mobile View - Collapsible Drawer
        <div>
          <IconButton onClick={toggleSideBar} sx={{ margin: 0 }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={toggleSideBar}>
            <IconButton 
              onClick={toggleSideBar} 
              sx={{ 
                position: 'absolute', 
                top: 10, 
                right: 10, 
                zIndex: 1 
              }}
            >              
              <ArrowBackIosNewOutlinedIcon />
            </IconButton>
            <Box sx={{width: '70vw', minHeight: '100%', backgroundColor: "var(--bg-color) !important"}}  className='navigation-container'>  { /* onClick={toggleSideBar} */}
              <List sx={{ paddingTop: '40px' }} className='navbarTabs'>
                {sidebarItems.map((item) => (
                  <ListItem button key={item.label} component={Link} to={item.path} className="nav-item" onClick={toggleSideBar} >
                  <ListItemIcon className="nav-link" >
                    {/* <SupportAgentOutlinedIcon /> */}
                  </ListItemIcon>
                  <ListItemText primary={item.label} className='account-options-list'/>
                </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </div>
      ) : (
        // PC View - Inline Menu
          <div className='navigation-container'>
            <ul className='navbarTabs' style={{ alignItems: 'center', justifyContent: 'center', gap: '20px' }}>             
              {sidebarItems.map((item) => (
                <li className='nav-item' alignItems="center">
                <Link key={item.label} to={item.path} className="nav-link" onClick={()=>setSelectedItem(item.path)}>
                <span className={selectedItem === item.path ? "Nav-text-categories-selected" :  "Nav-text-categories" }>{item.label}</span> 
                </Link>
                </li>
              ))}
            </ul>
          </div>
      )}
    </>
  );
};

export default SideBar;
