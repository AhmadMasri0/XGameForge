import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext({
  toggleColorMode: () => { },
  mode: 'light'
});

const getTheme = (mode) => ({
  palette: {
    mode,
    primary: { main: "#0a1724" },
    secondary: { main: "#f50057" },
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
    primary: mode === "light" ? "#1a1a1a" : "#ffffff",
    activeTab: mode === 'light' ? 'black' : '#b8822c',
    inactiveTab: 'gray',
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

export default function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => {
        const nextMode = prevMode === "dark" ? "light" : "dark";
        localStorage.setItem("themeMode", nextMode);
        return nextMode;
      });
    },
    mode,
  }), [mode]);

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
