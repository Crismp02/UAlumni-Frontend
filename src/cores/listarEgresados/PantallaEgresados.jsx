import { Box, Button, useMediaQuery, Text, Flex } from "@chakra-ui/react";
import FiltrosEgresados from "./FiltrosEgresados";
import FiltrosEgresadosMenu from "./FiltrosEgresadosMenu";
import ListarEgresados from "./ListarEgresados";
import { useEgresados } from "./EgresadosContext";
import { useState, useEffect } from "react";

const PantallaEgresados = () => {
  const {
    currentPage,
    totalPages,
    isLoading,
    setIsLoading,
    setCurrentPage,
    currentFilters,
    setCurrentFilters,
    fetchPaginatedData,
  } = useEgresados();

  const [hasSearched, setHasSearched] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  const handlePreviousPage = async () => {
    if (currentPage > 1 && !isLoading) {
      setCurrentPage((prevPage) => prevPage - 1);
      try {
        setIsLoading(true);
        // Obtén los filtros actuales que ya incluyen la semilla
        const newFilters = { ...currentFilters };
        const prevPage = currentPage - 1;

        // Realiza la solicitud para la página anterior
        await fetchPaginatedData(newFilters, prevPage);

        setHasSearched(true);
      } catch (error) {
        console.error("Error al obtener la página anterior:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages && !isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
      try {
        setIsLoading(true);
        // Hacer una copia de los filtros antes de actualizar el estado
        const newFilters = { ...currentFilters };
        const nextPage = currentPage + 1;
        console.log("newFilters desde PantallaEgresados:", newFilters);

        // Realizar la solicitud para la página siguiente
        await fetchPaginatedData(newFilters, nextPage);

        setHasSearched(true);
      } catch (error) {
        console.error("Error al obtener la siguiente página:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateFilters = (newFilters) => {
    setCurrentFilters(newFilters);
    setFiltersChanged(true);
  };

  useEffect(() => {
    if (hasSearched && filtersChanged) {
      fetchPaginatedData(currentFilters, currentPage);
      setHasSearched(false);
      setFiltersChanged(false);
    }
  }, [
    hasSearched,
    filtersChanged,
    fetchPaginatedData,
    currentFilters,
    currentPage,
  ]);

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
            <FiltrosEgresados
              setHasSearched={setHasSearched}
              setCurrentFilters={updateFilters} // Actualizar los filtros en el cambio
            />
          </Box>
        )}

        <Box flex="2">
          <ListarEgresados hasSearched={hasSearched} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {hasSearched && (
              <Button
                as="b"
                colorScheme="teal"
                disabled={isLoading || currentPage === 1}
                onClick={handlePreviousPage}
                size="lg"
                variant="ghost"
                fontSize="3xl"
                color="darkgreen"
              >
                «
              </Button>
            )}

            {hasSearched &&
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    as="b"
                    colorScheme="teal"
                    disabled={isLoading}
                    onClick={() => {
                      if (pageNumber < currentPage) {
                        handlePreviousPage();
                      } else if (pageNumber > currentPage) {
                        handleNextPage();
                      }
                    }}
                    size="lg"
                    variant="ghost"
                    fontSize="2xl"
                    color="darkgreen"
                    fontWeight="bold"
                    marginRight="1px"
                    marginLeft="1px"
                    textDecoration={
                      pageNumber === currentPage ? "underline" : "none"
                    }
                  >
                    {pageNumber}
                  </Button>
                )
              )}

            {hasSearched && currentPage < totalPages && totalPages > 1 && (
              <Button
                as="b"
                colorScheme="teal"
                disabled={isLoading || currentPage === totalPages}
                onClick={handleNextPage}
                size="lg"
                variant="ghost"
                fontSize="3xl"
                color="darkgreen"
              >
                »
              </Button>
            )}
          </div>
        </Box>

        {isSmallerThan800 && (
          <Box flex="1">
            <FiltrosEgresadosMenu
              setHasSearched={setHasSearched}
              setCurrentFilters={updateFilters}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default PantallaEgresados;
