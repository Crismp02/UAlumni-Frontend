import React from "react";
import { Box, Button, Flex, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Carreras(){
    const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
    return(
        <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#F5F5F5",
          marginTop: "120px",
          paddingBottom: "40px",
        }}
      >
        {isLargerThan700 ? <Text fontSize="4xl" textAlign="center" as="b" paddingTop="40px">
          ¿DE QUÉ CARRERA ES EL PROFESIONAL QUE BUSCAS?
        </Text> : <Text fontSize="2xl" textAlign="center" as="b" paddingTop="20px">
          ¿DE QUÉ CARRERA ES EL PROFESIONAL QUE BUSCAS?
        </Text>}

        <Stack p={{ base: 2, md: "20 20 5 20" }}>
          <Flex direction="row" justifyContent="center" wrap="wrap">
            <Box my={2} mx={8}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                ADMINISTRACIÓN
              </Button>
            </Box>
            <Box my={2} mx={8}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                COMUNICACIÓN SOCIAL
              </Button>
            </Box>
            <Box my={2} mx={8}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                CONTADURÍA
              </Button>
            </Box>
            <Box my={2} mx={8}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                DERECHO
              </Button>
            </Box>
            <Box my={2} mx={8}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                EDUCACIÓN
              </Button>
            </Box>
            <Box my={2} mx={8}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                INGENIERÍA CIVIL
              </Button>
            </Box>
            <Box my={2} mx={8}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                INGENIERÍA INDUSTRIAL
              </Button>
            </Box>
            <Box my={2} mx={8}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                INGENIERÍA INFORMÁTICA
              </Button>
            </Box>
            <Box my={2} mx={8}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                RELACIONES INDUSTRIALES
              </Button>
            </Box>
          </Flex>
        </Stack>   
      </div>
    )
}
export default Carreras;