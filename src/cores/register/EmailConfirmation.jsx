import NavBar from "../../components/Navbar";
import { useSearchParams } from "react-router-dom";
import { Box, useMediaQuery, Image, Text } from "@chakra-ui/react";
import { confirmEmail } from "../../services/auth/Auth.services";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EmailConfirmation() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [isLarger920] = useMediaQuery("(min-width: 920px)");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    const confirmEmailCode = async () => {
      try {
        const data = await confirmEmail(email, token);
        if (data) {
          setTimeout(function () {
            navigate("/login");
          }, 5000);
        } else {
          navigate("/register");
        }
      } catch (error) {}
    };
    confirmEmailCode();
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <NavBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 62px)"
        paddingX={{ base: "20px", md: "0" }}
        backgroundColor="#F5F5F5"
      >
        <Box
          width={{ base: "100%", sm: "80%", md: "70%", lg: "70%" }}
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
            <Text
              fontSize={["xl", "xl", "2xl", "3xl"]}
              textAlign="center"
              color="white"
              as="b"
            >
              CORREO CONFIRMADO
            </Text>
            <Text
              fontSize={["sm", "sm", "md", "lg"]}
              textAlign="center"
              color="white"
              paddingBottom="10px"
            >
              Su correo ha sido confirmado exitosamente. Será redirigido al
              inicio de sesión en {countdown} segundos.
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EmailConfirmation;
