import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import type { FC, PropsWithChildren } from "react";

const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#7B1FA2", // глубокий фиолетовый
      light: "#9C27B0", // светлый фиолетовый
      dark: "#4A148C", // темный фиолетовый
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E1BEE7", // светлый лавандовый
      light: "#F3E5F5", // очень светлый фиолетовый
      dark: "#BA68C8", // средний фиолетовый
      contrastText: "#000000",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      color: "#4A148C",
    },
    h2: {
      fontWeight: 600,
      color: "#4A148C",
    },
    h3: {
      fontWeight: 500,
      color: "#7B1FA2",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#4A148C",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#4A148C",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(123, 31, 162, 0.1)",
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <MuiThemeProvider theme={purpleTheme}>{children}</MuiThemeProvider>;
};

export { ThemeProvider };
