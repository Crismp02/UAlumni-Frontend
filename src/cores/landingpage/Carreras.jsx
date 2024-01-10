import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

function Carreras() {
  const [carreras, setCarreras] = useState([]);

  // Función para manejar el almacenamiento en localStorage
  const handleCarreraSeleccionada = (carreraSeleccionada) => {
    // Almacenamiento para filtersURLEgresados
    const filtersURLEgresados = {
      careers: [carreraSeleccionada],
    };
    localStorage.setItem(
      "filtersURLEgresados",
      JSON.stringify(filtersURLEgresados)
    );

    // Almacenamiento para pageEgresados
    localStorage.setItem("pageEgresados", "1");

    // Almacenamiento para storedFiltersEgresados
    const storedFiltersEgresados = {
      careerParams: [carreraSeleccionada],
    };
    localStorage.setItem(
      "storedFiltersEgresados",
      JSON.stringify(storedFiltersEgresados)
    );

  };

  // Hacer el useEffect de las carreras
  useEffect(() => {
    async function fetchCarreras() {
      try {
        const response = await fetch(`${BASE_URL}/career`);
        if (!response.ok) {
          throw new Error("Error al obtener las carreras");
        }
        const data = await response.json();
        if (Array.isArray(data.data.items)) {
          const carrerasObtenidas = data.data.items.map((item) => item.name);
          setCarreras(carrerasObtenidas);
          console.log(carrerasObtenidas);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchCarreras();
  }, []);
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
        marginTop: "120px",
        paddingBottom: "40px",
      }}
    >
      {isLargerThan700 ? (
        <Text fontSize="4xl" textAlign="center" as="b" paddingTop="40px">
          ¿DE QUÉ CARRERA ES EL PROFESIONAL QUE BUSCAS?
        </Text>
      ) : (
        <Text fontSize="2xl" textAlign="center" as="b" paddingTop="20px">
          ¿DE QUÉ CARRERA ES EL PROFESIONAL QUE BUSCAS?
        </Text>
      )}

      <Stack p={{ base: 2, md: "20 20 5 20" }}>
        <Flex direction="row" justifyContent="center" wrap="wrap">
          {carreras.map((carrera, index) => (
            <Box key={index} my={2} mx={8}>
              <Link to="/listarEgresados">
                <Button
                  backgroundColor="#37B4E3"
                  color="white"
                  _hover={{ bg: "#247390" }}
                  size="md"
                  onClick={() => {
                    const carreraSeleccionada = carrera;
                    handleCarreraSeleccionada(carreraSeleccionada);
                  }}
                >
                  {carrera}
                </Button>
              </Link>
            </Box>
          ))}
        </Flex>
      </Stack>
    </div>
  );
}
export default Carreras;
