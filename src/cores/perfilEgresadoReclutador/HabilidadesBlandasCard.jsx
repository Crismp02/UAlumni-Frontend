import React, { useState } from "react";
import {
  Text,
  Box,
  Card, CardBody, Divider
} from "@chakra-ui/react";

const HabilidadesBlandasCard = ({ cardData }) => {
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
  Blandas
</Text>
<Divider orientation='horizontal' />
<Box
  display="flex"
  flexDirection="row"
  flexWrap="wrap"
>
  {Array.isArray(newCardData) && newCardData.length > 0
        ? newCardData.map((item, index) => (
    <Box
      key={index}
      position="relative"
    >
      <Box marginBottom="2" marginRight="2" marginTop="10px">
        <Text bg="#37B4E3" fontSize="12px" paddingLeft="2" paddingTop="1px" paddingBottom="1px" paddingRight="8px" borderRadius="4px" color="white">
          {item.skillName}
        </Text>
      </Box>
    </Box>
  )): null}
</Box>
</CardBody>
      </Card>
    </>
  );
};

export default HabilidadesBlandasCard;