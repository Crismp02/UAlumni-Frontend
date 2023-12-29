import React from "react";
import { Card, CardBody, Text, Divider, Image, Center } from "@chakra-ui/react";

function CompanyCard({ cardData }) {
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
          {cardData && cardData.companyName}
        </Text>
        <Divider orientation="horizontal" />
        <Center>
        <Image
  src={cardData ? `data:image/png;base64,${cardData.companyLogo}` : ''}
  alt={cardData ? cardData.companyName : ''}
  marginTop="10px"
  borderRadius="full"
  boxSize="100px"
  objectFit="cover"
/>
        </Center>
      </CardBody>
    </Card>
  );
}

export default CompanyCard;
