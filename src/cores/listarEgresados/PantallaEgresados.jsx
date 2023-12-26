
import { Box, Button, useMediaQuery, Text, Flex } from "@chakra-ui/react";
import FiltrosEgresados from "./FiltrosEgresados";
import FiltrosEgresadosMenu from "./FiltrosEgresadosMenu";
import ListarEgresados from "./ListarEgresados";
import { useEgresados } from "./EgresadosContext";
import { useState } from "react";

const PantallaEgresados = () => {

    // Usamos el hook useEgresados para obtener el estado y las funciones relacionadas con los egresados
    const { currentPage, totalPages, isLoading, setCurrentPage } = useEgresados();

    // Agregamos un estado para saber si se ha realizado una búsqueda
    const [hasSearched, setHasSearched] = useState(false);

    // Función para manejar el cambio a la página anterior
    const handlePreviousPage = () => {
      if (currentPage > 1 && !isLoading) {
        setCurrentPage(currentPage - 1);
        setHasSearched(true);
      }
    };

    // Función para manejar el cambio a la página siguiente
    const handleNextPage = () => {
      if (currentPage < totalPages && !isLoading) {
        setCurrentPage(currentPage + 1);
        setHasSearched(true);
      }
    };

    // Usamos el hook useMediaQuery para determinar si el ancho de la pantalla es menor a 800px
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

      {/* Dependiendo del tamaño de la pantalla, renderizamos diferentes componentes */}
        <Flex flexDirection={isSmallerThan800 ? "column" : "row"}>

          {!isSmallerThan800 && (

            <Box flex="1">
              <FiltrosEgresados setHasSearched={setHasSearched}/>
            </Box>
          )}

          {isSmallerThan800 ? (

            <Box flex="1">
              <FiltrosEgresadosMenu />
              {/* Si no se ha realizado una búsqueda, mostramos el mensaje. De lo contrario, mostramos los resultados */}
              <ListarEgresados hasSearched={hasSearched}/>
            </Box>

          ) : (

            <Box flex="2">
              <ListarEgresados hasSearched={hasSearched}/>

              {/* Controles de paginación */}
              <div
                style={{
                display: 'flex', // Hace que los hijos del div se comporten como elementos flexibles
                justifyContent: 'center', // Centra los elementos flexibles horizontalmente
                alignItems: 'center' // Centra los elementos flexibles verticalmente
               }}
              >

                  {currentPage > 1 && (
                    <Button
                      as="b"
                      colorScheme='teal'
                      disabled={isLoading}
                      onClick={handlePreviousPage}
                      size='lg'
                      variant='ghost'
                      fontSize='3xl' 
                      color='darkgreen'
                    >
                      «   
                    </Button>
                  )}

                  {/* Generamos un array de números desde 1 hasta totalPages y lo mapeamos */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <Button
                      key={pageNumber}
                      as="b"
                      colorScheme='teal'
                      disabled={isLoading}
                      onClick={() => setCurrentPage(pageNumber)}
                      size='lg'
                      variant='ghost'
                      fontSize='2xl' 
                      color='darkgreen'
                      fontWeight="bold"
                      marginRight='1px' 
                      marginLeft='1px' 
                      textDecoration={pageNumber === currentPage ? 'underline' : 'none'} 
                    >
                      {pageNumber}   
                    </Button>
                  ))}

                  <Button
                    as="b"
                    colorScheme='teal'
                    disabled={currentPage === totalPages || isLoading}
                    onClick={handleNextPage}
                    size='lg'
                    variant='ghost'
                    fontSize='3xl' 
                    color='darkgreen'
                  >
                    »   
                  </Button>

              </div>

            </Box>
          )}
        </Flex>
      </Box>
    );
};

export default PantallaEgresados;
