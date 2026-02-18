const theme = {
    // ----------------------------------------
    // LIGHT MODE (Your updated pink/wine palette)
    // ----------------------------------------
    colors: {
      trendingHeaderBg: "#000000",
      trendingHeaderText: "#ffffff",
      headerBg: "#d5a6bd",        // Dusty Pink
      footerBg: "#ffffff",
      bg: "#ffffff",
      bgForDialog: "#ffffff",
      
      // Semantic Colors (Standard)
      primary: "#1976D2",
      primarylight: "#1E90FF",
      secondary: "#FFC107",
      success: "#4CAF50",
      successdark: "#38761d",
      danger: "#D32F2F",
      dangerlight: "#e06666",
      warning: "#FFA000",
      info: "#0288D1",
      infolight: "#58c4fe",
      
      // Neutrals
      light: "#F8F9FA",
      dark: "#212529",
      primarytext: "#000000",
      secondarytext: "#757575",
      background: "#eeeeee",
      background2: "#F5F5F5",
      favorite: "#f44336",
      
      // Brand Colors (Pink/Wine Scale)
      mainlighter: "#ead1dc",     // Very Light Pink
      mainlight: "#ead1dc",       // (Duplicate as requested)
      maindark: "#a64d79",        // Deep Magenta
      maindarker: "#741b47",      // Dark Wine
    },
  
    // ----------------------------------------
    // DARK MODE (Updated to match Pink/Wine Theme)
    // ----------------------------------------
    darkColors: {
      trendingHeaderBg: "#ffffff",
      trendingHeaderText: "#000000",
      
      // Backgrounds: shifted from "Gray" to "Dark Plum/Black" for cohesion
      headerBg: "#1F1116",        // Very dark wine (almost black)
      footerBg: "#1F1116",
      bg: "#000000",              // Deepest warm black
      bgForDialog: "#2A1B22",     // Slightly lighter plum for cards/dialogs
      
      // Semantic Colors (Lightened for visibility on dark)
      primary: "#90CAF9",
      primarylight: "#64B5F6",
      secondary: "#FFD54F",
      success: "#81C784",
      successdark: "#4CAF50",
      danger: "#E57373",
      dangerlight: "#EF9A9A",
      warning: "#FFB74D",
      info: "#4FC3F7",
      infolight: "#81D4FA",
      
      // Neutrals
      light: "#1e1e1e",
      dark: "#F8F9FA",
      primarytext: "#f3f6f4",     // Using your light pink for main text
      secondarytext: "#BCAAA4",   // Warm Gray
      background: "#0F080A",      // Darkest background
      background2: "#1A1013",     // Secondary background
      favorite: "#E57373",
      
      // Brand Colors (Inverted logic for Dark Mode)
      // "Lighter" vars usually become the dark background shades in dark mode
      // "Darker" vars usually become the bright pop text in dark mode
      mainlighter: "#2D121D",     // Dark Plum (Background elements)
      mainlight: "#4A152D",       // Medium Wine
      maindark: "#D5A6BD",        // Dusty Pink (High visibility accent)
      maindarker: "#F4D9E6",      // Almost White Pink (Text/Icons)
    },
  
    // ----------------------------------------
    // GRAY SCALES (OKLCH)
    // ----------------------------------------
    light: {
      "--color-blue": "oklch(45% 50% 264)",
      "--color-red": "oklch(50% 55% 31)",
      "--color-gray-50": "oklch(98.42% 0.0034 247.86)",
      "--color-gray-100": "oklch(12% 9.5% 264 / 5%)",
      "--color-gray-200": "oklch(12% 9% 264 / 8%)",
      "--color-gray-300": "oklch(12% 8.5% 264 / 17%)",
      "--color-gray-400": "oklch(12% 8% 264 / 38%)",
      "--color-gray-500": "oklch(12% 7.5% 264 / 50%)",
      "--color-gray-600": "oklch(12% 7% 264 / 67%)",
      "--color-gray-700": "oklch(12% 6% 264 / 77%)",
      "--color-gray-800": "oklch(12% 5% 264 / 85%)",
      "--color-gray-900": "oklch(12% 5% 264 / 90%)",
      "--color-gray-950": "oklch(12% 5% 264 / 95%)",
    },
    dark: {
      "--color-blue": "oklch(69% 50% 264)",
      "--color-red": "oklch(80% 55% 31)",
      // Updated gray scale to have a very subtle warm/purple tint 
      // to match the pink theme (hue changed from 264->300 slightly)
      "--color-gray-50": "oklch(17% 1% 300)", 
      "--color-gray-100": "oklch(28% 3% 300 / 65%)",
      "--color-gray-200": "oklch(31% 3% 300 / 80%)",
      "--color-gray-300": "oklch(35% 3% 300 / 80%)",
      "--color-gray-400": "oklch(47% 3.5% 300 / 80%)",
      "--color-gray-500": "oklch(64% 4% 300 / 80%)",
      "--color-gray-600": "oklch(82% 4% 300 / 80%)",
      "--color-gray-700": "oklch(92% 4.5% 300 / 80%)",
      "--color-gray-800": "oklch(93% 3.5% 300 / 85%)",
      "--color-gray-900": "oklch(95% 2% 300 / 90%)",
      "--color-gray-950": "oklch(94% 1.5% 300 / 95%)",
    },
  };
  
  export default theme;