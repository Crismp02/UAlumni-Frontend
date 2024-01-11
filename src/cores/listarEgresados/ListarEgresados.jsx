import {
  Box,
  Center,
  Icon,
  Text,
  useMediaQuery,
  Spinner,
} from "@chakra-ui/react";
import EgresadoCard from "./EgresadosCard";
import { MdScreenSearchDesktop } from "react-icons/md";
import { PiSmileySadLight } from "react-icons/pi";
import PropTypes from "prop-types";
import { useEgresados } from "./EgresadosContext";
import LoadingSpinner from "../../components/LoadingSpinner";

function ListarEgresados({ hasSearched }) {
  const { egresados, isLoading } = useEgresados();

  const [isSmallerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Center width="100%">
      <Box
        w={
          isSmallerThan800 ? "95%" : ["80%", "80%", "80%", "80%", "80%", "80%"]
        }
        height={["43rem", "42rem", "40rem", "40rem", "40rem"]}
        backgroundColor="#F5F5F5"
        display="flex"
        flexDirection="column"
        justifyContent={egresados && egresados.length === 0 ? "center" : ""}
        alignItems="center"
        paddingTop="35px"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : !hasSearched ? (
          <>
            <Text fontSize="2xl" color="gray.500">
              ¡Debes escoger al menos un filtro de búsqueda!
            </Text>
            <Icon
              as={MdScreenSearchDesktop}
              boxSize={32}
              color="gray.400"
              paddingTop="30px"
            />
          </>
        ) : egresados.length === 0 ? (
          <>
            <Text fontSize="2xl" color="gray.400" paddingBottom="5">
              ¡Lo Sentimos!
            </Text>
            <Text
              fontSize="2xl"
              color="gray.400"
              textAlign="center"
              width="100%"
            >
              No hay ningún egresado que coincida con tu descripción
            </Text>
            <Icon
              as={PiSmileySadLight}
              boxSize={32}
              color="gray.400"
              paddingTop="30px"
            />
          </>
        ) : (
          egresados.map(
            (egresado, index) =>
              egresado && <EgresadoCard key={index} egresado={egresado} />
          )
        )}
      </Box>
    </Center>
  );
}

// Definir la validación de props
ListarEgresados.propTypes = {
  hasSearched: PropTypes.bool.isRequired,
};
export default ListarEgresados;
