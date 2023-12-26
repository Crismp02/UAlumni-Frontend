import React, { useState } from "react";
import {
  Text,
  Box,
  Flex,
  Card, CardBody, Divider 
} from "@chakra-ui/react"; 

const IdiomasCard = ({ cardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);
  if (!Array.isArray(newCardData) || newCardData.length === 0) {
    return null;
  }
  
  return (
    <>
    <Card marginTop="20px">
      <CardBody p="10px">
      <Text
        fontWeight="bold"
        fontSize="md"
        marginLeft="2"
        marginBottom="1"
        display="flex"
        alignItems="center"
        color="#007935"
      >
        Idiomas
      </Text>
      <Divider orientation='horizontal' />

      {Array.isArray(newCardData) && newCardData.length > 0
        ? newCardData.map((item, index) => (
        <Box
          key={index}
          border="2px solid #007935"
         borderTop="none"
         borderRight="none"
         borderBottom="none"
         marginTop="3"
         paddingLeft="2"
        >
          <Flex >
            <Text display="flex" alignItems="center" marginRight="15px">{item.languageName}</Text>
            <Text bg="#FBC430" color="black" padding="1" borderRadius="8">
              {item.masteryLevel}
            </Text>
          </Flex>
        </Box>
      )) : null }
      </CardBody>
      </Card>
    </>
  );
};

export default IdiomasCard;