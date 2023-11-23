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


function Login() {
    return (
        <div>
            <NavBar/>
            <div style={{
                backgroundColor: "#F5F5F5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#FFFFFF",
                    width: "80%",
                    height: "80%",
                    border: "1px solid #ccc",
                }}>
                    <div style={{
                        width: "50%",
                        padding: "20px"
                    }}>
                        <Image src="src\images\egresados.jpeg" alt='Imagen Ucabista'/>
                    </div>

                    <div style={{
                        width: "50%",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                         <Text fontSize='4xl' textAlign='center' as='b' paddingBottom='50px'>
                            INICIA SESIÓN
                        </Text>
                        <Text fontSize='2xl' textAlign='start' alignSelf='start' as='b' paddingBottom='10px' paddingTop='10px'>
                            Correo UCAB
                        </Text>
                        <Input variant='filled'/>
                        <Text fontSize='2xl' as='b' alignSelf='start' paddingBottom='10px' paddingTop='10px'>
                            Contraseña
                        </Text>
                        <Input variant='filled'/>
                        <Button 
                            backgroundColor="#007935" 
                            color='white'  _hover={{ bg: "#025024" }} 
                            width="20%" 
                            marginTop="20px"
                            paddingTop="10px"
                            paddingBottom="10px">
                            Iniciar sesión
                        </Button>
                        <Text paddingTop='10px'>
                            ¿Aún no tienes cuenta? Regístrate
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Login;