import { MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
  focusRingStyles: {
    resetStyles: () => ({ outline: "none" }),
    styles: (theme) => ({ outline: `2px solid ${theme.colors.primary[2]}` }),
    inputStyles: (theme) => ({
      outline: `2px solid ${theme.colors.primary[2]}`,
    }),
  },
  white: "#F5F5f5",
  black: "#111111",
  colors: {
    primary: [
      "#FFF4D7",
      "#FFDE89",
      "#FFCB47",
      "#FFBC11",
      "#DA9C00",
      "#AE7D00",
      "#8B6400",
      "#6F5000",
      "#594000",
      "#473300",
    ],
    secondary: [
      "#FFCABA",
      "#FF9270",
      "#FF6433",
      "#FF3D00",
      "#CC3100",
      "#A32700",
      "#831F00",
      "#681900",
      "#541400",
      "#431000",
    ],
    neutral: ["#F5F5F5", "", "", "", "", "", "", "", "", "#111111"],
  },
  primaryShade: 4,
};

export default theme;
