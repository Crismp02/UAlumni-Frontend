
import { Box, Text, Tag, useMediaQuery} from "@chakra-ui/react";
import PropTypes from "prop-types";


const EgresadoCard2 = ({ egresado }) =>{

    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
    const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  if (!egresado) {
      return null; // o puedes retornar un componente de carga o similar
    }
    const { names , surnames, resume} = egresado;
    const skillsArray = resume?.technicalSkills || [];

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
        flexDirection="row"
        marginBottom="10px"
        padding="2px"
      >
        <Box
          w={["115px", "165px", "260px", "385px", "490px", "540px"]}
          m="auto"
          p={5}
          display="flex"
          flexDirection="column"
          paddingTop="0px"
        > 
          {/*  */} 
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
              <Tag key={index} backgroundColor="#FBC430" marginLeft="5px" padding="6px">
                {skill.skillName}
              </Tag>
            ))}
            <Text marginLeft="10px">...</Text>
          </Box>
          <Text textAlign="right" fontSize={["sm", "sm", "md", "md"]}>
            VER PERFIL
          </Text>
        </Box>
      </Box>
    </div>
  );
};

// Definir la validación de props
EgresadoCard2.propTypes = {
    egresado: PropTypes.object.isRequired,
};
export default EgresadoCard2;
