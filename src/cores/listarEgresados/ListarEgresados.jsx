import { useState, useEffect } from "react";
// import axios from "axios";
// import EgresadoCard from "./EgresadoCard";
import EgresadoCard2 from "./EgresadosCard2";
import FiltrosEgresados from "./FiltrosEgresados";
import { Text, Center, Box,useMediaQuery } from "@chakra-ui/react";
import { useEgresados } from './EgresadosContext';
import { EgresadosProvider } from './EgresadosContext';

function ListarEgresados() {
  const { egresados, setEgresados } = useEgresados();
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga

  // const [technicalSkills, setTechnicalSkills] = useState([]);
  const [isLargerThan770] = useMediaQuery("(min-width: 770px)");

  

  return (
    <div>
      
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
      <Center>
        <Box
          w={["90%", "80%", "70%", "80%"]}
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
          {isLargerThan770 && <EgresadoCard2 />}
        </Box>
      </Center>
    </div>
  );
}

export default ListarEgresados;
