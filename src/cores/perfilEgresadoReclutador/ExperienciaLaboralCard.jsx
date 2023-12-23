import React, { useState } from "react";
import {
  Text,
  Box,
  Flex,
  Card, CardBody, Divider
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes

const ExperienciaLaboralCard = ({ cardData }) => {
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
        Experiencia Laboral
      </Text>
      <Divider orientation='horizontal' />
      {Array.isArray(newCardData) && newCardData.length > 0
        ? newCardData.map((item, index) => {
          const dateS = new Date(item.startDate);
          const formattedDateS = `${dateS.getDate()}/${dateS.getMonth()+1}/${dateS.getFullYear()}`;
          const dateE = new Date(item.endDate);
          const formattedDateE = `${dateE.getDate()}/${dateE.getMonth()+1}/${dateE.getFullYear()}`;
          return(
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
      <Text fontWeight="bold" fontSize="15px">{item.companyName}</Text>
      <Text justifyContent="space-between" alignItems="center" marginTop="5px">
         {formattedDateS} - {formattedDateE} 
      </Text>
    </Flex>
    <Flex >
      <Text bg="#FBC430" color="black" fontSize="12px" paddingLeft="2" paddingTop="1px" paddingBottom="1px" paddingRight="8px" borderRadius="4px">
      {item.position}
      </Text>
    </Flex>
    <Flex justifyContent="space-between" fontSize="14px" alignItems="center" marginTop="10px" color="#6B6A6A">
      <Text>{item.description}</Text>
    </Flex>
    
  </Box>
)}) : null}
      </CardBody>
      </Card>
    </>
  );
};

export default ExperienciaLaboralCard;