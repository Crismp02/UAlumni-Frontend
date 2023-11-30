import React, { useState } from "react";
import {
  Text,
  Button,
  List,
  ListItem,
  Select,
  Box,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";

function FiltrarSkills({
  categoria,
  setCategoria,
  habilidad,
  habilidades,
  list,
  handleAddCategoria,
  handleHabilidadChange,
  handleRemoveHabilidad,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
  return (
    <div>
      <Text marginBottom="10px">Habilidades:</Text>
      <Box display="flex" flexDirection="row" alignItems="center">
        {isLargerThan435 ? (
          <>
            <Select
              placeholder="Categorías de las habilidades"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="diseño">Diseño</option>
            </Select>
            <Tooltip label="Filtrar por categoría completa" isOpen={isHovering}>
              <Button
                onClick={handleAddCategoria}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                mt={2}
                marginLeft="10px"
                marginBottom="8px"
                backgroundColor="#007935"
                color="white"
                as="b"
                _hover={{ bg: "#025024" }}
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
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="diseño">Diseño</option>
            </Select>
            <Button
              onClick={handleAddCategoria}
              size="sm"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              mt={2}
              marginLeft="10px"
              marginBottom="8px"
              backgroundColor="#007935"
              color="white"
              as="b"
              _hover={{ bg: "#025024" }}
            >
              +
            </Button>
          </>
        )}
      </Box>
      {isLargerThan435 ? (
        <>
          {categoria && (
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
                {item.categoria}
                {item.habilidad && `: ${item.habilidad}`}
                <Button
                  onClick={() => handleRemoveHabilidad(index)}
                  mt={1}
                  marginLeft="20px"
                  marginBottom="8px"
                  backgroundColor="#EDF2F6"
                  color="black"
                  size="xs"
                >
                  x
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          {categoria && (
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
                {item.categoria}
                {item.habilidad && `: ${item.habilidad}`}
                <Button
                  onClick={() => handleRemoveHabilidad(index)}
                  mt={1}
                  marginLeft="20px"
                  marginBottom="8px"
                  backgroundColor="#EDF2F6"
                  color="black"
                  size="xs"
                >
                  x
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
}
export default FiltrarSkills;
