import React from "react";
import { useState } from "react";
import NavBar from "../../components/Navbar";
import { Image, Box, useMediaQuery, useToast } from "@chakra-ui/react";
import { loginUser } from "../../services/auth/Auth.services";
import LoginForm from "./LoginForm";
import LoginImage from "../../images/loginImage.jpg"
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLarger920] = useMediaQuery("(min-width: 920px)");
  const [isLarger1010] = useMediaQuery("(min-width: 1010px)");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error al registrarse",
        description: "Todos los campos son obligatorios",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // Validate email
    const emailRegex = /^[A-Z0-9._%+-]+@est.ucab.edu.ve$/i;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);

    if (!isValid) {
      toast({
        title: "Error",
        description: "El email ingresado debe ser un correo UCAB",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    // Submit form if email is valid
    if (isValid) {
      try {
        const data = await loginUser(email, password);
        if (data) {
          // Limpiar todo el LocalStorage
          localStorage.clear();
          navigate("/profile");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
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
        padding={{ base: "20px", md: "0" }}
        backgroundColor="#F5F5F5"
      >
        <Box
          width={{ base: "100%", sm: "80%", md: "60%", lg: "60%" }}
          display="flex"
          flexDirection={isLarger920 ? "row" : "column"}
          backgroundColor="#007935"
          border="1px solid #ccc"
        >
          <Box
            width={isLarger920 ? "50%" : "100%"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={LoginImage}
              alt="Imagen Ucabista"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>

          <Box
            width={isLarger920 ? "50%" : "100%"}
            padding={{ base: "20px", md: "40px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <LoginForm
              isLarger1010={isLarger1010}
              handleSubmit={handleSubmit}
              isEmailValid={isEmailValid}
              email={email}
              handleEmailChange={handleEmailChange}
              show={show}
              setPassword={setPassword}
              handleClick={handleClick}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Login;
