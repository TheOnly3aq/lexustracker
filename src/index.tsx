import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeProvider } from "styled-components";
import App from './App';
import About from "./components/about";
import Dashboard from "./components/dashboard";
import NotFound from "./components/notFound";
import Photos from "./components/photos";
import Search from "./components/search";
import "./index.css";
import Layout from "./layout/home";
import theme from "./theme";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "",
            Component: Dashboard,
          },
          {
            path: "zoeken",
            Component: Search,
          },
          {
            path: "fotos",
            Component: Photos,
          },
          {
            path: "over",
            Component: About,
          },
          {
            path: "*",
            Component: NotFound,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
