import { Box, Center, Text, Icon, useMediaQuery } from "@chakra-ui/react";
import { FaSearch } from 'react-icons/fa';
import { useEgresados } from './EgresadosContext';
import EgresadoCard2 from "./EgresadosCard2";
import PropTypes from 'prop-types';
import { MdScreenSearchDesktop } from "react-icons/md";

function ListarEgresados({ hasSearched }) {
  const { egresados } = useEgresados();

  const [isLargerThan770] = useMediaQuery("(min-width: 770px)");
  const [isSmallerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <div>
      <Center>
        <Box
          w={isSmallerThan800 ? "95%" : ["80%", "80%", "80%", "80%", "80%", "80%"]}
          h={["50rem", "50rem"]}
          backgroundColor="#F5F5F5"
          marginBottom="10px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {!hasSearched ? (
            <>
            <Text
            fontSize="2xl" 
            color="gray.500"
            >¡Debes escoger al menos un filtro de búsqueda!
            </Text>
            <Icon 
            as={MdScreenSearchDesktop} 
            boxSize={32}
            color="gray.400"
            paddingTop="30px" />
            </>
          ) : (
            egresados.map((egresado, index) => (
              egresado && <EgresadoCard2 key={index} egresado={egresado} />
            ))
          )}
          {/* {isLargerThan770 && <EgresadoCard2 />}  */}
          {/* Esto parece ser un placeholder, puedes ajustarlo */}
        </Box>
      </Center>
    </div>
  );
}

// Definir la validación de props
ListarEgresados.propTypes = {
  hasSearched: PropTypes.bool.isRequired,
};
export default ListarEgresados;
