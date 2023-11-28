import {Box, Text, useMediaQuery} from '@chakra-ui/react'
function Footer() {
    const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
    const [isLargerThan400] = useMediaQuery("(min-width: 400px)");
    return (
      <div
        style={{
          backgroundColor: "#787878",
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: isLargerThan400 ? "row": "column",
        }}
      >
        <Box width={isLargerThan400 ? "50%": "100%"} height="auto" padding="10px" paddingLeft="20px">
          {isLargerThan700 ? (<><Text
              fontSize="sm"
              as="b"
              color="white"
            >
              CONTACTOS
            </Text>
            <Text
              fontSize="13px"
              paddingTop="5px"
              color="white"
            >
              <a href="mailto:correo@gmail.com">CORREO@GMAIL.COM</a>
            </Text></>) : (<><Text
              fontSize="12px"
              as="b"
              color="white"
            >
              CONTACTOS
            </Text>
            <Text
              fontSize="11px"
              paddingTop="5px"
              color="white"
            >
              <a href="mailto:correo@gmail.com">CORREO@GMAIL.COM</a>
            </Text></>)}
        </Box>
        <Box width={isLargerThan400 ? "50%": "100%"} height="auto" padding="10px">
          {isLargerThan700 ? (<><Text
              fontSize="sm"
              as="b"
              color="white"
            >
              TÉRMINOS Y POLÍTICAS DE PRIVACIDAD
            </Text>
            <Text
              fontSize="13px"
              paddingTop="5px"
              color="white"
            >
              Texto
            </Text></>) : (<><Text
              fontSize="12px"
              as="b"
              color="white"
            >
              TÉRMINOS Y POLÍTICAS DE PRIVACIDAD
            </Text>
            <Text
              fontSize="12px"
              paddingTop="5px"
              color="white"
            >
              Texto
            </Text></>)}
        </Box>
        {/* 
        {isLargerThan700 ? (
          <div>
            <Text
              fontSize="md"
              textAlign="center"
              paddingTop="20px"
              color="white"
            >
              ¿TIENES ALGÚN PROBLEMA, DUDA O COMENTARIO?
            </Text>
            <Text
              fontSize="md"
              textAlign="center"
              paddingTop="5px"
              color="white"
            >
              NO DUDES EN CONTACTARNOS
            </Text>
            <Text
              fontSize="md"
              textAlign="center"
              paddingTop="10px"
              color="white"
            >
              <a href="mailto:correo@gmail.com">CORREO@GMAIL.COM</a>
            </Text>
          </div>
        ) : (
          <div>
            {" "}
            <Text
              fontSize="12px"
              textAlign="center"
              paddingTop="20px"
              color="white"
            >
              ¿TIENES ALGÚN PROBLEMA, DUDA O COMENTARIO?
            </Text>
            <Text
              fontSize="12px"
              textAlign="center"
              paddingTop="5px"
              color="white"
            >
              NO DUDES EN CONTACTARNOS
            </Text>
            <Text
              fontSize="12px"
              textAlign="center"
              paddingTop="10px"
              color="white"
            >
              <a href="mailto:correo@gmail.com">CORREO@GMAIL.COM</a>
            </Text>{" "}
          </div>
        )}*/}
      </div>
    );
}
export default Footer;