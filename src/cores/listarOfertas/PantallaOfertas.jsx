import { Box, Button, useMediaQuery, Text, Flex } from "@chakra-ui/react";
import FiltrosOfertas from "./FiltrosOfertas";
import FiltrosOfertasMenu from "./FiltrosOfertasMenu";
import ListarOfertas from "./ListarOfertas";
import { useOfertas } from "./OfertasContext";
import { useState, useEffect } from "react";

const PantallaOfertas = () => {
    const {
        currentPage,
        totalPages,
        isLoading,
        setIsLoading,
        setCurrentPage,
        currentFilters,
        setCurrentFilters,
        fetchPaginatedData,
    } = useOfertas();
    
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
    },[hasSearched, filtersChanged, fetchPaginatedData, currentFilters, currentPage]);

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
                ENCUENTRA OFERTAS DE TRABAJO
              </Text>
        
              <Flex flexDirection={isSmallerThan800 ? "column" : "row"}>
                {!isSmallerThan800 && (
                  <Box flex="1">
                    <FiltrosOfertas
                      setHasSearched={setHasSearched}
                      setCurrentFilters={updateFilters} // Actualizar los filtros en el cambio
                    />
                  </Box>
                )}
        
                <Box flex="2">
                  <
                    Ofertas hasSearched={hasSearched} />
        
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {hasSearched && currentPage > 1 && (
                      <Button
                        as="b"
                        colorScheme="teal"
                        disabled={isLoading}
                        onClick={handlePreviousPage}
                        size="lg"
                        variant="ghost"
                        fontSize="3xl"
                        color="darkgreen"
                      >
                        «
                      </Button>
                    )}
        
                    {hasSearched && Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <Button
                          key={pageNumber}
                          as="b"
                          colorScheme="teal"
                          disabled={isLoading}
                          onClick={() => setCurrentPage(pageNumber)}
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
        
                    {hasSearched && (
                      <Button
                        as="b"
                        colorScheme="teal"
                        disabled={currentPage === totalPages || isLoading}
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
                    <FiltrosOfertasMenu setHasSearched={setHasSearched}
                      setCurrentFilters={updateFilters}  />
                  </Box>
                )}
              </Flex>
            </Box>
          );
        };
        
        export default PantallaOfertas;    