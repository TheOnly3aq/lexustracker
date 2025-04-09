import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layout/home';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import './index.css';
import Search from './components/search';
import Dashboard from './components/dashboard';
import About from './components/about';
import Photos from './components/photos';
import NotFound from './components/notFound';

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
