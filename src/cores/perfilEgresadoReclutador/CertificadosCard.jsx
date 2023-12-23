import React, { useState } from "react";
import { Text, Box, Card, CardBody, Divider } from "@chakra-ui/react";

const CertificadosCard = ({ cardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);

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
            Certificados CIAP
          </Text>
          <Divider orientation="horizontal" />
          {Array.isArray(newCardData) && newCardData.length > 0
            ? newCardData.map((item, index) => {
                const date = new Date(item.date);
                const formattedDate = `${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`;
                return (
                  <Box
                    key={index}
                    border="2px solid #007935"
                    borderTop="none"
                    borderRight="none"
                    borderBottom="none"
                    marginTop="3"
                    paddingLeft="2"
                  >
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text>{formattedDate}</Text>
                  </Box>
                );
              })
            : null}
        </CardBody>
      </Card>
    </>
  );
};

export default CertificadosCard;
