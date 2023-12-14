import React, { useState } from "react";
import { Text, Box, Flex } from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes

const PortafoliosCard = ({ cardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);

  return (
    <>
      <Text
        fontWeight="bold"
        fontSize="xl"
        marginLeft="10"
        marginTop="10"
        marginBottom="0"
        display="flex"
        alignItems="center"
      >
        Portafolios
      </Text>

      {Array.isArray(newCardData) && newCardData.length > 0
        ? newCardData.map((item, index) => (
            <Box
              key={index}
              bg="white"
              padding="4"
              border="1px solid #ccc"
              borderRadius="8px"
              marginLeft="10"
              marginRight="10"
              marginTop="5"
              marginBottom="5"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            >
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">{item.title}</Text>
              </Flex>
              <Text>{item.sourceLink}</Text>
            </Box>
          ))
        : null}
    </>
  );
};

export default PortafoliosCard;
