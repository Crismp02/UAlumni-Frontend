import { Box, Text, Icon, Center } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
function FooterEgresado() {
  return (
    <Box
      backgroundColor="#787878"
      width="100%"
      height="auto"
      display="flex"
      flexDirection={["column", "column", "row", "row"]}
      justifyContent={["center", "center", "space-around", "space-around"]}
      alignItems={["center", "center", "flex-start", "flex-start"]}
      borderTop="4px solid #007935"
    >
      <Box width={["80%", "80%", "25%", "25%"]} height="auto" padding="10px">
        <Text fontSize="sm" as="b" color="white">
          DIRECCIÓN
        </Text>
        <Text fontSize="13px" paddingTop="5px" color="white">
          Prolongación Av. Atlántico. Ciudad Guayana, Edo. Bolívar - Venezuela
        </Text>
        <Text fontSize="13px" paddingTop="5px" color="white">
          RIF: J-00012255-5
        </Text>
      </Box>
      <Box height="auto" padding="10px" width={["80%", "80%", "40%", "40%"]}>
        <Box
          width="100%"
          height="auto"
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Text fontSize="sm" as="b" color="white">
            ¿TIENES ALGÚN PROBLEMA, DUDA O COMENTARIO?
          </Text>
        </Box>
        <Box
          height={["auto", "auto", "100%", "100%"]}
          display="flex"
          flexDirection={["column", "column", "row", "row"]}
          marginTop="15px"
        >
          <Box width="50%" height="auto">
            <Text fontSize="sm" as="b" color="white" textAlign="center">
              DUDAS Y CONSULTAS
            </Text>
            <Link to="/FrecuentlyAskedQuestions">
              <Text
                fontSize="sm"
                color="white"
                marginTop="5px"
                textDecoration="underline"
              >
                Preguntas frecuentes
              </Text>
            </Link>
            <Link to="/TermsAndConditions">
              <Text fontSize="sm" color="white" textDecoration="underline">
                Términos y condiciones
              </Text>
            </Link>
          </Box>
          <Box width="50%" height="auto" marginLeft="50px" textAlign="center">
            <Text fontSize="sm" as="b" color="white">
              CONTACTOS
            </Text>
            <Text
              fontSize="sm"
              color="white"
              marginTop="5px"
              textDecoration="underline"
            >
              <a href="mailto:correo@gmail.com">ualumni.ucab@gmail.com</a>
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        width={["80%", "80%", "25%", "25%"]}
        height={["auto", "auto", "100%", "100%"]}
        display="flex"
        flexDirection="column"
        paddingBottom="20px"
        padding="10px"
      >
        <Text fontSize="sm" as="b" color="white">
          SÍGUENOS EN LAS REDES
        </Text>
        <Box
          width="35px"
          height="35px"
          backgroundColor="#D9D9D9"
          borderRadius="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="10px"
        >
          <a
            href="https://www.instagram.com/egresados_ucabg/"
            target="_blank"
            rel="noreferrer"
          >
            <Center>
              <Icon as={FaInstagram} boxSize="20px" />
            </Center>
          </a>
        </Box>
      </Box>
    </Box>
  );
}
export default FooterEgresado;
