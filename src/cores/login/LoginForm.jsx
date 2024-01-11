import React from "react";
import {
  Box,
  Text,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const LoginForm = ({
  isLarger1010,
  handleSubmit,
  isEmailValid,
  email,
  handleEmailChange,
  show,
  setPassword,
  handleClick,
  isLoading,
}) => {
  return (
    <Box
    paddingX={{ base: "20px", md: "40px" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={!isEmailValid}>
          <Box display="flex" flexDirection="column">
            <Text
              fontSize={["xl", "xl", "2xl", "3xl"]}
              textAlign="center"
              color="white"
              as="b"
            >
              INICIAR SESIÓN
            </Text>
            <Text
              fontSize={["md", "md", "md", "lg"]}
              textAlign="center"
              color="white"
              paddingBottom="10px"
            >
              Inicie sesión para continuar a UAlumni
            </Text>
            <Box
              height="2px"
              width="100%"
              backgroundColor="white"
              marginBottom="30px"
            />
          </Box>
          <Text
            fontSize={["md", "md", "md", "lg"]}
            textAlign="start"
            alignSelf="start"
            color="white"
            as="b"
            paddingBottom="10px"
          >
            Correo UCAB
          </Text>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingrese su correo UCAB"
            fontSize={isLarger1010 ? "md" : "12px"}
            marginBottom="15px"
            variant="unstyled"
            backgroundColor="white"
            border="1px solid #ccc"
            h="40px"
            paddingLeft="20px"
          />
        </FormControl>
        <Text
          fontSize={["md", "md", "md", "lg"]}
          as="b"
          alignSelf="start"
          paddingBottom="10px"
          color="white"
        >
          Contraseña
        </Text>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Ingrese su contraseña"
            fontSize={isLarger1010 ? "md" : "12px"}
            variant="unstyled"
            backgroundColor="white"
            border="1px solid #ccc"
            h="40px"
            paddingLeft="20px"
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "::-ms-reveal": {
                display: "none",
              },
            }}
          />
          <InputRightElement
            width={{ sm: "10%", md: "10%" }}
            paddingRight="12px"
          >
            <Button h="1.75 rem" size="sm" onClick={handleClick}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box textAlign="center">
          <Button
            backgroundColor="white"
            _hover={{ bg: "#025024", color: "white" }}
            width={{ base: "100%", sm: "60%", md: "54%" }}
            marginTop="40px"
            paddingTop="10px"
            paddingBottom="10px"
            type="submit"
            color="#007935"
            fontSize={isLarger1010 ? "md" : "14px"}
            isLoading={isLoading}
            loadingText="Iniciando Sesión..."
          >
            Iniciar sesión
          </Button>
        </Box>
      </form>
      <Text
        paddingTop="20px"
        textAlign="center"
        color="white"
        fontSize={["sm", "sm", "md", "md"]}
      >
        ¿Aún no tienes cuenta?
        <Link
          to="/register"
          style={{
            textDecoration: "underline",
            textDecorationColor: "green",
            display: "inline",
            justifyContent: "center",
            marginLeft: "5px",
            fontWeight: "bold",
          }}
        >
          Regístrate
        </Link>
      </Text>
    </Box>
  );
};

export default LoginForm;
