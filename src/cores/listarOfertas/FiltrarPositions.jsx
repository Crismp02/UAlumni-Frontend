import React, {useState} from "react";
import {
  Input,
  Text,
  useMediaQuery,
  Box,
  Button,
  List,
  ListItem,
  Tooltip
} from "@chakra-ui/react";

function FiltrarPositions({
  valuePos,
  handleChangePos,
  handleAddPos,
  listPos,
  handleRemovePos,
}) {
  const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div>
      <Text marginBottom="10px">Posiciones de interés:</Text>
      <Box display="flex" flexDirection="row" alignItems="center">
        {isLargerThan435 ? (
          <>
            <Input
              value={valuePos}
              onChange={handleChangePos}
              placeholder="Buscar egresado por posición de interés"
              size="md"
            />
             <Tooltip label="Agregar posición de interés a los filtros" isOpen={isHovering}>
            <Button
              onClick={handleAddPos}
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
            {" "}
            <Input
              value={valuePos}
              onChange={handleChangePos}
              placeholder="Buscar por posición de interés"
              fontSize="10px"
              size="sm"
            />
            <Button
              onClick={handleAddPos}
              mt={2}
              marginLeft="10px"
              marginBottom="8px"
              backgroundColor="#007935"
              color="white"
              as="b"
              size="sm"
              _hover={{ bg: "#025024" }}
            >
              +
            </Button>
          </>
        )}
      </Box>
      <List
        mt={2}
        border="1px"
        borderColor="#E2E8F0"
        minH="70px"
        marginBottom="30px"
        padding="10px"
      >
        {isLargerThan435 ? (
          <>
            {listPos.map((item, index) => (
              <ListItem key={index}>
                {item}
                <Button
                  onClick={() => handleRemovePos(index)}
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
          </>
        ) : (
          <>
            {listPos.map((item, index) => (
              <ListItem key={index} fontSize="12px">
                {item}
                <Button
                  onClick={() => handleRemovePos(index)}
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
          </>
        )}
      </List>
    </div>
  );
}
export default FiltrarPositions;