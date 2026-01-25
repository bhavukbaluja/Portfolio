import theme from "@utils/Config/Theme";

export function ApplyTheme(mode = null) {
  const themeVars = theme[mode] || theme.dark;

  Object.keys(themeVars).forEach((key) => {
    document.documentElement.style.setProperty(key, themeVars[key]);
  });

  document.body.style.backgroundColor = theme.colors.background;
  document.body.style.color = theme.colors.text;
  document.body.style.margin = "0";

  Object.keys(theme.colors).forEach((key) => {
    document.documentElement.style.setProperty(`--${key}-color`, theme.colors[key]);
  });
}
