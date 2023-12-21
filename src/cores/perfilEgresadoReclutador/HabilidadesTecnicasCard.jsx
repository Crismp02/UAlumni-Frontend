import React, { useState, useEffect } from "react";
import { Text, Box, Card, CardBody, Divider } from "@chakra-ui/react";

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
            Técnicas
          </Text>
          <Divider orientation="horizontal" />
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <Box key={category}>
              <Text fontWeight="bold" fontSize="sm" marginTop="3">
                {category}
              </Text>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {skills.map((skill, index) => (
                  <Box key={index} position="relative">
                    <Box padding="2" marginRight="2" marginTop="3px">
                      <Text
                        bg="#37B4E3"
                        fontSize="12px"
                        paddingLeft="2"
                        paddingTop="1px"
                        paddingBottom="1px"
                        paddingRight="8px"
                        borderRadius="4px"
                        color="white"
                      >
                        {skill.skillName}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </CardBody>
      </Card>
    </>
  );
};

export default HabilidadesTecnicasCard;
