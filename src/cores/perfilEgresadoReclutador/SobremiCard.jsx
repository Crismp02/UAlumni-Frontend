import React, { useState } from "react";
import { Text, Box, Flex } from "@chakra-ui/react";

const SobremiCard = ({ cardData }) => {
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
        Sobre mí
      </Text>

      <Box
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
        <Flex>
          <Text>{cardData}</Text>
        </Flex>
      </Box>
    </>
  );
};

export default SobremiCard;
