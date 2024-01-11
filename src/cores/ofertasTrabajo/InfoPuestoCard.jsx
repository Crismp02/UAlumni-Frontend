import React, {useState, useEffect} from "react";
import { Card, CardBody, Text, Divider, Box } from "@chakra-ui/react";

function InfoPuestoCard({ cardData }) {
  const [groupedSkills, setGroupedSkills] = useState({});

  useEffect(() => {
    const groups = cardData.technicalSkills.reduce((acc, skill) => {
      const { technicalSkillCategoryName } = skill;
      if (!acc[technicalSkillCategoryName]) {
        acc[technicalSkillCategoryName] = [];
      }
      acc[technicalSkillCategoryName].push(skill);
      return acc;
    }, {});
    setGroupedSkills(groups);
  }, [cardData]);

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
        {cardData.technicalSkills && cardData.technicalSkills.length > 0 && (
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
            Habilidades técnicas
          </Text>
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <Box key={category}>
              <Text fontSize="sm">
                {category}
              </Text>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {skills.map((skill, index) => (
                  <Box key={index} position="relative">
                    <Box padding="2" marginRight="2" marginTop="1px">
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
                        {skill.technicalSkillName}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        )}
      </CardBody>
    </Card>
  );
}

export default InfoPuestoCard;
