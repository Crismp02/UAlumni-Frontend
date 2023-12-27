import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Faq from "./cores/FQA/Faq";
import LandingPage from "./cores/landingpage/LandingPage";
import ListarOfertasPrincipal from "./cores/listarOfertas/ListarOfertasPrincipal";
import App from "./cores/listarEgresados/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/listarEgresados",
    element: <App/>,
  },
  {
    path: "/listarOfertas",
    element: <ListarOfertasPrincipal/>,
  },
  {
    path: "/PreguntasFrecuentes",
    element: <Faq/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
