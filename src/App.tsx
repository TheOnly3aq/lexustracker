import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import InfoIcon from "@mui/icons-material/Info";
import { Outlet, Route } from 'react-router';
import type { Navigation } from '@toolpad/core';
import theme from './theme';
import { Analytics } from "@vercel/analytics/react";
import Hotjar from "@hotjar/browser";

const siteId = 6427982;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

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
      <Outlet />
      <Analytics />
    </ReactRouterAppProvider>
  );
}
