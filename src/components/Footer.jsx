import {Text, useMediaQuery} from '@chakra-ui/react'
function Footer() {
    const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
    return(
        
        <div style={{
            backgroundColor:'#787878',
            width:'100%',
            height:'120px',
            display: 'flex',
            flexDirection:'column',
            
        }}>
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
            </Text>
          </div>
        )}
        </div>
    );
}
export default Footer;