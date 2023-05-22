import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Job from "./pages/Job";
import Dashboard from "./pages/Dashboard";
import NewJob from "./pages/NewJob";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Update from "./pages/Update";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/job/:id",
    element: <Job />,
  },
  {
    path: "/new",
    element: <NewJob />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/update/:slug",
    element: <Update />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/apply/:id",
    element: <Apply />,
  },
  {
    path: "/applications/:id",
    element: <Applications />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
