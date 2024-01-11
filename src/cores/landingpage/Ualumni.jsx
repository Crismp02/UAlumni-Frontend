import React from "react";
import { Box, Text, Image, useMediaQuery } from "@chakra-ui/react";
import EgresadosFoto from "../../images/egresados.jpg";
import { Link } from "react-router-dom";

function UAlumni(){
    const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
    return(
        <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100vw"
          minHeight={["20vh", "40vh", "70vh", "90vh", "100vh"]}
        >
          <Image
            src={EgresadosFoto}
            alt="Egresados"
            width="100%"
            height="auto"
          />

          <Box
            position="absolute"
            backgroundColor="rgba(255,255,255,0.8)"
            boxShadow="0 0 0 1px #FFFFFF"
            padding="8px"
            backgroundClip="content-box"
            width={["100%", "90%", "70%", "45%"]}
            zIndex="2"
          >
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
              }}
            >
              UALUMNI
            </Text>
            {isLargerThan600 ? <Text
              fontSize={["small", "md", "md", "md"]}
              color="black"
              textAlign="center"
              px="20px"
              paddingBottom="10px"
            >
              
              UAlumni es una plataforma digital que conecta a egresados UCAB con el mercado laboral. Los egresados pueden crear sus perfiles profesionales y buscar oportunidades laborales. Los reclutadores, por su parte, pueden acceder a los perfiles de los egresados y encontrar profesionales con las habilidades y experiencia que necesitan, con el sello ucabista garantizado.
            </Text> : <Text
              fontSize={["small", "md", "md", "md"]}
              color="black"
              textAlign="center"
              px="20px"
              paddingBottom="10px"
            >
              
UAlumni es una plataforma digital que conecta egresados UCAB con empresas que buscan profesionales ucabistas.
            </Text>}
          </Box>
        </Box>
      </Box>
    );
}
export default UAlumni;