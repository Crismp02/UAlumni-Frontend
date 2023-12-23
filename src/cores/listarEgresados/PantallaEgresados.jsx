
import {Box} from "@chakra-ui/react";
 import ListarEgresados from "./ListarEgresados";
import FiltrosButtons from "./FiltrosButtons";
import PantallaFiltros from "./PantallaFiltros";
import FiltrosEgresados from "./FiltrosEgresados";

export default function PantallaEgresados() {

    
  return (
    <div>

        <Box 
          display="flex" flexDirection={{ base: "column", md: "row" }}
          width={{ base: "100%", md: "45%" }}
          bg="#F3FAF7"
        //   height="100%"
          minHeight="100vh" // Establecer una altura mínima
          marginRight={{ base: "0", md: "20px" }}
          marginBottom={{ base: "20px", md: "0" }}
          marginLeft={{ base: "0", md: "20px" }}
          position="relative">
                <PantallaFiltros/>
                <ListarEgresados />
        </Box>
    </div>
  )
}
