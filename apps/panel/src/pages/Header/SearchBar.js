import { Box, Divider, Link } from "@mui/material";
import React, { useContext, useState } from "react";
import BaseMenu from "@ui/components/UI/fields/baseMenu";
import './header.scss';
import { Input } from '@base-ui-components/react/input';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';

const SearchBar = ({entity}) => {

  const { lang } = useContext(LanguageContext);
  const menuItems = [
    { label: "All Categories" },
    { label: "Add to Playlist" },
    { separator: true },
    { label: "Play Next" },
    { label: "Play Last" },
    { separator: true },
    { label: "Favorite" },
    { label: "Share" }
  ];
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  function handleMenuSelect(item) {
    setSelectedItem(item);
  }
  const [search, setSearch] = useState("");
  return (
    <>
      <Box className="searchbar-box" display="flex" alignItems="center" width="100%">
        {/* <BaseMenu 
            items={menuItems} 
            onSelect={handleMenuSelect} 
            selectedItem={selectedItem} 
        />
        <Divider orientation="vertical" variant="middle" flexItem /> */}
        <Input 
            placeholder={Literal[lang].searchPlaceHolder.replace("{entity}",Literal[lang][entity])} 
            className="input-field" width="100%" 
            name="search" 
            value={search}        
            onChange={(e) => setSearch(e.target.value)}
        />
        <Box 
            display="flex" alignItems="center"
        >
          <Box>
            <ClearIcon 
              className={search!=""?"searchbar-icon":"searchbar-icon-hidden"}
              onClick={()=>setSearch("")}
            />
          </Box>
          <SearchIcon 
            className="searchbar-icon"
            onClick={()=>console.log(search)}
          />     
        </Box>
      </Box>
    </>
  );
}

export default SearchBar;
