import React from "react";
import { useState } from "react";
import NavBar from "../../components/Navbar";
import {
  Text,
  Image,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginUser } from "../../services/auth/Auth.services";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    const emailRegex = /^[A-Z0-9._%+-]+@est.ucab.edu.ve$/i;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);

    // Submit form if email is valid
    if (isValid) {
      try {
        const data = await loginUser(email, password);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
            padding={{ base: "20px" }}
            alignSelf="center"
          >
            <Image
              src="src\images\egresadosBiblioteca1.jpg"
              alt="Imagen Ucabista"
              width="100%"
              height="auto"
            />
          </Box>

          <Box
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
                  INICIAR SESIÓN
                </Text>
                <Text
                  fontSize="xl"
                  textAlign="start"
                  alignSelf="start"
                  as="b"
                  paddingBottom="10px"
                  paddingTop="10px"
                >
                  Correo UCAB
                </Text>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Ingrese su correo UCAB"
                  marginBottom="10px"
                />
                <FormErrorMessage>
                  {isEmailValid ? "" : "El correo debe ser un correo UCAB"}
                </FormErrorMessage>
              </FormControl>
              <Text
                fontSize="xl"
                as="b"
                alignSelf="start"
                paddingBottom="10px"
                paddingTop="10px"
              >
                Contraseña
              </Text>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "::-ms-reveal": {
                      display: "none",
                    },
                  }}
                />
                <InputRightElement width={{ sm: "10%", md: "10%" }}>
                  <Button h="1.75 rem" size="sm" onClick={handleClick}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box textAlign="center">
                <Button
                  backgroundColor="#007935"
                  color="white"
                  _hover={{ bg: "#025024" }}
                  width={{ base: "100%", sm: "60%", md: "50%" }}
                  marginTop="20px"
                  paddingTop="10px"
                  paddingBottom="10px"
                  type="submit"
                >
                  Iniciar sesión
                </Button>
              </Box>
            </form>
            <Text paddingTop="10px" textAlign="center">
              ¿Aún no tienes cuenta?
              <Link
                to="/register"
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
  );
}

export default Login;
