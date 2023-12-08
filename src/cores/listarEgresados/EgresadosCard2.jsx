
import { Box, Text, Tag, useMediaQuery} from "@chakra-ui/react";
import PropTypes from "prop-types";


const EgresadoCard2 = ({ egresado}) =>{

    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
    const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");
    let skillsArray =[];
    let namesArray =[];
    // const egresadoArray =[];
    

  

    //Verificar si 'egresado' es un objeto y tiene las propiedades esperadas:
    if (typeof egresado === 'object' && 'associatedAlumni' in egresado && typeof egresado.associatedAlumni === 'object') {
        //Obtener nombres del egresado actual
        namesArray.push(egresado.names);
        // Obtener habilidades técnicas del egresado actual
        skillsArray = egresado.associatedAlumni.resume.technicalSkills;
    }
    console.log("EUREKA",namesArray);
  return (
    <div>
            <Box
        w={["250px", "350px", "540px", "790px", "1000px", "1100px"]}
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
          { namesArray.map((index) =>(
          <Text key={index} as="b" fontSize={["sm", "sm", "md", "md"]}>
            {/* namesArray[0] */}
          </Text>))}
          <Text >
          CARERA
          {/* {egresado.data.items[0].career} */}
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
            {skillsArray.map((skill, index) => (
              <Tag key={index} backgroundColor="#FBC430" marginLeft="5px" padding="6px">
                {skill.skillName}
              </Tag>
            ))}
            {isLargerThan1000 && (
              <Tag backgroundColor="#FBC430" marginLeft="5px" padding="6px">
                {skillsArray[1] && skillsArray[1].skillName}
              </Tag>
            )}
            {isLargerThan800 && (
              <Tag backgroundColor="#FBC430" marginLeft="5px" padding="6px">
                {skillsArray[2] && skillsArray[2].skillName}
              </Tag>
            )}
            {isLargerThan1300 && (
              <Tag backgroundColor="#FBC430" marginLeft="5px" padding="6px">
                {skillsArray[3] && skillsArray[3].skillName}
              </Tag>
            )}
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
