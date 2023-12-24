import FiltrosEgresadosMenu from "./FiltrosEgresadosMenu";
import ListarEgresados from "./ListarEgresados";
import FiltrosEgresados from "./FiltrosEgresados";
import { Box, useMediaQuery, Text, Flex } from "@chakra-ui/react";
import { useEgresados } from "./EgresadosContext";
import { useEffect } from "react";

const PantallaEgresados = () => {
  const {
    egresados,
    currentPage,
    totalPages,
    fetchPaginatedData,
    setCurrentPage,
    isLoading,
  } = useEgresados();

  const handlePreviousPage = () => {
    if (currentPage > 1 && !isLoading) {
      setCurrentPage(currentPage - 1);
      fetchPaginatedData(currentPage - 1); // Llama a la función de paginación
    }
  };

  const handleNextPage = () => {
    console.log("yo le dije eres un crack");
    if (currentPage < totalPages && !isLoading) {
      setCurrentPage(currentPage + 1);
      fetchPaginatedData(currentPage + 1); // Llama a la función de paginación
    }
  };

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
            {/* Controles de paginación */}
            <div>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isLoading}
              >
                Anterior
              </button>
              <span>{`Página ${currentPage} de ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isLoading}
              >
                Siguiente
              </button>
            </div>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default PantallaEgresados;
