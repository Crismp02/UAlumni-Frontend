import React, {useState} from "react";
import NavBar from "../../components/Navbar";
import { Text, Image, Input, Button, Box, InputGroup, InputRightElement,
         FormControl, FormErrorMessage} from "@chakra-ui/react";
import { Link } from 'react-router-dom'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import  {registerUser}  from "../../services/auth/Auth.services";

function Register() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    const emailRegex = /^[A-Z0-9._%+-]+@est.ucab.edu.ve$/i;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);

    // Validate password
    if (password !== confirmPassword) {
      // Show some error message
      return;
    }

    if (isValid) {
      try {
        const data = await registerUser(email, firstName, lastName, password);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } 
  };

  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);

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
          <Box width={{ base: "100%", md: "50%" }} padding={{ base: "20px" }} display="flex" flexDirection="column" justifyContent="center">
            <Image
              src="src/images/egresadosModulos.jpg"
              alt="Imagen Ucabista"
              width="100%"
              height="auto"
            />
          </Box>

          <Box
            textAlign="start"
            width={{ base: "100%", md: "50%" }}
            padding={{ base: "20px", md: "40px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={!isEmailValid}>
                <Text
                  fontSize="4xl"
                  textAlign="center"
                  as="b"
                  paddingBottom="30px"
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "green",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  REGÍSTRATE
                </Text>
                <Text
                  fontSize="xl"
                  as="b"
                  paddingBottom="10px"
                  paddingTop="10px"
                  textAlign="start"
                  alignSelf="start"
                >
                  Nombre
                </Text>
                <Input
                id="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  marginBottom="20px"
                />
                <Text
                  fontSize="xl"
                  as="b"
                  paddingBottom="10px"
                  textAlign="start"
                  alignSelf="start"
                >
                  Apellido
                </Text>
                <Input
                id="apellido"
                  type="text"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  marginBottom="20px"
                />
                <Text
                  fontSize="xl"
                  as="b"
                  paddingBottom="10px"
                  paddingTop="10px"
                  textAlign="start"
                  alignSelf="start"
                >
                  Correo UCAB
                </Text>
                <Input
                id="correo"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Ingrese su correo UCAB"
                  marginBottom="20px"
                />
                <FormErrorMessage>
                  {isEmailValid ? "" : "El correo debe ser un correo UCAB"}
                </FormErrorMessage>
              </FormControl>
              <Text
                fontSize="xl"
                as="b"
                paddingBottom="10px"
                paddingTop="10px"
                alignSelf="start"
              >
                Contraseña
              </Text>
              <InputGroup>
                <Input
                  id="contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  marginBottom="20px"
                  type={show ? "text" : "password"}
                  inputMode="none"
                  sx={{
                    "::-ms-reveal": {
                      display: "none",
                    },
                  }}
                  placeholder="Ingrese su contraseña"
                />
                <InputRightElement width={{ sm: "10%", md: "10%" }}>
                  <Button h="1.75 rem" size="sm" onClick={handleClick}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text
                fontWeight="bold"
                fontSize="xl"
                as="b"
                paddingBottom="10px"
                paddingTop="10px"
                alignSelf="start"
              >
                Confirmar contraseña
              </Text>
              <InputGroup>
                <Input
                onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmarContraseña"
                  marginBottom="20px"
                  type={show2 ? "text" : "password"}
                  inputMode="none"
                  sx={{
                    "::-ms-reveal": {
                      display: "none",
                    },
                  }}
                  placeholder="Vuelva a ingresar su contraseña"
                />
                <InputRightElement width={{ sm: "10%", md: "10%" }}>
                  <Button h="1.75 rem" size="sm" onClick={handleClick2}>
                    {show2 ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box textAlign="center">
                <Button
                  backgroundColor="#007935"
                  color="white"
                  _hover={{ bg: "#025024" }}
                  width={{ base: "70%", md: "60%" }}
                  marginTop="20px"
                  paddingTop="10px"
                  paddingBottom="10px"
                  type="submit"
                >
                  Registrarse
                </Button>
              </Box>
            </form>
            <Text paddingTop="10px" textAlign="center">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "green",
                  display: "inline",
                  justifyContent: "center",
                  marginLeft: "5px",
                }}
              >
                Inicia Sesión
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Register;
