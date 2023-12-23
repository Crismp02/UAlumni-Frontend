import { Box, Text } from "@chakra-ui/layout";
import { DrawerOverlay } from "@chakra-ui/react";
import FiltrarNombre from "./FiltrarNombre";
import FiltrarSkills from "./FiltrarSkills";
import FiltrarPositions from "./FiltrarPositions";

export default function PantallaFiltros() {
  return (
    <div>
        <Box 
            display="flex" flexDirection={{ base: "column", md: "row" }}
            width={{ base: "100%", md: "45%" }}
            bg="#F3FAF7"
            height="100%"
            marginRight={{ base: "0", md: "20px" }}
            marginBottom={{ base: "20px", md: "0" }}
            marginLeft={{ base: "0", md: "20px" }}
            position="relative">
                <Box >
                    <Text
                            fontSize={["lg", "lg", "xl", "4xl"]}
                            color="black"
                            textAlign="center"
                            as="b"
                            paddingTop={["2px", "2px", "2px", "10px"]}
                            marginTop="10px"
                            marginBottom="10px"
                            style={{
                            textDecoration: "underline",
                            textDecorationColor: "green",
                            display: "flex",
                            justifyContent: "center",
                            }}>FILTROS
                     </Text>
                    {/*Busqueda por nombre*/}
                    <FiltrarNombre
                    />
                    {/*Busqueda por habilidad*/}
                    {/*Busqueda por posiciones de interes*/}
        

                </Box>
        </Box>
    </div>
  )
}
