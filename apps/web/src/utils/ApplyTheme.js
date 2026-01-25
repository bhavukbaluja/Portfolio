import theme from "@utils/Config/Theme";

export function ApplyTheme(mode = 'dark') {
  const isDark = mode === 'dark';

  // 1. Apply the OKLCH grays (Existing Logic)
  const themeVars = theme[mode] || theme.light;
  Object.keys(themeVars).forEach((key) => {
    document.documentElement.style.setProperty(key, themeVars[key]);
  });

  // 2. Determine the active color palette
  // If dark mode, merge defaults with dark overrides. 
  // If light mode, just use defaults.
  const activeColors = isDark 
    ? { ...theme.colors, ...theme.darkColors } 
    : theme.colors;

  // 3. Update all CSS variables (--primary-color, --bg-color, etc.)
  Object.keys(theme.colors).forEach((key) => {
    // This will pick the Dark value if isDark is true and the key exists in darkColors
    const colorValue = activeColors[key]; 
    document.documentElement.style.setProperty(`--${key}-color`, colorValue);
  });

  // 4. Update Body Styles
  document.body.style.backgroundColor = activeColors.background;
  document.body.style.color = activeColors.primarytext;
  document.body.style.margin = "0";
}