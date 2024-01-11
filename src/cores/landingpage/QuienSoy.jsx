import React from "react";
import {
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  useMediaQuery,
  Flex,
  Box,
} from "@chakra-ui/react";
import EgresadosLanding from "../../images/egresadosLanding.jpg";
import ReclutadoresLanding from "../../images/reclutadoreslanding.jpg";
import { Link } from "react-router-dom";

function QuienSoy() {
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {isLargerThan700 ? (
        <Text fontSize="4xl" textAlign="center" as="b" paddingTop="40px">
          ¿QUIÉN SOY?
        </Text>
      ) : (
        <Text fontSize="2xl" textAlign="center" as="b" paddingTop="30px">
          ¿QUIÉN SOY?
        </Text>
      )}
      <Flex
        justifyContent={["space-around","space-around","center", "center"]}
        flexDirection={["column", "column", "row", "row"]}
        gap={[38, 38, 8, 8]}
        alignItems="center"
        height={["800px", "800px", "lg", "lg"]}
      >
        <Box boxSize={["300px", "300px", "sm", "sm"]}>
          <Image src={EgresadosLanding} alt="egresadosLanding" />
          <Link to="/register">
            <Button
              backgroundColor="#007935"
              color="white"
              _hover={{ bg: "#025024" }}
              width="100%"
              paddingTop="10px"
              paddingBottom="10px"
              marginTop="20px"
            >
              SOY EGRESADO
            </Button>
          </Link>
        </Box>
        <Box boxSize={["300px", "300px", "sm", "sm"]}>
          <Image src={ReclutadoresLanding} alt="reclutadoresLanding" />
          <Link to="/listarEgresados">
          <Button
            backgroundColor="#007935"
            color="white"
            _hover={{ bg: "#025024" }}
            width="100%"
            marginTop="22px"
            paddingTop="10px"
            paddingBottom="10px"
          >
            SOY RECLUTADOR
          </Button>
          </Link>
        </Box>
      </Flex>
    </div>
  );
}
export default QuienSoy;
