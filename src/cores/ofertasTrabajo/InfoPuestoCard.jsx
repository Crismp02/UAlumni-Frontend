import React from "react";
import { Card, CardBody, Text, Divider, Box } from "@chakra-ui/react";

function InfoPuestoCard({ cardData }) {
  return (
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
          Información del Puesto
        </Text>
        <Divider orientation="horizontal" />
        <Box
          border="2px solid #007935"
          borderTop="none"
          borderRight="none"
          borderBottom="none"
          marginTop="3"
          paddingLeft="2"
          marginLeft="10px"
        >
          <Text
            fontWeight="bold"
            fontSize="15px"
            marginTop="10px"
          >
            Cargo
          </Text>
          <Text fontSize="15px">
          {cardData && cardData.position}
          </Text>
        </Box>
        <Box
          border="2px solid #007935"
          borderTop="none"
          borderRight="none"
          borderBottom="none"
          marginTop="3"
          paddingLeft="2"
          marginLeft="10px"
        >
          <Text
            fontWeight="bold"
            fontSize="15px"
            marginTop="10px"
          >
            Area de Desempeño
          </Text>
          <Text fontSize="15px">
          {cardData && cardData.department}
          </Text>
        </Box>
        <Box
          border="2px solid #007935"
          borderTop="none"
          borderRight="none"
          borderBottom="none"
          marginTop="3"
          paddingLeft="2"
          marginLeft="10px"
        >
          <Text
            fontWeight="bold"
            fontSize="15px"
            marginTop="10px"
          >
            Descripción
          </Text>
          <Text fontSize="15px">
          {cardData && cardData.description}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
}

export default InfoPuestoCard;
