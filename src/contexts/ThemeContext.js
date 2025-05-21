import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

 const getTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#0a1724", 
    },
    secondary: {
      main: "#f50057", 
    },
    background: {
      default: mode === "light" ? "#f5f5f5" : "#121212",
      paper: mode === "light" ? "#ffffff" : "#1d1d1d",
    },
    text: {
      primary: mode === "light" ? "#1a1a1a" : "#ffffff",
    },
  },
  customColors: {
    activelink: "#b8822c",
    inactivelink: mode === "light" ? "#1a1a1a" : "#ffffff",
    // arrowsColor: '#0a1724 !important'
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

export default function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(() => ({
    toggleColorMode: () =>
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
  }), []);

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
