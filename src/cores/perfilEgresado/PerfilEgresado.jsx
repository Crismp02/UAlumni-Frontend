import React from "react";
import NavBarEgresados from "../../components/NavBarEgresados";
import Footer from "../../components/Footer";
import { Box, Text, Flex, Center, Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EditIcon } from "@chakra-ui/icons";

function PerfilEgresado() {
  return (
    <div>
      <NavBarEgresados />

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
        PERFIL
      </Text>

      <Flex justifyContent="flex-end" alignItems="center" marginBottom="5px">
        <ViewIcon marginRight="20px" />
        <EditIcon marginRight="20px" />
      </Flex>

      <Box display="flex" justifyContent="space-between">
        <Box
          width="45%"
          bg="#D9D9D9"
          height="100vh"
          marginRight="20px"
          marginBottom="20px"
          marginLeft="20px"
        ></Box>
        <Box
          width="55%"
          bg="#D9D9D9"
          height="100%"
          marginRight="20px"
          marginBottom="20px"
        >
          <Text fontWeight="bold" fontSize="xl" marginBottom="4" margin="10">
            Experiencia Laboral
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            margin="10"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="4"
            >
              <Text fontWeight="bold">Nombre de la Empresa</Text>
              <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
                Posición
              </Text>
            </Box>
            <Text fontSize="md" marginBottom="2">
              Fecha Inicio - Fecha Final
            </Text>
            <Text>
              En este cargo como Jefe de Comunicaciones en la Corporación XYZ,
              logró aumentar el tráfico web en un 20%.
            </Text>
          </Box>

          <Text fontWeight="bold" fontSize="xl" marginBottom="4" margin="10">
            Educación
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            margin="10"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0)"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="4"
            >
              <Text fontWeight="bold">Universidad Católica Andrés Bello</Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="2"
            >
              <Text marginRight="4">Grado</Text>
              <Text marginLeft="4">Fecha Inicio - Fecha Final</Text>
            </Box>
          </Box>

          <Text fontWeight="bold" fontSize="xl" marginBottom="4" margin="10">
            Habilidades
          </Text>
          <Text fontSize="lg" fontWeight="bold" margin="10">
            Técnicas
          </Text>
          <Box display="flex" flexDirection="row" flexWrap="wrap" margin="10">
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 1
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 2
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 3
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 4
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 5
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 6
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 7
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 8
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 9
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 10
              </Text>
            </Box>
          </Box>

          <Text fontWeight="bold" fontSize="xl" marginBottom="4" margin="10">
            Idiomas
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            margin="10"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
          >
            <Box display="flex" alignItems="center" marginBottom="4">
              <Text fontWeight="bold">Idioma</Text>
              <Text
                bg="#FBC430"
                color="black"
                padding="2"
                borderRadius="8"
                marginLeft="5"
              >
                Nivel
              </Text>
            </Box>
          </Box>

          <Text fontWeight="bold" fontSize="xl" marginBottom="4" margin="10">
            Certificados
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            margin="10"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="4"
            >
              <Text fontWeight="bold">Título Certificado</Text>
              <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
                CIAP
              </Text>
            </Box>
            <Text fontSize="md" marginBottom="2">
              Fecha Emisión
            </Text>
          </Box>

          <Text fontWeight="bold" fontSize="xl" marginBottom="4" margin="10">
            INFORMACIÓN DE CONTACTO
          </Text>
          <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="4"
              margin="10"
            >
          <Text
            bg="#007935"
            color="white"
            padding="4"
            borderRadius="4"
            cursor="pointer"
            _hover={{ bg: "#005e28" }}
          >
            Descargar CV
          </Text>

        </Box>
        </Box>
      </Box>

      <Footer />
    </div>
  );
}

export default PerfilEgresado;
