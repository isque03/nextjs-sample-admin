import "../styles/globals.css";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { ColorModeContext, useMode } from "../src/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../src/scenes/global/Topbar";
import Dashboard from "../src/scenes/dashboard";
import Sidebar from "../src/scenes/global/Sidebar";
import {
  useQuery,
  useMutation,
  useQueryClient,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";

// Create a client
// https://tanstack.com/query/v3/docs/react/guides/ssr
//const [queryClient] = useState(() => new QueryClient());
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <CssBaseline />
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar />
                <Component {...pageProps} />
              </main>
            </div>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
