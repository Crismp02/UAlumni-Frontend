import React from "react";
import NavBarEgresados from "../../components/NavBarEgresados";
import Footer from "../../components/Footer";
import { Box, Text, Flex,  Center, Button } from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon, EditIcon} from '@chakra-ui/icons'

function PerfilEgresado() {
    return (
        <div>
            <NavBarEgresados />

            <Text
                fontSize={["lg", "lg", "xl", "4xl"]}
                color="black"
                textAlign="center"
                as="b"
                paddingTop={["2px", "2px", "2px", "10px"]}
                marginTop="10px"
                marginBottom="10px"
                style={{
                    textDecoration: "underline",
                    textDecorationColor: "green",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                PERFIL
            </Text>

            <Flex justifyContent="flex-end" alignItems="center" marginBottom='5px'>
                <ViewIcon marginRight='20px' />
                <EditIcon marginRight='20px'/>
            </Flex>

            <Box display="flex" justifyContent="space-between">
                <Box width="45%" bg="#D9D9D9" height="100vh" marginRight="20px" marginBottom='20px' marginLeft='20px'>

                </Box>
                <Box width="55%" bg="#D9D9D9" height="100vh" marginRight='20px' marginBottom='20px'>

                </Box>
            </Box>
            
        <Footer/>   
        </div>
    );
}

export default PerfilEgresado;