import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  colors: {
    base: {
      50: "#f7f3ed",
      100: "#e4dccf",
      200: "#d4c5af",
      300: "#c4ae8c",
      400: "#b4966a",
      500: "#9b7d51",
      600: "#79613f",
      700: "#55462e",
      800: "#33291c",
      900: "#120e08",
    },
  },
});

export default theme;
