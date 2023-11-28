import React from "react";
import NavBarEgresados from "../../components/NavBarEgresados";
import Footer from "../../components/Footer";
import { Box, Text, Flex, Center, Button, Circle } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import CustomSwitch from "./Switch";

function PerfilEgresado() {
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

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
        <VStack spacing={4} marginRight="20px">
          <CustomSwitch isChecked={switchValue} onChange={handleSwitchChange} />
        </VStack>
      </Flex>

      

      <Box display="flex" justifyContent="space-between">
        <Box
          width="45%"
          bg="#D9D9D9"
          height="100%"
          marginRight="20px"
          marginBottom="20px"
          marginLeft="20px"
        >
          <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      marginTop="10"
    >
            <Circle
              size="100px"
              bg="gray.500"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
            >
              {/* Ícono de persona */}
            </Circle>
            </Box>
          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
            textAlign="center"
          >
            Nombre del Egresado
          </Text>
          <Text
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
            textAlign="center"
          >
            Carrera
          </Text>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            <Text
              bg="#007935"
              color="white"
              padding="4"
              borderRadius="4"
              cursor="pointer"
              fontWeight="BOLD"
              _hover={{ bg: "#005e28" }}
            >
              Cantidad de Descargas CV
            </Text>
          </Box>
          <Text
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
            textAlign="left"
            fontWeight="BOLD"
          >
            PORTAFOLIO
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0)"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="4"
            >
              <Text fontWeight="bold">Titulo del Portafolio</Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="2"
            >
              <Text marginRight="4">wwww.miportafolio.com</Text>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="4"
          >
            <Text fontWeight="bold" marginLeft="10">
              Sobre Mí
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="2"
          >
            <Text marginLeft="10" marginRight="10" marginBottom="10">
              Soy María, una licenciada en comunicadora social con 2 años de
              experiencia. Me apasiona crear experiencias visuales que impacten
              a las personas. Creo que el diseño gráfico es una herramienta
              poderosa que puede usarse para comunicar ideas de una manera
              efectiva
            </Text>
          </Box>
        </Box>
        <Box
          width="55%"
          bg="#D9D9D9"
          height="100%"
          marginRight="20px"
          marginBottom="20px"
        >
          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
          >
            Experiencia Laboral
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
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

          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
          >
            Educación
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0)"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="4"
            >
              <Text fontWeight="bold">Grado</Text>
              <Text marginRight="4">Año Final</Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="2"
            >
              <Text marginRight="4">Universidad Católica Andrés Bello</Text>
            </Box>
          </Box>

          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            HABILIDADES
          </Text>
          <Text
            fontSize="lg"
            fontWeight="bold"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            TÉCNICAS
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
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

          <Text
            fontSize="lg"
            fontWeight="bold"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            BLANDAS
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 100000
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

          <Text
            fontWeight="bold"
            fontSize="xl"
            margin="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Idiomas
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
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

          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Certificados
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
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

          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            INFORMACIÓN DE CONTACTO
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
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
