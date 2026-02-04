import React, { useState, useEffect, useContext } from "react";
import propertiesData from "@utils/Config/Properties.json";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton, useTheme } from "@mui/material";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { WhatsApp_URL } from "@utils/Config/URLs.js";
import useNavigateTo from '@utils/helper/ApiConfig/useNavigateTo.js';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { ColorModeContext } from '@utils/Config/ThemeProvider';
import Literal from "@ui/literals";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export default function FloatingButtons({isMobile, handleDrawerToggle}) {
  const [showScroll, setShowScroll] = useState(false);
  const theme = useTheme();
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];
  const NavigateTo = useNavigateTo();

  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const navigateToContact = () => {
    NavigateTo("#contact", "", true);
  };

  return (
    <>
      {isMobile && (
        <IconButton onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            bgcolor: `var(--color-gray-50)`,
            color: "var(--color-gray-900)",
            "&:hover": {
              bgcolor: `var(--color-gray-700)`,
              color: "var(--color-gray-50)",
            },
            zIndex: 1200,
            border: '1px solid var(--color-gray-400)',
            boxShadow: '0 5px 20px var(--color-gray-400)',
            p: 1,
          }}
        >
          <MenuOutlinedIcon sx={{ fontSize: "40px" }}/>
        </IconButton>
      )}

      {/* Scroll-to-top button */}
      {showScroll && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 150,
            right: 30,
            bgcolor: `var(--color-gray-500)`,
            color: "#fff",
            "&:hover": {
              bgcolor: `var(--color-gray-700)`,
            },
            zIndex: 1200,
            boxShadow: 3,
            p: 1,
          }}
        >
          <ExpandLessIcon fontSize="medium"/>
        </IconButton>
      )}

      <IconButton onClick={colorMode.toggleColorMode}
        sx={{
          position: "fixed",
          bottom: isMobile? '' : 90,
          top: isMobile? 20 : '',
          right: isMobile? 100 : 20,
          bgcolor: `var(--color-gray-50)`,
          color: "var(--color-gray-900)",
          "&:hover": {
            bgcolor: `var(--color-gray-700)`,
            color: "var(--color-gray-50)",
          },
          zIndex: 1200,
          border: '1px solid var(--color-gray-400)',
          boxShadow: '0 5px 20px var(--color-gray-400)',
          p: 1,
        }}
      >
        {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon sx={{ fontSize: "40px" }}/> : <LightModeOutlinedIcon sx={{ fontSize: "40px" }}/>}
      </IconButton>

      {/* WhatsApp button */}
      <IconButton
        onClick={navigateToContact}
        // className="px-10 py-2.5 border rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white flex items-center gap-2 dark:border-transparent"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "linear-gradient(135deg , #b820e6, #da7d20)",
          color: "var(--color-gray-50)",
          "&:hover": {
            bgcolor: "#1EBE5D",
          },
          borderRadius: '30px',
          zIndex: 1200,
          boxShadow: '0 7px 12px var(--color-gray-400)',
          fontSize: '20px',
          p: 1.5, // larger area for XL icon
        }}
      >
        {Literal[lang].contactMe} <ArrowForwardOutlinedIcon/>
      </IconButton>
    </>
  );
}
