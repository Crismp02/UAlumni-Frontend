import{ useState, useEffect } from "react";
import {
  Text,
  Button,
  List,
  ListItem,
  Select,
  Box,
  Tooltip,
  useMediaQuery,
  Tag,
  TagCloseButton,
  useToast
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../config";

function FiltrarSkills({
  categoria,
  setCategoria,
  setHabilidades,
  habilidad,
  habilidades,
  list,
  handleAddCategoria,
  handleHabilidadChange,
  handleRemoveHabilidad,
  categorias,
  isDisabled,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
  const [, setCargandoHabilidades] = useState(false);
  const toast = useToast();

useEffect(() => {
  if (categoria) {
    setCargandoHabilidades(true);

    fetch(`${BASE_URL}/skillCategory/${categoria}/technical-skill`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener las habilidades");
      })
      .then((data) => {
        if (Array.isArray(data.data.items)) {
          const habilidadesNombres = data.data.items.map((item) => item.name);
          setHabilidades((prevHabilidades) => ({
            ...prevHabilidades,
            [categoria]: habilidadesNombres, // Actualizar las habilidades específicas de la categoría seleccionada
          }));
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(error)
      })
      .finally(() => {
        setCargandoHabilidades(false);
      });
  }
}, [categoria]); // Solo observar cambios en 'categoria'



  return (
    <div>
      <Text marginBottom="10px">Habilidades:</Text>
      <Box 
        display="flex" 
        flexDirection="row" 
        alignItems="center"
        >
        {isLargerThan435 ? (
          <>
            <Select
              placeholder="Categorías de las habilidades"
              cursor="pointer"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <Tooltip 
            label="Selecciona al menos una habilidad" 
            isOpen={isDisabled && isHovering}
            >
              <Button
                onClick={handleAddCategoria}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                backgroundColor="#007935"
                color="white"
                as="b"
                _hover={{ bg: "#025024" }}
                mt={2}
                marginLeft="10px"
                marginBottom="8px"
                cursor="pointer"
              >
                +
              </Button>
            </Tooltip>
          </>
        ) : (
          <>
            <Select
              placeholder="Categorías de las habilidades"
              value={categoria}
              size="sm"
              fontSize="9px"
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <Button
              size="sm"
              onClick={handleAddCategoria}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              bg="#007935"
              color="white"
              as="b"
              mt={2}
              marginLeft="10px"
              marginBottom="8px"
              cursor="pointer"
              _hover={{ bg: "#025024" }}
            >
              +
            </Button>
          </>
        )}
      </Box>
      {isLargerThan435 ? (
        <>
          {categoria && habilidades[categoria] && (
            <Select
              placeholder="Habilidad"
              value={habilidad}
              onChange={handleHabilidadChange}
              marginTop="10px"
            >
              {habilidades[categoria].map((hab) => (
                <option key={hab} value={hab}>
                  {hab}
                </option>
              ))}
            </Select>
          )}{" "}
          <List
            mt={2}
            border="1px"
            borderColor="#E2E8F0"
            minH="70px"
            marginBottom="30px"
            padding="10px"
          >
            {list.map((item, index) => (
              <ListItem key={index}>
                <Tag
                        bg="#37B4E3"
                        fontSize="12px"
                        paddingLeft="2"
                        paddingTop="1px"
                        paddingBottom="1px"
                        paddingRight="8px"
                        borderRadius="4px"
                        color="white"
                        marginBottom="5px"
                      >
                        {item.categoria}
                {item.habilidad && `: ${item.habilidad}`}
                        <TagCloseButton
                          onClick={() => handleRemoveHabilidad(index)}
                        />
                      </Tag>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          {categoria && habilidades[categoria] && habilidades[categoria].length > 0 && (
            <Select
              placeholder="Habilidad"
              value={habilidad}
              size="sm"
              fontSize="11px"
              onChange={handleHabilidadChange}
              marginTop="10px"
            >
              {habilidades[categoria].map((hab) => (
                <option key={hab} value={hab}>
                  {hab}
                </option>
              ))}
            </Select>
          )}{" "}
          <List
            mt={2}
            border="1px"
            borderColor="#E2E8F0"
            minH="70px"
            marginBottom="30px"
            padding="10px"
          >
            {list.map((item, index) => (
              <ListItem key={index} fontSize="12px">
                <Tag
                        bg="#37B4E3"
                        fontSize="12px"
                        paddingLeft="2"
                        paddingTop="1px"
                        paddingBottom="1px"
                        paddingRight="8px"
                        borderRadius="4px"
                        color="white"
                        marginBottom="5px"
                      >
                        {item.categoria}
                {item.habilidad && `: ${item.habilidad}`}
                        <TagCloseButton
                          onClick={() => handleRemoveHabilidad(index)}
                        />
                      </Tag>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
}
export default FiltrarSkills;

FiltrarSkills.propTypes = {
  categoria: PropTypes.string.isRequired,
  setCategoria: PropTypes.func.isRequired,
  setCategorias: PropTypes.func.isRequired,
  setHabilidades: PropTypes.func.isRequired,
  habilidad: PropTypes.string.isRequired,
  habilidades: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  handleAddCategoria: PropTypes.func.isRequired,
  handleHabilidadChange: PropTypes.func.isRequired,
  handleRemoveHabilidad: PropTypes.func.isRequired,
  categorias: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
