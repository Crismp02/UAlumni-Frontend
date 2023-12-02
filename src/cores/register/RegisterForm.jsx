import React from "react";
import {
  Box,
  Text,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

const RegisterForm = ({
  isLarger1010,
  isEmailValid,
  email,
  handleEmailChange,
  show,
  setPassword,
  handleClick,
  show2,
  handleClick2,
  handleSubmit,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <Box
      padding={{ base: "20px", md: "40px" }}
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
              REGÍSTRATE
            </Text>
            <Text
              fontSize={["sm", "sm", "md", "lg"]}
              textAlign="center"
              color="white"
              paddingBottom="10px"
            >
              Regístrese para empezar a usar UAlumni
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
            Nombre
          </Text>
          <Input
            id="nombre"
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            marginBottom="20px"
            variant="unstyled"
            backgroundColor="white"
            border="1px solid #ccc"
            h="40px"
            paddingLeft="20px"
            fontSize={isLarger1010 ? "md" : "12px"}
          />
          <Text
            fontSize={["md", "md", "md", "lg"]}
            textAlign="start"
            alignSelf="start"
            color="white"
            as="b"
            paddingBottom="10px"
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
            variant="unstyled"
            backgroundColor="white"
            border="1px solid #ccc"
            h="40px"
            paddingLeft="20px"
            fontSize={isLarger1010 ? "md" : "12px"}
          />
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
            id="correo"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingrese su correo UCAB"
            marginBottom="20px"
            variant="unstyled"
            backgroundColor="white"
            border="1px solid #ccc"
            h="40px"
            paddingLeft="20px"
            fontSize={isLarger1010 ? "md" : "12px"}
          />
          <FormErrorMessage>
            {isEmailValid ? "" : "El correo debe ser un correo UCAB"}
          </FormErrorMessage>
        </FormControl>
        <Text
          fontSize={["md", "md", "md", "lg"]}
          textAlign="start"
          alignSelf="start"
          color="white"
          as="b"
          paddingBottom="10px"
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
            variant="unstyled"
            backgroundColor="white"
            border="1px solid #ccc"
            h="40px"
            paddingLeft="20px"
            fontSize={isLarger1010 ? "md" : "12px"}
            sx={{
              "::-ms-reveal": {
                display: "none",
              },
            }}
            placeholder="Ingrese su contraseña"
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
        <Text
          fontSize={["md", "md", "md", "lg"]}
          textAlign="start"
          alignSelf="start"
          color="white"
          as="b"
          paddingBottom="10px"
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
            variant="unstyled"
            backgroundColor="white"
            border="1px solid #ccc"
            h="40px"
            paddingLeft="20px"
            fontSize={isLarger1010 ? "md" : "12px"}
            sx={{
              "::-ms-reveal": {
                display: "none",
              },
            }}
            placeholder="Vuelva a ingresar su contraseña"
          />
          <InputRightElement
            width={{ sm: "10%", md: "10%" }}
            paddingRight="12px"
          >
            <Button h="1.75 rem" size="sm" onClick={handleClick2}>
              {show2 ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box textAlign="center">
          <Button
            backgroundColor="white"
            _hover={{ bg: "#025024", color: "white" }}
            width={{ base: "100%", sm: "60%", md: "50%" }}
            marginTop="40px"
            paddingTop="10px"
            paddingBottom="10px"
            type="submit"
            color="#007935"
            fontSize={isLarger1010 ? "md" : "14px"}
          >
            Registrarse
          </Button>
        </Box>
      </form>
      <Text
        paddingTop="20px"
        textAlign="center"
        color="white"
        fontSize={["sm", "sm", "md", "md"]}
      >
        ¿Ya tienes cuenta?{" "}
        <Link
          to="/login"
          style={{
            textDecoration: "underline",
            textDecorationColor: "green",
            display: "inline",
            justifyContent: "center",
            marginLeft: "5px",
            fontWeight: "bold",
          }}
        >
          Inicia Sesión
        </Link>
      </Text>
    </Box>
  );
};

export default RegisterForm;
