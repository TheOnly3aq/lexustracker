import { ThemeOptions } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/montserrat';
const lexusTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#9d0100",
          light: "#F45B69",
          dark: "#9d0100",
        },
        secondary: {
          main: "#f50057",
          light: "#ffeff0",
        },
        background: {
          default: "#f7f7f7",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#9d0100",
          light: "#F45B69",
          dark: "#9d0100",
        },
        secondary: {
          main: "#f50057",
          light: "#291311",
        },
        background: {
          default: "#252424",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
});

export default lexusTheme;
