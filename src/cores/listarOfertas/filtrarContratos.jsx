import { Box, Button, Select, Tooltip,Text,List,ListItem,  useMediaQuery, Tag, TagCloseButton } from "@chakra-ui/react";
import {useState} from "react";
import PropTypes from "prop-types";

function FiltrarContratos({
    contrato,
    setContrato,
    contratos,
    contratosSeleccionados,
    handleAddCon,
    handleRemoveCon,
    isDisabled,
}){

    const [isHovering, setIsHovering] = useState(false);
    const [isLargerThan435] =useMediaQuery("(min-width: 435px)")

    return (
      <div>
        <Text marginBottom="10px">Contratos:</Text>
        <Box display="flex" flexDirection="row" alignItems="center">
          {isLargerThan435 ? (
            <>
              <Select
                placeholder="Tipos de contratos"
                cursor="pointer"
                value={contrato}
                onChange={(e) => setContrato(e.target.value)}
              >
                {contratos.map((con, index) => (
                  <option key={index} value={con}>
                    {con}
                  </option>
                ))}
              </Select>
              <Tooltip
                label="Selecciona al menos un contrato"
                isOpen={isDisabled && isHovering}
              >
                <Button
                  onClick={handleAddCon}
                  isDisabled={isDisabled}
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
                placeholder="Tipos de contratos"
                value={contrato}
                size="sm"
                fontSize="9px"
                onChange={(e) => setContrato(e.target.value)}
                cursor="pointer"
              >
                {contratos.map((con, index) => (
                  <option key={index} value={con}>
                    {con}
                  </option>
                ))}
              </Select>
              <Button
                size="sm"
                onClick={handleAddCon}
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
        <List
          mt={2}
          marginBottom="30px"
          border="1px"
          borderColor="#E2E8F0"
          minH="70px"
          padding="10px"
        >
          {isLargerThan435 ? (
            <>
              {contratosSeleccionados.map((item, index) => (
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
                    {item.contrato}
                    <TagCloseButton
                          onClick={() => handleRemoveCon(index)}
                        />
                  </Tag>
                </ListItem>
              ))}
            </>
          ) : (
            <>
              {contratosSeleccionados.map((item, index) => (
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
                    {item.contrato}
                    <TagCloseButton
                          onClick={() => handleRemoveCon(index)}
                        />
                  </Tag>
                </ListItem>
              ))}
            </>
          )}
        </List>
      </div>
    );
}

export default FiltrarContratos;

//Definición de las props:
FiltrarContratos.propTypes = {
    contrato: PropTypes.string.isRequired,
    setContrato: PropTypes.func.isRequired,
    contratos: PropTypes.array.isRequired,
    contratosSeleccionados: PropTypes.array.isRequired,
    handleAddCon: PropTypes.func.isRequired,
    handleRemoveCon: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};