import React from "react";
import NavBar from "../../components/Navbar";
import { Text, Image, Input, Button, Box, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Link } from 'react-router-dom'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

function Register() {

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show) 

  return (
    <div>
      <NavBar />
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
            <Image src="src/images/egresados.jpg" alt='Imagen Ucabista' width="100%" height="auto" />
          </Box>
          <Box
            width={{ base: "100%", md: "50%" }}
            padding={{ base: "20px", md: "40px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize='4xl' textAlign='center' as='b' paddingBottom='50px' style={{
                                textDecoration: "underline",
                                textDecorationColor: "green",
                                display: "flex",
                                justifyContent: "center",
                              }}>
              REGÍSTRATE
            </Text>
            <Text fontSize='2xl' as='b' paddingBottom='10px' paddingTop='10px' alignSelf='start'>
              Correo UCAB
            </Text>
            <Input variant='filled' placeholder='Ingrese su correo UCAB'/>
            <Text fontSize='2xl' as='b' paddingBottom='10px' paddingTop='10px' alignSelf='start'>
              Contraseña
            </Text>
            <InputGroup>
                <Input variant='filled' type={show ? 'text' : 'password'} placeholder='Ingrese su contraseña'/>
                    <InputRightElement width={{sm:'10%',md:'10%'}}>
                        <Button h='1.75 rem' size='sm' onClick={handleClick}>
                            {show ? <ViewOffIcon/> : <ViewIcon/>}
                        </Button>
                    </InputRightElement>
            </InputGroup>
            <Text fontSize='2xl' as='b' paddingBottom='10px' paddingTop='10px' alignSelf='start'>
              Confirmar Contraseña
            </Text>
            <InputGroup>
                <Input variant='filled' type={show ? 'text' : 'password'} placeholder='Vuelva a ingresar su contraseña'/>
                    <InputRightElement width={{sm:'10%',md:'10%'}}>
                        <Button h='1.75 rem' size='sm' onClick={handleClick}>
                            {show ? <ViewOffIcon/> : <ViewIcon/>}
                        </Button>
                    </InputRightElement>
            </InputGroup>
            <Button
              backgroundColor="#007935"
              color='white'
              _hover={{ bg: "#025024" }}
              width={{ base: "100%", md: "60%" }}
              marginTop="20px"
              paddingTop="10px"
              paddingBottom="10px"
            >
              Registrarse
            </Button>
            <Text paddingTop='10px'>
              ¿Ya tienes cuenta?{" "}
              <Link to='/login' 
                    style={{
                                    textDecoration: "underline",
                                    textDecorationColor: "green",
                                    display: "inline", 
                                    justifyContent: "center",
                                    marginLeft: "5px",
                                }}>
                Iniciar Sesión
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Register;