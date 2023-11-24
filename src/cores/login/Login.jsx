import NavBar from "../../components/Navbar";
import {
    Text, 
    Image,
    Flex,
    Box,
    Grid,
    GridItem,
  } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


function Login() {
    return (
        <div>
            <NavBar/>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh" 
                paddingX={{ base: "20px", md: "0" }} 
                backgroundColor="#F5F5F5"
            >
                <Box
                    width={{ base: "100%", md: "70%", lg: "80%" }}
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    backgroundColor="#fff"
                    border="1px solid #ccc"
                >
                    <Box 
                        width={{ base: "100%", md: "50%" }}
                        padding={{ base: "20px"}}
                    >
                        <Image src="src\images\egresados.jpg" alt='Imagen Ucabista' width="100%" height="auto"/>
                    </Box>

                    <Box 
                        width={{ base: "100%", md: "50%" }}
                        padding={{ base: "20px", md: "40px" }}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                         <Text 
                            fontSize='4xl' textAlign='center' as='b' paddingBottom='50px'
                            style={{
                                textDecoration: "underline",
                                textDecorationColor: "green",
                                display: "flex",
                                justifyContent: "center",
                              }}
                         >
                            INICIA SESIÓN
                        </Text>
                        <Text fontSize='2xl' textAlign='start' alignSelf='start' as='b' paddingBottom='10px' paddingTop='10px'>
                            Correo UCAB
                        </Text>
                        <Input variant='filled'/>
                        <Text fontSize='2xl' as='b' alignSelf='start' paddingBottom='10px' paddingTop='10px'>
                            Contraseña
                        </Text>
                        <Input variant='filled' type='password'/>
                        <Button 
                            backgroundColor="#007935" 
                            color='white' 
                            _hover={{ bg: "#025024" }} 
                            width={{ base: "100%", sm: "60%", md: "50%" }} 
                            marginTop="20px"
                            paddingTop="10px"
                            paddingBottom="10px">
                            Iniciar sesión
                        </Button>
                        <Text paddingTop='10px'>
                            ¿Aún no tienes cuenta? 
                            <Link to='/register'
                                style={{
                                    textDecoration: "underline",
                                    textDecorationColor: "green",
                                    display: "inline", 
                                    justifyContent: "center",
                                    marginLeft: "5px",
                                }}
                            >
                                Regístrate
                            </Link>
                        </Text>
                    </Box>
                </Box>
            </Box>
        </div>
    )   
}

export default Login;