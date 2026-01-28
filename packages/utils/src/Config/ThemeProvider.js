import React, { createContext, useState, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, alpha } from '@mui/material/styles';
import themeConfig from '@utils/Config/Theme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ThemeProvider = ({ children }) => {
  // ✅ FIX 1: Lazy Initialization
  // Check localStorage BEFORE the first render. 
  // If 'themeMode' is missing, default to 'light'.
  const [mode, setMode] = useState(() => {
    try {
      const storedMode = localStorage.getItem('themeMode');
      return storedMode ? storedMode : 'light';
    } catch (error) {
      return 'light';
    }
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const activeColors = useMemo(() => {
    const isDark = mode === 'dark';
    const darkColors = themeConfig.darkColors || themeConfig.colors;
    return isDark ? { ...themeConfig.colors, ...darkColors } : themeConfig.colors;
  }, [mode]);

  const muiTheme = useMemo(() => {
    const t = createTheme({
      palette: {
        mode,
        primary: { main: activeColors.primary },
        background: {
          default: activeColors.background,
          paper: activeColors.background2,
        },
        text: {
          primary: activeColors.primarytext,
          secondary: activeColors.secondarytext,
        },
        custom: activeColors,
      },
    });
    return { ...t, alpha };
  }, [mode, activeColors]);

  // Handle CSS Variables & Body Styles
  useEffect(() => {
    // ✅ FIX 2: Save preference to LocalStorage whenever mode changes
    localStorage.setItem('themeMode', mode);

    const themeVars = themeConfig[mode] || themeConfig.light;

    // Set Gray scales
    Object.keys(themeVars).forEach((key) => {
      document.documentElement.style.setProperty(key, themeVars[key]);
    });

    // Set Color variables
    Object.keys(themeConfig.colors).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}-color`, activeColors[key]);
    });

    // Apply to Body immediately
    document.body.style.backgroundColor = activeColors.background;
    document.body.style.color = activeColors.primarytext;

  }, [mode, activeColors]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};