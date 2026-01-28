import React, { useContext, useState } from 'react';
import './AnimatedSearchBar.scss';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Input } from '@mui/material';
import Literal from '@ui/literals';
import ClearIcon from '@mui/icons-material/Clear';

const AnimatedSearchBar = ({ entity, expandFrom = "center", clickSearch, initialQuery }) => {
  const { lang } = useContext(LanguageContext);
  const [searchValue, setSearchValue] = useState(initialQuery || "");

  const expandClass = {
    left: 'expand-left',
    right: 'expand-right',
    center: 'expand-center',
  }[expandFrom];

  const handleSearchClick = () => {
    if (clickSearch) clickSearch(searchValue);
  };

  return (
    <Box className={`search-form ${expandClass} ${searchValue ? "active" : ""}`}>
    <Input
      disableUnderline
      placeholder={Literal[lang].searchPlaceHolder.replace("{entity}", Literal[lang][entity] || entity)}
      className="input-field"
      name="search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSearchClick();
      }}
    />
    <span
      className={searchValue !== "" ? "searchbar-clear-icon" : "searchbar-clear-icon-hidden"}
      onClick={() => {
        setSearchValue("");
        clickSearch("");
      }}
    >
      <ClearIcon />
    </span>
    <span className="searchbar-icon" onClick={handleSearchClick}>
      <SearchIcon />
    </span>
  </Box>  
  );
};

export default AnimatedSearchBar;
