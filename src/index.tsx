import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Layout from "./layout/dashboard";
import graphPage from "./pages/graphPage";
import searchPage from "./pages/searchPage";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import "./index.css";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "dashboard",
            Component: graphPage,
          },
          {
            path: "zoeken",
            Component: searchPage,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider  theme={theme} >
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
