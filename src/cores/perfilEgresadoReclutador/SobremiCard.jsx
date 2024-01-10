import React, { useState } from "react";
import { Text, Box, Flex, Card, CardBody, Divider } from "@chakra-ui/react";

const SobremiCard = ({ cardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);
  if (newCardData === null) {
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
        Sobre mí
      </Text>
      <Divider orientation='horizontal' />
      <Box
         border="2px solid #007935"
         borderTop="none"
         borderRight="none"
         borderBottom="none"
         marginTop="3"
         paddingLeft="2"
      >
        <Flex>
          <Text fontSize="15px">{cardData}</Text>
        </Flex>
      </Box>
      </CardBody>
      </Card>
    </>
  );
};

export default SobremiCard;
