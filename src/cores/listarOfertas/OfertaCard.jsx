import React from "react";
import { Box, Text, Tag, Image } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import EgresadosLanding from "../../images/egresadosLanding.jpg";

function  OfertaCard(){
    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
    const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
    const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");
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
          flexDirection={["column", "column", "row", "row"]}
          marginBottom="10px"
          alignItems="center"
          padding="2px"
        >
            <Image borderRadius="full" boxSize="90px" src={EgresadosLanding} alt="Egresados Landing" marginLeft={["0px", "0px", "10px", "10px"]} marginTop={["10px","10px","10px","10px"]} marginBottom={["0px","0px","10px","10px"]}/>
          <Box
            w={["165px", "165px", "260px", "385px", "490px", "540px"]}
            m="auto"
            p={5}
            display="flex"
            flexDirection="column"
            paddingTop="0px"
          >
            <Text as="b" fontSize={["sm", "sm", "md", "md"]} textAlign={["center", "center", "left", "left"]} marginTop="10px">Posición de interés</Text>
            <Text fontSize={["xs", "xs", "sm", "md"]} textAlign={["center", "center", "left", "left"]} marginTop="5px">Nombre empresa</Text>
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
           <Tag backgroundColor="#FBC430"  paddingRight={["0px","0px","12px","12px"]} textAlign="center">Tiempo de publicación</Tag>

          </Box>
          <Text textAlign={["center", "center", "right", "right"]} paddingRight={["0px","0px","12px","12px"]} fontSize={["sm", "sm", "md", "md"]}>VER INFORMACIÓN</Text>
          </Box>
        </Box>
      </div>
    );
}
export default OfertaCard;