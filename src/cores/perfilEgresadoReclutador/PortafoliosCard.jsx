import React, { useState } from "react";
import { Text, Box, Flex, Divider, Card, CardBody } from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes

const PortafoliosCard = ({ cardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);

  return (
    <>
      <Card>
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
        Portafolios
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
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="15px">{item.title}</Text>
              </Flex>
              <Text as="i" fontSize="15px">{item.sourceLink}</Text>
            </Box>
          ))
        : null}
        </CardBody>  
        </Card>
    </>
  );
};

export default PortafoliosCard;
