import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import FaqData from "./FaqData";
import Footer from "../../components/Footer";
import NavBarEgresados from "../../components/NavBarEgresados";

function FaqEgresados() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
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
      <Grid
        justifyContent="center"
        paddingTop="40px"
        gridAutoFlow={["row", "row", "column", "column"]}
        gap={[10, 10, 6, 6]}
        gridTemplateColumns="35% 65%"
        marginBottom="-100px"
        flexGrow="1"
      >
        {/*mensaje de ¿Aún tienes dudas?*/}
        <GridItem boxSize={["xs", "xs", "sm", "sm"]} gridColumn="1 / 2">
          {/* {isLargerThan600 ? */}
          <Box
            backgroundColor="white"
            borderRadius="10px"
            marginLeft="50px"
            width={["45%", "60%", "70%", "90%", "100%"]}
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
        </GridItem>

        {/*Preguntas con sus respuestas*/}
        <GridItem boxSize={["md", "md", "lg", "2xl"]} gridColumn="2 / 3">
          <FaqData />
        </GridItem>
      </Grid>

      <Footer />
    </div>
  );
}

export default FaqEgresados;
