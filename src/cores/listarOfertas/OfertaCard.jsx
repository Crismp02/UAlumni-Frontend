
import { Box, Text, Tag, Image} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const OfertaCard = ({ oferta }) =>{

    if(!oferta){
        return null;
    }

    const {companyLogo, companyName, position, visibleSince, id} = oferta;
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
            <Image 
              borderRadius="full" 
              boxSize="90px" 
              src={`data:image/jpeg;base64,${companyLogo}`} 
              alt="Logo de la Empresa" 
              marginLeft={["0px", "0px", "10px", "10px"]} 
              marginTop={["10px","10px","10px","10px"]} 
              marginBottom={["0px","0px","10px","10px"]}
              />
          <Box
            w={["115px", "165px", "260px", "385px", "490px", "540px"]}
            m="auto"
            p={5}
            display="flex"
            flexDirection="column"
            paddingTop="0px"
          >
            <Text 
              as="b" 
              fontSize={["sm", "sm", "md", "md"]} 
              textAlign={["center", "center", "left", "left"]} 
              marginTop="10px"
              textTransform="capitalize"
              >
            {position}
            </Text>
            <Text 
              fontSize={["xs", "xs", "sm", "md"]} 
              textAlign={["center", "center", "left", "left"]} 
              marginTop="5px"
              textTransform="capitalize"
              >
            {companyName}
            </Text>
          </Box>
          <Box
            w={["100%", "100%", "80%", "80%", "80%", "80%"]}
            m="auto"
            p={5}
            display="flex"
            flexDirection="column"
            padding="0px"
          >
            <Box 
            w={["100%", "100%", "80%", "80%", "80%", "80%"]}
            m="auto"
            p={5}
            gap={["5px", "5px", "8px", "8px"]}
            marginBottom={["10px", "10px", "0px", "0px"]}
            display="flex"
            flexDirection={["column", "column", "row", "row"]}
            justifyContent="flex-end"
          >
           <Tag 
           backgroundColor="#FBC430"  
           paddingRight={["5px","2px","5px","5px","10px","10px"]} 
           textAlign="center"
           fontSize={["xs", "xs","xs","sm","sm","lg"]}>
           {formattedDate}
           </Tag>
          </Box>
          <Link to={`/job-offer/${id}`}>
          <Text 
            textAlign={["center", "center", "center", "right"]} 
            paddingRight={["10px","10px","12px","12px"]} 
            marginRight={["10px", "10px", "0px", "0px"]}
            fontSize={["xs", "sm", "md", "md"]}
            color="white"
            bg="#007935"
            cursor="pointer"
            >
              VER INFORMACIÓN
          </Text>
          </Link>
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