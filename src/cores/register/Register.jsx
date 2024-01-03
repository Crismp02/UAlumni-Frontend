import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import {
  Image,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { registerUser } from "../../services/auth/Auth.services";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

function Register() {
  const [isLarger920] = useMediaQuery("(min-width: 920px)");
  const [isLarger1010] = useMediaQuery("(min-width: 1010px)");
  const navigate = useNavigate();

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
        if (data){
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
              src="src\images\loginImage.jpg"
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
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Register;
