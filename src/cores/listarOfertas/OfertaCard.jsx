
import { Box, Text, Tag, Image} from "@chakra-ui/react";
import PropTypes from "prop-types";

const OfertaCard = ({ oferta }) =>{

    if(!oferta){
        return null;
    }

    const {companyLogo, companyName, position, visibleSince} = oferta;
    const date = new Date(visibleSince);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript empiezan en 0, por lo que debes sumar 1
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

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
            <Image borderRadius="full" boxSize="90px" src={`data:image/jpeg;base64,${companyLogo}`} alt="Logo de la Empresa" marginLeft={["0px", "0px", "10px", "10px"]} marginTop={["10px","10px","10px","10px"]} marginBottom={["0px","0px","10px","10px"]}/>
          <Box
            w={["115px", "165px", "260px", "385px", "490px", "540px"]}
            m="auto"
            p={5}
            display="flex"
            flexDirection="column"
            paddingTop="0px"
          >
            <Text as="b" fontSize={["sm", "sm", "md", "md"]} textAlign={["center", "center", "left", "left"]} marginTop="10px">
            {position}
            </Text>
            <Text fontSize={["xs", "xs", "sm", "md"]} textAlign={["center", "center", "left", "left"]} marginTop="5px">
            {companyName}
            </Text>
          </Box>
          <Box
            w={["210px", "185px", "280px", "405px", "510px", "560px"]}
            m="auto"
            p={5}
            display="flex"
            flexDirection="column"
            padding="0px"
          >
            <Box w={["210px", "185px", "270px", "395px", "500px", "550px"]}
            m="auto"
            p={5}
            gap={["5px", "5px", "8px", "8px"]}
            marginBottom={["10px", "10px", "0px", "0px"]}
            display="flex"
            flexDirection={["column", "column", "row", "row"]}
            justifyContent="flex-end"
          >
           <Tag backgroundColor="#FBC430"  paddingRight={["0px","0px","12px","12px"]} textAlign="center">
           {formattedDate}
           </Tag>
          </Box>
          <Text textAlign={["center", "center", "right", "right"]} paddingRight={["0px","0px","12px","12px"]} fontSize={["sm", "sm", "md", "md"]}>VER INFORMACIÓN</Text>
          </Box>
        </Box>
      </div>
    );
}

//Definir la validación de props
OfertaCard.propTypes = {
  oferta: PropTypes.object.isRequired,
};


export default OfertaCard;