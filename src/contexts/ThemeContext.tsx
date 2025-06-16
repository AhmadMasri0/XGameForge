import { createContext, useMemo, useState, ReactNode, FC} from "react";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => { },
  mode: "light",
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

const getTheme = (mode: "light" | "dark"): ThemeOptions => ({
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
    activeTab: mode === "light" ? "black" : "#b8822c",
    inactiveTab: "gray",
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("themeMode");
    return (saved === "light" || saved === "dark") ? saved : "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const nextMode = prevMode === "dark" ? "light" : "dark";
          localStorage.setItem("themeMode", nextMode);
          return nextMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeContextProvider;
