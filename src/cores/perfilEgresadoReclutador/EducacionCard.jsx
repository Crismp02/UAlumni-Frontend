import React, { useState } from "react";
import { format, addDays } from "date-fns";
import { Text, Box, Flex, Card, CardBody, Divider } from "@chakra-ui/react";

const EducacionCard = ({ cardData }) => {
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
            Estudios Realizados
          </Text>
          <Divider orientation="horizontal" />
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
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontWeight="bold">{item.title}</Text>
                    <Text
                      justifyContent="space-between"
                      alignItems="center"
                      marginTop="5px"
                    >
                       {addDays(new Date(item.endDate), 1).getFullYear()}
                    </Text>
                  </Flex>
                  <Text>{item.institution}</Text>
                </Box>
              ))
            : null}
        </CardBody>
      </Card>
    </>
  );
};

export default EducacionCard;
