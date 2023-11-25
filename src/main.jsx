import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./cores/landingpage/LandingPage";
import ListarEgresados from "./cores/listarEgresados/ListarEgresados";
import ListarOfertas from "./cores/listarOfertas/ListarOfertas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/listarEgresados",
    element: <ListarEgresados/>,
  },
  {
    path: "/listarOfertas",
    element: <ListarOfertas/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
