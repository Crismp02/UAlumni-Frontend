import NavBar from "../../components/Navbar";
import EgresadosFoto from "../../images/egresados.jpg";
import EgresadosLanding from "../../images/egresadosLanding.jpg";
import ReclutadoresLanding from "../../images/reclutadoreslanding.jpg";
import {
  Text,
  Stack,
  Box,
  Image,
  Flex,
  Grid,
  GridItem,
  useMediaQuery
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import { Link } from 'react-router-dom';

function LandingPage() {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  return (
    <div>
      <NavBar />
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
            // height={["90%", "90%","70%", "50%"]}
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
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {isLargerThan700 ? <Text fontSize="4xl" textAlign="center" as="b" paddingTop="40px">
          ¿QUIÉN SOY?
        </Text> : <Text fontSize="2xl" textAlign="center" as="b" paddingTop="30px">
          ¿QUIÉN SOY?
        </Text>}
        <Grid
          justifyContent="center"
          paddingTop="40px"
          gridAutoFlow={["row", "row", "column", "column"]}
          gap={[10, 10, 6, 6]}
        >
          <GridItem boxSize={["", "", "sm", "sm"]}>
            <Image src={EgresadosLanding} alt="egresadosLanding" />
            <Button
              backgroundColor="#007935"
              color="white"
              _hover={{ bg: "#025024" }}
              width="100%"
              marginTop="20px"
              paddingTop="10px"
              paddingBottom="10px"
            >
              SOY EGRESADO
            </Button>
          </GridItem>
          <GridItem boxSize={["", "", "sm", "sm"]}>
            <Image src={ReclutadoresLanding} alt="reclutadoresLanding" />
            <Button
              backgroundColor="#007935"
              color="white"
              _hover={{ bg: "#025024" }}
              width="100%"
              marginTop="20px"
              paddingTop="10px"
              paddingBottom="10px"
            >
              SOY RECLUTADOR
            </Button>
          </GridItem>
        </Grid>
      </div>

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
            <Link to={`/ListarEgresados?carrera=ADMINISTRACIÓN`}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                ADMINISTRACIÓN
              </Button>
              </Link>
            </Box>
            <Box my={2} mx={8}>
            <Link to={`/ListarEgresados?carrera=COMUNICACIÓN SOCIAL`}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                COMUNICACIÓN SOCIAL
              </Button>
              </Link>
            </Box>
            <Box my={2} mx={8}>
            <Link to={`/ListarEgresados?carrera=CONTADURÍA`}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                CONTADURÍA
              </Button>
              </Link>
            </Box>
            <Box my={2} mx={8}>
            <Link to={`/ListarEgresados?carrera=DERECHO`}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                DERECHO
              </Button>
              </Link>
            </Box>
            <Box my={2} mx={8}>
            <Link to={`/ListarEgresados?carrera=EDUCACIÓN`}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                EDUCACIÓN
              </Button>
              </Link>
            </Box>
            <Box my={2} mx={8}>
            <Link to={`/ListarEgresados?carrera=INGENIERÍA CIVIL`}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                INGENIERÍA CIVIL
              </Button>
              </Link>
            </Box>
            <Box my={2} mx={8}>
            <Link to={`/ListarEgresados?carrera=INGENIERÍA INDUSTRIAL`}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                INGENIERÍA INDUSTRIAL
              </Button>
              </Link>
            </Box>
            <Box my={2} mx={8}>
            <Link to={`/ListarEgresados?carrera=INGENIERÍA INFORMÁTICA`}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                INGENIERÍA INFORMÁTICA
              </Button>
              </Link>
            </Box>
            <Box my={2} mx={8}>
            <Link to={`/ListarEgresados?carrera=RELACIONES INDUSTRIALES`}>
              <Button
                backgroundColor="#37B4E3"
                color="white"
                _hover={{ bg: "#247390" }}
                size="md"
              >
                RELACIONES INDUSTRIALES
              </Button>
              </Link>
            </Box>
          </Flex>
        </Stack>   
      </div>
      <Footer />
    </div>
  );
}
export default LandingPage;