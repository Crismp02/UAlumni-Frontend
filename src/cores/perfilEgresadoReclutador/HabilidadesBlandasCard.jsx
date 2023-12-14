import React, { useState } from "react";
import {
  Text,
  Box,
} from "@chakra-ui/react";

const HabilidadesBlandasCard = ({ cardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);

  return (
    <>
      
      <Text
  fontSize="lg"
  marginLeft="10"
  marginRight="10"
  marginTop="5"
>
  Blandas
</Text>
<Box
  display="flex"
  flexDirection="row"
  flexWrap="wrap"
  marginLeft="10"
  marginRight="10"
  marginBottom="5"
>
  {Array.isArray(newCardData) && newCardData.length > 0
        ? newCardData.map((item, index) => (
    <Box
      key={index}
      position="relative"
      padding="2"
      marginRight="2"
    >
      <Box padding="2" marginBottom="2" marginRight="2">
        <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
          {item.skillName}
        </Text>
      </Box>
    </Box>
  )): null}
</Box>
    </>
  );
};

export default HabilidadesBlandasCard;