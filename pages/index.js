import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ColorModeContext, useMode } from "../src/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../src/scenes/global/Topbar";

export default function App() {
  const [ theme, colorMode ] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
