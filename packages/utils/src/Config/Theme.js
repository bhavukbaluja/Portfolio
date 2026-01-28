const theme = {
  // These act as your Default / Light Mode colors
  colors: {
      trendingHeaderBg: "#000000",
      trendingHeaderText: "#ffffff",
      headerBg: "#ffffff",
      footerBg: "#ffffff",
      bg: "#FFF1F1",
      bgForDialog: "#ffffff",
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
      light: "#F8F9FA",
      dark: "#212529",
      primarytext: "#333333",
      secondarytext: "#757575",
      background: "#eeeeee",
      background2: "#F5F5F5",
      favorite: "#f44336",
      mainlighter: "#b6dcff",
      mainlight: "#6fa8dc",
      maindark: "#206baf",
      maindarker: "#013f77",
  },
  // NEW: Dark Mode Overrides (Keys must match 'colors' exactly)
  darkColors: {
      trendingHeaderBg: "#ffffff",     // Inverted
      trendingHeaderText: "#000000",   // Inverted
      headerBg: "#1e1e1e",             // Dark background
      footerBg: "#1e1e1e",
      bg: "#2C1A1A",                   // Darker version of #FFF1F1
      bgForDialog: "#2d2d2d",
      primary: "#90CAF9",              // Lighter blue for dark mode visibility
      primarylight: "#64B5F6",
      secondary: "#FFD54F",
      success: "#81C784",
      successdark: "#4CAF50",
      danger: "#E57373",
      dangerlight: "#EF9A9A",
      warning: "#FFB74D",
      info: "#4FC3F7",
      infolight: "#81D4FA",
      light: "#212529",                // Inverted
      dark: "#F8F9FA",                 // Inverted
      primarytext: "#E0E0E0",          // Light text for dark bg
      secondarytext: "#B0B0B0",
      background: "#121212",           // Standard dark mode bg
      background2: "#1E1E1E",
      favorite: "#E57373",
      mainlighter: "#0d2b4a",          // Darker version of mainlighter
      mainlight: "#206baf",
      maindark: "#6fa8dc",
      maindarker: "#b6dcff",
  },
  // ... your existing light/dark objects for gray scales ...
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
      "--color-gray-50": "oklch(17% 1% 264)",
      "--color-gray-100": "oklch(28% 3% 264 / 65%)",
      "--color-gray-200": "oklch(31% 3% 264 / 80%)",
      "--color-gray-300": "oklch(35% 3% 264 / 80%)",
      "--color-gray-400": "oklch(47% 3.5% 264 / 80%)",
      "--color-gray-500": "oklch(64% 4% 264 / 80%)",
      "--color-gray-600": "oklch(82% 4% 264 / 80%)",
      "--color-gray-700": "oklch(92% 4.5% 264 / 80%)",
      "--color-gray-800": "oklch(93% 3.5% 264 / 85%)",
      "--color-gray-900": "oklch(95% 2% 264 / 90%)",
      "--color-gray-950": "oklch(94% 1.5% 264 / 95%)",
  },
};

export default theme;