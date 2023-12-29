
import { Text, Tag, TagLabel, Stack, Flex, useMediaQuery } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function FiltrarCarreras({ labels, selectedCarrera, selectedTags, handleClick}){
    const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
    return(
        <div>
            <Text marginBottom="10px">Carreras:</Text>
            {isLargerThan435 ? (
              <Stack p={{ base: 4, md: "20 20 10 20" }}>
                <Flex cursor="pointer" direction="row" justifyContent="center" wrap="wrap">
                  {labels.map((label) => (
                    <Tag
                      key={label}
                      size="md"
                      colorScheme="blue"
                      variant={
                        selectedCarrera === label || selectedTags[label]
                          ? "solid"
                          : "outline"
                      }
                      onClick={() => handleClick(label)}
                      marginRight="10px"
                      marginBottom="10px"
                    >
                      <TagLabel>{label}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
              </Stack>
            ) : (
              <Stack p={{ base: 4, md: "20 20 10 20" }}>
                <Flex direction="row" justifyContent="center" wrap="wrap">
                  {labels.map((label) => (
                    <Tag
                      key={label}
                      size="sm"
                      fontSize="11px"
                      colorScheme="blue"
                      variant={
                        selectedCarrera === label || selectedTags[label]
                          ? "solid"
                          : "outline"
                      }
                      onClick={() => handleClick(label)}
                      marginRight="10px"
                      marginBottom="10px"
                    >
                      <TagLabel>{label}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
              </Stack>
            )}
        </div>
    )
}
export default FiltrarCarreras;

// Definir la validación de props
FiltrarCarreras.propTypes = {
  labels: PropTypes.array.isRequired,
  selectedCarrera: PropTypes.string,
  selectedTags: PropTypes.object, 
  handleClick: PropTypes.func.isRequired,
};