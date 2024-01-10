import {useState} from "react";
import {
  Input,
  Text,
  useMediaQuery,
  Box,
  Button,
  List,
  ListItem,
  Tooltip,
  Tag,
  TagCloseButton
} from "@chakra-ui/react";
import PropTypes from 'prop-types';

function FiltrarIndustrias({
    valueInd,
    handleChangeInd,
    handleAddInd,
    listInd,
    handleRemoveInd,
    isDisabled,
    }) {
    const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
    const [isHovering, setIsHovering] = useState(false);
    return (
        <div>
        <Text marginBottom="10px">Industrias de interés:</Text>
        <Box display="flex" flexDirection="row" alignItems="center">
            {isLargerThan435 ? (
            <>
                <Input
                value={valueInd}
                onChange={handleChangeInd}
                placeholder="Buscar egresado por industria de interés"
                size="md"
                />
                 <Tooltip 
                 //label="Agregar industria de interés a los filtros" 
                 label="Primero escribe una industria" 
                 isOpen={isDisabled && isHovering}
                 >
                  <Button
                  onClick={handleAddInd}
                  isDisabled={isDisabled}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  mt={2}
                  marginLeft="10px"
                  marginBottom="8px"
                  backgroundColor="#007935"
                  color="white"
                  as="b"
                  _hover={{ bg: "#025024" }}
                  cursor="pointer"
                  >
                  +
                  </Button>
                </Tooltip>
            </>
            ) : (
            <>
                {" "}
                <Input
                value={valueInd}
                onChange={handleChangeInd}
                placeholder="Buscar por industria de interés"
                fontSize="10px"
                size="sm"
                />
                <Button
                onClick={handleAddInd}
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
            {listInd.map((item, index) => (
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
                        {item}
                        <TagCloseButton
                          onClick={() => handleRemoveInd(index)}
                        />
                      </Tag>
              </ListItem>
            ))}
          </>
        ) : (
          <>
            {listInd.map((item, index) => (
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
                        {item}
                        <TagCloseButton
                          onClick={() => handleRemoveInd(index)}
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

FiltrarIndustrias.propTypes = {
    valueInd: PropTypes.string.isRequired,
    handleChangeInd: PropTypes.func.isRequired,
    handleAddInd: PropTypes.func.isRequired,
    listInd: PropTypes.array.isRequired,
    handleRemoveInd: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
}
export default FiltrarIndustrias;