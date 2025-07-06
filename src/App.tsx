import Hotjar from "@hotjar/browser";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Navigation } from "@toolpad/core";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import { Outlet } from "react-router";
import theme from "./theme";
const siteId = 6427982;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

const queryClient = new QueryClient();

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    segment: "",
    icon: <DashboardIcon />,
  },
  {
    segment: "zoeken",
    title: "Zoeken",
    icon: <QueryStatsIcon />,
  },
  {
    segment: "fotos",
    title: "Foto's bekijken",
    icon: <PhotoLibraryIcon />,
  },
  {
    segment: "over",
    title: "Over",
    icon: <InfoIcon />,
  },
];

export default function App() {
  return (
    <ReactRouterAppProvider theme={theme} navigation={NAVIGATION}>
      <title>LexusTracker</title>
      <QueryClientProvider client={queryClient}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ height: "100%" }}
        >
          <Outlet />
          <Analytics />
        </motion.div>
      </QueryClientProvider>
    </ReactRouterAppProvider>
  );
}
