import React, { useContext, useState } from 'react';
import { Popover, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from '@ui/literals';

const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },     // Hindi
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },     // Punjabi
    { code: 'ur', label: 'اردو' }, // Urdu
    { code: 'mr', label: 'मराठी' },       // Marathi
    { code: 'ta', label: 'தமிழ்' },      // Tamil
    { code: 'te', label: 'తెలుగు' },     // Telugu
    { code: 'bn', label: 'বাংলা' },       // Bengali
    { code: 'gu', label: 'ગુજરાતી' },     // Gujarati
    { code: 'kn', label: 'ಕನ್ನಡ' },       // Kannada
    { code: 'ml', label: 'മലയാളം' },      // Malayalam
    { code: 'or', label: 'ଓଡ଼ିଆ' },       // Odia
    { code: 'as', label: 'অসমীয়া' },      // Assamese
    // { code: 'es', label: 'Español' },     // Spanish
    // { code: 'fr', label: 'Français' },    // French
    // { code: 'de', label: 'Deutsch' },     // German
    // { code: 'zh', label: '中文' },         // Chinese
    // { code: 'ar', label: 'العربية' },     // Arabic
    // { code: 'ru', label: 'Русский' },      // Russian
    // { code: 'ja', label: '日本語' },       // Japanese
    // { code: 'ko', label: '한국어' },       // Korean
  ];  

const LanguagePopover = ({ anchorEl, open, handleClose }) => {
  const { lang, setLang } = useContext(LanguageContext);

  const changeLanguage = (code) => {
    setLang(code); // update context
    localStorage.setItem('selectedLanguage', code); // persist
    handleClose(); // close popover
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      PaperProps={{ style: { minWidth: 200 } }}
    >
      <Box p={1}>
        <Box p={1} textAlign="center">
          <LanguageIcon fontSize="small" /> {Literal[lang].selectLanguage || 'Select Language'}
        </Box>
        <Divider />
        <List>
          {languages.map((language) => (
            <ListItem
              button
              key={language.code}
              selected={lang === language.code}
              onClick={() => changeLanguage(language.code)}
            >
              <ListItemText primary={language.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>
  );
};

export default LanguagePopover;
