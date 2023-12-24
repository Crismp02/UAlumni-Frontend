import { Box, Center, Text, useMediaQuery } from "@chakra-ui/react";
import { useEgresados } from './EgresadosContext';
import EgresadoCard2 from "./EgresadosCard2";

function ListarEgresados() {
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
          {egresados.map((egresado, index) => (
            egresado && <EgresadoCard2 key={index} egresado={egresado} />
          ))}
          {isLargerThan770 && <EgresadoCard2 />} {/* Esto parece ser un placeholder, puedes ajustarlo */}
        </Box>
      </Center>
    </div>
  );
}

export default ListarEgresados;
