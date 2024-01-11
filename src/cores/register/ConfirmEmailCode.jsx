import NavBar from "../../components/Navbar";
import { useSearchParams } from "react-router-dom";
import {
  PinInput,
  PinInputField,
  Box,
  HStack,
  useMediaQuery,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { confirmEmail } from "../../services/auth/Auth.services";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginImage from "../../images/loginImage.jpg";

function ConfirmEmailCode() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [isLarger920] = useMediaQuery("(min-width: 920px)");
  const toast = useToast();

  const handleSubmit = async (value) => {
    try {
      const data = await confirmEmail(email, value);
      if (data) {
        navigate("/login");
      }
    } catch (error) {
      if (Number(error.message) === 400){
        toast({
          title: "Error",
          description: "El código ingresado es incorrecto",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return; 
      }
      toast({
        title: "Error",
        description: "Ha ocurrido un error",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      navigate("/register");
    }
  };

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
            <Text
              fontSize={["xl", "xl", "2xl", "3xl"]}
              textAlign="center"
              color="white"
              as="b"
            >
              CONFIRMAR CORREO
            </Text>
            <Text
              fontSize={["sm", "sm", "md", "lg"]}
              textAlign="center"
              color="white"
              paddingBottom="10px"
            >
              Ingrese el código de confirmación que le fue enviado a su correo
            </Text>
            <Box
              height="2px"
              width="100%"
              backgroundColor="white"
              marginBottom="30px"
            />
            <HStack marginBottom="20px">
              <PinInput
                otp
                onComplete={handleSubmit}
                variant="filled"
                size={["sm", "sm", "md", "lg"]}
              >
                <PinInputField
                  backgroundColor="white"
                  _focus={{ backgroundColor: "white" }}
                />
                <PinInputField
                  backgroundColor="white"
                  _focus={{ backgroundColor: "white" }}
                />
                <PinInputField
                  backgroundColor="white"
                  _focus={{ backgroundColor: "white" }}
                />
                <PinInputField
                  backgroundColor="white"
                  _focus={{ backgroundColor: "white" }}
                />
              </PinInput>
            </HStack>
            <Link to="/register">
            <Text color="white" as="u">Volver al registro</Text>
          </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ConfirmEmailCode;
