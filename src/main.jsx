import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./cores/landingpage/LandingPage";
import Login from "./cores/login/Login";
import Register from "./cores/register/Register";
import UnProtectedRoutes from "./cores/login/UnProtectedRoutes";
import ProtectedRoutes from "./cores/login/ProtectedRoutes";
import { CookiesProvider } from "react-cookie";

//Rutas de ejemplo, se pueden cambiar

const router = createBrowserRouter([
  {
    path: "/",
    element: <UnProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/profile",
        element: <div>Profile</div>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ToastContainer />
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
