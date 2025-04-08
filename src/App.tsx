import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PageviewIcon from '@mui/icons-material/Pageview';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet, Route } from 'react-router';
import type { Navigation } from '@toolpad/core';
import theme from './theme';
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    segment: '',
    icon: <DashboardIcon />,
  },
  {
    segment: 'zoeken',
    title: 'Zoeken',
    icon: <PageviewIcon />,
  },
];


export default function App() {
  return (
    <ReactRouterAppProvider
      theme={theme}
      navigation={NAVIGATION}
    >
      <title>LexusTracker</title>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
