import React, { useState } from "react";
import {
  Text,
  Box,
  Flex,
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes

const ExperienciaLaboralCard = ({ cardData }) => {
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
        Experiencia Laboral
      </Text>

      {Array.isArray(newCardData) && newCardData.length > 0
        ? newCardData.map((item, index) => {
          const dateS = new Date(item.startDate);
          const formattedDateS = `${dateS.getDate()}/${dateS.getMonth()+1}/${dateS.getFullYear()}`;
          const dateE = new Date(item.endDate);
          const formattedDateE = `${dateE.getDate()}/${dateE.getMonth()+1}/${dateE.getFullYear()}`;
          return(
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
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontWeight="bold">{item.companyName}</Text>
      <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
        {item.position}
      </Text>
    </Flex>

    <Flex justifyContent="space-between" alignItems="center" marginTop="5px">
      <Text>{item.description}</Text>
    </Flex>
    <Flex justifyContent="space-between" alignItems="center" marginTop="5px">
      <Text>
        {formattedDateS} - {formattedDateE} 
      </Text>
    </Flex>
  </Box>
)}) : null}
    </>
  );
};

export default ExperienciaLaboralCard;