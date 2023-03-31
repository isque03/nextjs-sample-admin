import { useState } from "react";
import styles from "../styles/Home.module.css";
import { ColorModeContext, useMode } from "../src/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../src/scenes/global/Topbar";
import Dashboard from "../src/scenes/dashboard";
import Sidebar from "../src/scenes/global/Sidebar";

// pages
/*
import Team from "../src/scenes/team";
import Invoices from "../src/scenes/invoices";
import Offers from "../src/scenes/offers";
import Campaigns from "../src/scenes/campaigns";
import Catalog from "../src/scenes/catalog";
import Audiences from "../src/scenes/audiences";
import Bar from "../src/scenes/bar";
import Form from "../src/scenes/form";
import Pie from "../src/scenes/pie";
import FAQ from "../src/scenes/faq";
import Geography from "../src/scenes/geography";
import Calendar from "../src/scenes/calendar";
*/

export default function App() {
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
            <Dashboard />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
