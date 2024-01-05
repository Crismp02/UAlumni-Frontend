
import { Box, Button, Text, Tag, useMediaQuery} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const EgresadoCard = ({ egresado }) =>{

    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
    const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  if (!egresado) {
      return null; 
    }

    const { names , surnames, resume, graduations, id } = egresado;

    const skillsArray = resume?.technicalSkills || [];

    //Adaptar las skills al tamaño de la pantalla
    let skillsToShow;
    if (isLargerThan1300) {
      skillsToShow = skillsArray.slice(0, 4);
    } else if (isLargerThan800) {
      skillsToShow = skillsArray.slice(0, 3);
    } else if (isLargerThan1000) {
      skillsToShow = skillsArray.slice(0, 2);
    } else {
      skillsToShow = skillsArray.slice(0, 1);
    }

    //Adaptar las carreras al tamaño de la pantalla
    let careersToShow;
    if (isLargerThan1300) {
      careersToShow = graduations.slice(0, 3);
    } else if (isLargerThan800) {
      careersToShow = graduations.slice(0, 2);
    } else if (isLargerThan1000) {
      careersToShow = graduations.slice(0, 2);
    } else {
      careersToShow = graduations.slice(0, 1);
    }
    
  return (
    <div>

        <Box
        w={["80%", "80%", "80%", "80%", "80%", "80%"]}
        m="auto"
        p={5}
        shadow="md"
        borderWidth="1px"
        backgroundColor="white"
        display="flex"
        flexDirection="column"
        marginBottom="10px"
        padding="2px"
       >
      <Box
      display="flex"
        >
          <Box
            w={["115px", "165px", "260px", "385px", "490px", "540px"]}
            m="auto"
            p={5}
            display="flex"
            flexDirection="column"
            paddingTop="0px"
          > 

            <Text as="b" fontSize={["sm", "sm", "md", "md"]}>
              {names} {surnames}
            </Text>
          
        </Box>
        <Box
          w={["135px", "185px", "280px", "405px", "510px", "560px"]}
          m="auto"
          p={5}
          display="flex"
          flexDirection="column"
          paddingLeft="0px"
        >
            <Box
              w={["125px", "175px", "270px", "395px", "500px", "550px"]}
              m="auto"
              p={5}
              gap={["5px", "5px", "8px", "8px"]}
              marginBottom={["10px", "10px", "0px", "0px"]}
              display="flex"
              flexDirection={["column", "column", "row", "row"]}
            >
                {skillsToShow.map((skill, index) => (
                <Tag 
                    key={index} 
                    backgroundColor="#FBC430" 
                    marginLeft="5px" 
                    padding="6px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap">
                  {skill.skillName}
                </Tag>
              ))}
              {skillsToShow.length > 4 && <Text marginLeft="10px">...</Text>}
            </Box>
          </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            marginBottom="18px"
            paddingX="20px"
            width="100%">

              <Box display="flex" flexDirection="row" flexWrap="wrap"    alignItems="flex-start">
                <Text
                  fontSize={["sm", "sm", "md", "md"]}
                  textAlign="left"
                  mr={2}
                >
                  {careersToShow.map((graduation) => graduation.careerName).join(' / ')}
                </Text>
             </Box>

              <Link to={`/alumni/${id}/profile`}>
              <Button 
                textAlign="right" 
                fontSize={["sm", "sm", "md", "md"]}
                colorScheme="teal"
                variant="ghost">
                VER PERFIL
              </Button>
              </Link>
          </Box>
      </Box>
    </div>
  );
};

// Definir la validación de props
EgresadoCard.propTypes = {
    egresado: PropTypes.object.isRequired,
};



export default EgresadoCard;
