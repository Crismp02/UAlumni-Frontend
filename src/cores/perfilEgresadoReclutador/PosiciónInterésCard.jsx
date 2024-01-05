import React, { useState } from "react";
import {
  Text,
  Box,
  Flex,
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react"; 


const PosicionesInteresCard = ({ cardData, setCardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);
  if (!Array.isArray(newCardData) || newCardData.length === 0) {
    return null;
  }

  return (
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
                Posiciones de Interés
              </Text>
          <Divider orientation="horizontal" />
          {Array.isArray(newCardData) && newCardData.length > 0 ? (
            newCardData.map((item, index) => (
              <Flex key={index} alignItems="center" marginTop="3">
                <Box
                  key={index}
                  border="2px solid #007935"
                  borderTop="none"
                  borderRight="none"
                  borderBottom="none"
                  marginTop="3"
                  paddingLeft="2"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" fontSize="15px">
                        {item.positionName}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            ))
          ) : (
           null
          )}
        </CardBody>
      </Card>
  );
};

export default PosicionesInteresCard;
