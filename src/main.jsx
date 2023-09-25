import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Airports from "./components/Airports.jsx";
import CurrencyExchange from "./components/CurrencyExchange.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:countryId",
    element: <App />,
    children: [
      {
        path: "",
        element: <CurrencyExchange />,
      },
      {
        path: "airports",
        element: <Airports />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
