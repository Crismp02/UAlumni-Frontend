import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import {
  Image,
  Box,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import { registerUser } from "../../services/auth/Auth.services";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isLarger920] = useMediaQuery("(min-width: 920px)");
  const [isLarger1010] = useMediaQuery("(min-width: 1010px)");
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
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

    // Validate password
    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);

    if (isValid) {
      try {
        const data = await registerUser(email, password);
        if (data){
          setIsLoading(false);
          navigate(`/confirm-email-code?email=${email}`)
        }
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
          width={{ base: "100%", sm: "80%", md: "70%", lg: "80%" }}
          display="flex"
          flexDirection={isLarger920 ? "row" : "column"}
          backgroundColor="#007935"
        >
          <Box
            width={isLarger920 ? "50%" : "100%"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="src\images\loginImage.jpg"
              alt="Imagen Ucabista"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>

          <Box
            width={isLarger920 ? "50%" : "100%"}
            padding={{ base: "20px", md: "20px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <RegisterForm
              isLarger1010={isLarger1010}
              handleSubmit={handleSubmit}
              isEmailValid={isEmailValid}
              email={email}
              handleEmailChange={handleEmailChange}
              show={show}
              setPassword={setPassword}
              handleClick={handleClick}
              show2={show2}
              handleClick2={handleClick2}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Register;
