import FiltrosEgresadosMenu from './FiltrosEgresadosMenu';
import ListarEgresados from './ListarEgresados';
import FiltrosEgresados from './FiltrosEgresados';
import { Box, useMediaQuery, Text, Flex } from "@chakra-ui/react";

const PantallaEgresados = () => {
  const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");

  return (
    <Box>
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
        ENCUENTRA A TU EGRESADO
      </Text>
      <Flex flexDirection={isSmallerThan800 ? "column" : "row"}>
        {!isSmallerThan800 && (
          <Box flex="1">
            <FiltrosEgresados />
          </Box>
        )}
        {isSmallerThan800 ? (
          <Box flex="1">
            <FiltrosEgresadosMenu />
            <ListarEgresados />
          </Box>
        ) : (
          <Box flex="2">
            <ListarEgresados />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default PantallaEgresados;
