import React, { useState, useEffect, useContext } from "react";
import propertiesData from "@utils/Config/Properties.json";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton, useTheme } from "@mui/material";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { WhatsApp_URL } from "@utils/Config/URLs.js";

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { ColorModeContext } from '@utils/Config/ThemeProvider';

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);
  const theme = useTheme();
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];

  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const openWhatsApp = () => {
    window.open(WhatsApp_URL, "_blank");
  };

  return (
    <>
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
          bottom: 90,
          right: 27.5,
          bgcolor: `var(--color-gray-50)`,
          color: "var(--color-gray-900)",
          "&:hover": {
            bgcolor: `var(--color-gray-700)`,
            color: "var(--color-gray-50)",
          },
          zIndex: 1200,
          boxShadow: 3,
          p: 1,
        }}
      >
        {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon sx={{ fontSize: "30px" }}/> : <LightModeOutlinedIcon sx={{ fontSize: "30px" }}/>}
      </IconButton>

      {/* WhatsApp button */}
      <IconButton
        onClick={openWhatsApp}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#25D366",
          color: "var(--color-gray-50)",
          "&:hover": {
            bgcolor: "#1EBE5D",
          },
          zIndex: 1200,
          boxShadow: 3,
          p: 1.5, // larger area for XL icon
        }}
      >
        <WhatsAppIcon fontSize="large" /> {/* XL size */}
      </IconButton>
    </>
  );
}
