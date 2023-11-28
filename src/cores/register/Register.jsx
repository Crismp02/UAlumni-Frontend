import React from "react";
import { useState } from 'react';
import NavBar from "../../components/Navbar";
import { Text, Image, Input, Button, Box, InputGroup, InputRightElement,
         FormControl, FormErrorMessage} from "@chakra-ui/react";
import { Link } from 'react-router-dom'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

function Register() {

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    const emailRegex = /^[A-Z0-9._%+-]+@est.ucab.edu.ve$/i;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);

    // Submit form if email is valid
    if (isValid) {
      // TODO: Submit form logic here
    }
  };

  const [show, setShow] = React.useState(false)
  const [show2, setShow2] = React.useState(false)

  const handleClick = () => setShow(!show) 
  const handleClick2 = () => setShow2(!show2)

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
            <Image src="src/images/egresadosModulos.jpg" alt='Imagen Ucabista' width="100%" height="auto" />
          </Box>

          <Box 
            textAlign='start'
            width={{ base: "100%", md: "50%" }}
            padding={{ base: "20px", md: "40px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            >
          <form
            onSubmit={handleSubmit}
          >
          <FormControl isInvalid={!isEmailValid}>
              <Text fontSize='4xl' textAlign='center' as='b' paddingBottom='50px' style={{
                                textDecoration: "underline",
                                textDecorationColor: "green",
                                display: "flex",
                                justifyContent: "center",
                              }}>
                REGÍSTRATE
              </Text>
              <Text fontSize='2xl' as='b' paddingBottom='10px' paddingTop='10px' textAlign='start' alignSelf='start'>
                Correo UCAB
              </Text>
              <Input variant='filled' name='email' type='email' 
                     value={email} onChange={handleEmailChange} placeholder='Ingrese su correo UCAB'/>
              <FormErrorMessage>
                    {isEmailValid ? '' : 'El correo debe ser un correo UCAB'}
              </FormErrorMessage>
              </FormControl>
              <Text fontSize='2xl' as='b' paddingBottom='10px' paddingTop='10px' alignSelf='start'>
                Contraseña
              </Text>
              <InputGroup>
                <Input variant='filled' type={show ? 'text' : 'password'} inputMode='none' 
                  sx={{
                    '::-ms-reveal': {
                        display: 'none',}}}
                  placeholder='Ingrese su contraseña'/>
                    <InputRightElement width={{sm:'10%',md:'10%'}}>
                        <Button h='1.75 rem' size='sm' onClick={handleClick}>
                            {show ? <ViewOffIcon/> : <ViewIcon/>}
                        </Button>
                    </InputRightElement>
              </InputGroup>
              <Text fontWeight='bold' fontSize='2xl' as='b' paddingBottom='10px' paddingTop='10px' alignSelf='start'>
                Confirmar Contraseña
              </Text>
            <InputGroup>
                <Input variant='filled' type={show2 ? 'text' : 'password'} inputMode='none' 
                  sx={{
                    '::-ms-reveal': {
                        display: 'none',}}}
                  placeholder='Vuelva a ingresar su contraseña'/>
                    <InputRightElement width={{sm:'10%',md:'10%'}}>
                        <Button h='1.75 rem' size='sm' onClick={handleClick2}>
                            {show2 ? <ViewOffIcon/> : <ViewIcon/>}
                        </Button>
                    </InputRightElement>
            </InputGroup>
            <Box textAlign='center'>
            <Button
              backgroundColor="#007935"
              color='white'
              _hover={{ bg: "#025024" }}
              width={{ base: "70%", md: "60%" }}
              marginTop="20px"
              paddingTop="10px"
              paddingBottom="10px"
              type='submit'
            >
              Registrarse
            </Button>
            </Box>
            </form>
            <Text paddingTop='10px' textAlign='center'>
              ¿Ya tienes cuenta?{" "}
              <Link to='/login' 
                    style={{
                                    textDecoration: "underline",
                                    textDecorationColor: "green",
                                    display: "inline", 
                                    justifyContent: "center",
                                    marginLeft: "5px",
                                }}>
                Inicia Sesión
              </Link>
            </Text>
          </Box>

        </Box>
      </Box>
    </div>
  )
}

export default Register;
