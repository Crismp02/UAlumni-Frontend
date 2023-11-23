import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./cores/landingpage/LandingPage";
import Login from "./cores/login/Login";
import Register from "./cores/register/Register";

//Rutas de ejemplo, se pueden cambiar
const router = createBrowserRouter([
  {
    path: "/landing",
    element: <LandingPage/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
