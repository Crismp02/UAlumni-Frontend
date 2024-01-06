import { Box, Text, useMediaQuery, Icon, Center } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
function FooterEgresado() {
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");
  return (
    <div
      style={{
        backgroundColor: "#787878",
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: isLargerThan400 ? "row" : "column",
        justifyContent: "space-between",
        borderTop: "4px solid #007935",
      }}
    >
      <Box
        width={isLargerThan400 ? "auto" : "100%"}
        height="auto"
        padding="10px"
        paddingLeft={isLargerThan700 ? "5vw" : isLargerThan400 ? "3vw" : "2vw"}
      >
        {isLargerThan700 ? (
          <>
            <Text fontSize="sm" as="b" color="white">
              DIRECCIÓN
            </Text>
            <Text fontSize="13px" paddingTop="5px" color="white">
              Prolongación Av. Atlántico. Ciudad Guayana, Edo. Bolívar -
              Venezuela
            </Text>
            <Text fontSize="13px" paddingTop="5px" color="white">
              RIF: J-00012255-5
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="sm" as="b" color="white">
              DIRECCIÓN
            </Text>
            <Text fontSize="13px" paddingTop="5px" color="white">
              Prolongación Av. Atlántico. Ciudad Guayana, Edo. Bolívar -
              Venezuela
            </Text>
            <Text fontSize="11px" paddingTop="5px" color="white">
              RIF: J-00012255-5
            </Text>
          </>
        )}
      </Box>
      <Box
        width={isLargerThan400 ? "auto" : "100%"}
        height="auto"
        padding="10px"
        paddingLeft={isLargerThan700 ? "5vw" : isLargerThan400 ? "3vw" : "2vw"}
      >
        {isLargerThan700 ? (
          <>
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
              width="100%"
              height="auto"
              display="flex"
              flexDirection="row"
              marginTop="15px"
            >
              <Box width="50%" height="auto">
                <Text fontSize="sm" as="b" color="white">
                  DUDAS Y CONSULTAS
                </Text>
                <Link to="/FrecuentlyAskedQuestions">
                <Text fontSize="sm" color="white" marginTop="5px">
                  Preguntas frecuentes
                </Text>
                </Link>
                <Link to="/TermsAndConditions">
                <Text fontSize="sm" color="white">
                  Términos y condiciones
                </Text>
                </Link>
              </Box>
              <Box width="50%" height="auto" marginLeft="50px">
                <Text fontSize="sm" as="b" color="white">
                  CONTACTOS
                </Text>
                <Text fontSize="sm" color="white" marginTop="5px">
                  <a href="mailto:correo@gmail.com">ualumni.ucab@gmail.com</a>
                </Text>
              </Box>
            </Box>
          </>
        ) : (
          <>
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
              width="100%"
              height="auto"
              display="flex"
              flexDirection="column"
              marginTop="15px"
              marginLeft="20px"
            >
              <Box width="100%" height="auto">
                <Text fontSize="sm" as="b" color="white">
                  DUDAS Y CONSULTAS
                </Text>
                <Link to="/FrecuentlyAskedQuestions">
                <Text fontSize="13px" color="white" marginTop="5px">
                  Preguntas frecuentes
                </Text>
                </Link>
                <Link to="/TermsAndConditions">
                <Text fontSize="13px" marginTop="5px" color="white">
                  Términos y condiciones
                </Text>
                </Link>
              </Box>
              <Box width="50%" height="auto" marginTop="15px">
                <Text fontSize="sm" as="b" color="white">
                  CONTACTOS
                </Text>
                <Text fontSize="13px" color="white" marginTop="5px">
                  <a href="mailto:correo@gmail.com">ualumni.ucab@gmail.com</a>
                </Text>
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Box
        width={isLargerThan400 ? "auto" : "100%"}
        height="auto"
        display="flex"
        flexDirection="column"
        paddingRight={["0px", "100px"]}
        paddingLeft={["20px", "20px"]}
        paddingBottom="20px"
        padding="10px"
      >
        {isLargerThan700 ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </div>
  );
}
export default FooterEgresado;
