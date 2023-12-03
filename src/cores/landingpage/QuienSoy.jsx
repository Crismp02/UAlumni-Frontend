import React from "react";
import {
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  useMediaQuery,
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
      <Grid
        justifyContent="center"
        paddingTop="40px"
        gridAutoFlow={["row", "row", "column", "column"]}
        gap={[10, 10, 6, 6]}
      >
        <GridItem boxSize={["", "", "sm", "sm"]}>
          <Image src={EgresadosLanding} alt="egresadosLanding" />
          <Link to="/register">
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
          </Link>
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
  );
}
export default QuienSoy;
