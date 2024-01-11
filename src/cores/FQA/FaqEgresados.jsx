import { Box, Text, Flex } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import NavBarEgresados from "../../components/NavbarEgresados";
import FaqDataE from "./FaqDataE";

function FaqEgresados() {
  return (
    <Box
    width="100vw"
    backgroundColor="#F5F5F5"
    display="flex"
    flexDirection="column"
    minHeight="100vh"
    >
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
        PREGUNTAS FRECUENTES
      </Text>

      {/*División de la pantalla en las preguntas y el mensaje de ¿Aún tienes dudas?*/}
      <Flex
        justifyContent="space-around"
        alignItems={["center", "center", "start", "start"]}
        gap={[5, 5, 0, 0]}
        paddingTop="40px"
        flexGrow="1"
        flexDirection={["column", "column", "row", "row"]}
        width="100%"
        paddingX= {[2, 5, 10, 10]}
      >
        {/*mensaje de ¿Aún tienes dudas?*/}
        <Box width={["70%", "65%", "35%", "30%"]}>
          {/* {isLargerThan600 ? */}
          <Box
            backgroundColor="white"
            borderRadius="10px"
          >
            <Box
              display="flex"
              justifyContent="center"
              borderBottom="1px solid #E5E5E5"
            >
              <Text
                fontSize={["sm", "sm", "md", "md"]}
                color="green"
                textAlign="center"
                as="b"
              >
                ¿Aún tienes dudas?
              </Text>
            </Box>

            <Text
              fontSize={["small", "small", "small", "sm"]}
              color="black"
              px="20px"
              paddingTop="10px"
              textAlign="center"
            >
              Si no encuentras una solución a tu problema puedes contactárnos
              por nuestro correo
            </Text>
            <Text
              fontSize={["small", "small", "small", "small"]}
              color="black"
              px="20px"
              paddingTop="20px"
              paddingBottom="30px"
              as="b"
              textAlign="center"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              ualumni.ucab@gmail.com
            </Text>
          </Box>
        </Box>

        {/*Preguntas con sus respuestas*/}
        <Box width={["95%", "85%", "60%", "60%"]}>
          <FaqDataE />
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
}

export default FaqEgresados;
