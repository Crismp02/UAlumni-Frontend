import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
} from "@chakra-ui/react"; 

const HabilidadesTecnicasCard = ({ cardData }) => {
  const [groupedSkills, setGroupedSkills] = useState({});

  useEffect(() => {
    const groups = cardData.reduce((acc, skill) => {
      const { skillCategoryName } = skill;
      if (!acc[skillCategoryName]) {
        acc[skillCategoryName] = [];
      }
      acc[skillCategoryName].push(skill);
      return acc;
    }, {});
    setGroupedSkills(groups);
  }, [cardData]);

  return (
    <>
    <Text
  fontSize="lg"
  marginLeft="10"
  marginRight="10"
  marginTop="2"
>
  Técnicas
</Text>
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <Box key={category}>
          <Text fontWeight="bold" fontSize="xl" marginLeft="10" marginTop="5" marginBottom="0">
            {category}
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            marginLeft="10"
            marginRight="10"
            marginBottom="5"
          >
            {skills.map((skill, index) => (
              <Box
                key={index}
                position="relative"
                padding="2"
                marginRight="2"
              >
                <Box padding="2" marginBottom="2" marginRight="2">
                  <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                    {skill.skillName}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default HabilidadesTecnicasCard;