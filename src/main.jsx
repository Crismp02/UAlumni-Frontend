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
import PerfilEgresado from "./cores/perfilEgresado/PerfilEgresado";
import PerfilEgresadoReclutador from "./cores/perfilEgresadoReclutador/PerfilEgresadoReclutador";
import OfertaTrabajo from "./cores/ofertasTrabajo/OfertaTrabajo";
import ConfirmEmailCode from "./cores/register/ConfirmEmailCode";
import EmailConfirmation from "./cores/register/EmailConfirmation";

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
      {
        path: "/confirm-email-code",
        element: <ConfirmEmailCode />
      },
      {
        path: "/confirm-email",
        element: <EmailConfirmation />
      },
      {
        path: "/alumni/:id/profile",
        element: <PerfilEgresadoReclutador/>,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/profile",
        element: <PerfilEgresado/>,
      },
      {
        path: "/job-offer/:id",
        element: <OfertaTrabajo/>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </ChakraProvider>
);

