import "../styles/globals.css";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { ColorModeContext, useMode } from "../src/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../src/scenes/global/Topbar";
import Dashboard from "../src/scenes/dashboard";
import Sidebar from "../src/scenes/global/Sidebar";

function MyApp({ Component, pageProps }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar />
            <Component {...pageProps} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
