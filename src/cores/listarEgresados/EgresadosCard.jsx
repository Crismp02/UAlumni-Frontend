import { Box, Button, Text, Tag, useMediaQuery } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EgresadoCard = ({ egresado }) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  if (!egresado) {
    return null;
  }

  const { names, surnames, resume, graduations, id } = egresado;

  const skillsArray = resume?.technicalSkills || [];

  //Adaptar las skills al tamaño de la pantalla
  let skillsToShow;
  if (isLargerThan1300) {
    skillsToShow = skillsArray.slice(0, 4);
  } else if (isLargerThan1000) {
    skillsToShow = skillsArray.slice(0, 3);
  } else if (isLargerThan600) {
    skillsToShow = skillsArray.slice(0, 2);
  } else {
    skillsToShow = skillsArray.slice(0, 1);
  }

  //Adaptar las carreras al tamaño de la pantalla
  let careersToShow;
  if (isLargerThan1300) {
    careersToShow = graduations.slice(0, 3);
  } else if (isLargerThan1000) {
    careersToShow = graduations.slice(0, 2);
  } else if (isLargerThan600) {
    careersToShow = graduations.slice(0, 2);
  } else {
    careersToShow = graduations.slice(0, 1);
  }

  return (
    <Box
      w="90%"
      p={5}
      shadow="md"
      borderWidth="1px"
      backgroundColor="white"
      display="flex"
      flexDirection="column"
      marginBottom="10px"
      padding="2px"
      borderRadius="10px"
    >
      <Box display="flex">
        <Box
          w={["50%", "165px", "260px", "385px", "490px", "540px"]}
          m="auto"
          p={5}
          display="flex"
          flexDirection="column"
          paddingTop="0px"
        >
          <Text
            as="b"
            fontSize={["sm", "sm", "md", "md"]}
            textTransform="capitalize"
          >
            {names} {surnames}
          </Text>
        </Box>
        <Box
          w={["50%", "200px", "270px", "395px", "500px", "550px"]}
          m="auto"
          p={5}
          gap={["5px", "5px", "8px", "8px"]}
          marginBottom={["10px", "10px", "0px", "0px"]}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          height="70px"
        >
          {skillsToShow.map((skill, index) => (
            <Tag
              key={index}
              backgroundColor="#FBC430"
              marginLeft="5px"
              padding="6px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {skill.skillName}
            </Tag>
          ))}
          {skillsArray.length > skillsToShow.length && <Text marginLeft="10px">...</Text>}
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        marginBottom="18px"
        paddingX="20px"
        width="100%"
      >
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          alignItems="flex-start"
        >
          <Text
            fontSize={["sm", "sm", "md", "md"]}
            textAlign="left"
            mr={2}
            textTransform="capitalize"
          >
            {careersToShow
              .map((graduation) => graduation.careerName)
              .join(" / ")}
          </Text>
        </Box>

        <Link to={`/alumni/${id}/profile`}>
          <Button
            textAlign="right"
            fontSize={["sm", "sm", "md", "md"]}
            colorScheme="teal"
            bg="#007935"
          >
            VER PERFIL
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

// Definir la validación de props
EgresadoCard.propTypes = {
  egresado: PropTypes.object.isRequired,
};

export default EgresadoCard;
