import React, { useState } from "react";
import {
  Text,
  Box,
  Flex,
} from "@chakra-ui/react"; 

const IdiomasCard = ({ cardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);

  return (
    <>
      <Text
        fontWeight="bold"
        fontSize="xl"
        marginLeft="10"
        marginTop="5"
        marginBottom="0"
        display="flex"
        alignItems="center"
      >
        Idiomas
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
            <Text fontWeight="bold">{item.languageName}</Text>
            <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
              {item.masteryLevel}
            </Text>
          </Flex>
        </Box>
      )) : null }
    </>
  );
};

export default IdiomasCard;