import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";
import type { Navigation } from "@toolpad/core";
import theme from "./theme";
const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    segment: "dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "zoeken",
    title: "Zoeken",
    icon: <ShoppingCartIcon />,
  },
];

const BRANDING = {
  logo: (
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tWdewVa7O_B077QJkagunWrbEYhOr7Qlyw&s"
      alt="MUI logo"
    />
  ),
  title: "Lexus Tracker",
};

export default function App() {
  return (
    <ReactRouterAppProvider
      theme={theme}
      navigation={NAVIGATION}
      branding={BRANDING}
    >
      <Outlet  />
    </ReactRouterAppProvider>
  );
}
