import { Box, Button, useMediaQuery, Text, Flex, useToast } from "@chakra-ui/react";
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
    semilla,
    hasSearched,
    setHasSearched
  } = useEgresados();

  const [filtersChanged, setFiltersChanged] = useState(false);
const toast = useToast();
  const handlePreviousPage = async () => {

    if (currentPage > 1 && !isLoading) {

      setCurrentPage((prevPage) => prevPage - 1);

      try {
        setIsLoading(true);

        // Obtén los filtros actuales que ya incluyen la semilla
        const newFilters = { ...currentFilters };
        const prevPage = currentPage - 1;

        // Realiza la solicitud para la página anterior
        await fetchPaginatedData(newFilters, prevPage, semilla);

        setHasSearched(true);

      } catch (error) {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
        // Realizar la solicitud para la página siguiente
        await fetchPaginatedData(newFilters, nextPage, semilla);

        setHasSearched(true);
      } catch (error) {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
    <Box width="100vw">
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

      <Box display="flex" flexDirection={isSmallerThan800 ? "column" : "row"} width="100%">
        {!isSmallerThan800 && (
          <Box width="33.3%">
            <FiltrosEgresados
              setHasSearched={setHasSearched}
              setCurrentFilters={updateFilters} // Actualizar los filtros en el cambio
            />
          </Box>
        )}

        <Box width={["100%", "100%", "100%", "66.6%", "66.6%"]}>
          <ListarEgresados hasSearched={hasSearched} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {hasSearched && currentPage > 1 &&(
              <Button
                as="b"
                colorScheme="teal"
                disabled={isLoading }
                onClick={handlePreviousPage}
                size="lg"
                variant="ghost"
                fontSize="3xl"
                color="darkgreen"
                cursor="pointer"
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
                    cursor="pointer"
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
                cursor="pointer"
              >
                »
              </Button>
            )}
          </div>
        </Box>

          <Box display={isSmallerThan800 ? "" : "none"} >
            <FiltrosEgresadosMenu
              setHasSearched={setHasSearched}
              setCurrentFilters={updateFilters}
            />
          </Box>
      </Box>
    </Box>
  );
};

export default PantallaEgresados;



