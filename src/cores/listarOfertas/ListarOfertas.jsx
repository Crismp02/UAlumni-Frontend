import { Box, Center, Icon, Text, useMediaQuery } from "@chakra-ui/react";
import OfertaCard from "./OfertaCard";
import FiltrosOfertas from "./FiltrosOfertas";
import { MdScreenSearchDesktop } from "react-icons/md";
import { PiSmileySadLight } from "react-icons/pi";
import PropTypes from "prop-types";
import { useOfertas } from "./OfertasContext";

function ListarOfertas({ hasSearched }) {
  const { ofertas, isLoading } = useOfertas();

  const [isSmallerThan800] = useMediaQuery("(min-width: 800px)");
  return (
    <div>
      <Center>
        <Box
          w={
            isSmallerThan800
              ? "95%"
              : ["80%", "80%", "80%", "80%", "80%", "80%"]
          }
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
              <Text fontSize="2xl" color="gray.500">
                ¡Debes escoger al menos un filtro de búsqueda!
              </Text>
            </>
          ) : (
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
                No hay ninguna oferta que coincida con tu descripción
              </Text>
              <Icon
                as={PiSmileySadLight}
                boxSize={32}
                color="gray.400"
                paddingTop="30px"
              />
            </>
          )}
        </Box>
      </Center>
    </div>
  );
}
ListarOfertas.propTypes = {
  hasSearched: PropTypes.bool.isRequired,
};
export default ListarOfertas;
