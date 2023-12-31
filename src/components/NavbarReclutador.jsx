import { Flex, Box, Text, useMediaQuery, Image} from "@chakra-ui/react"
import Logo from "../images/logo.png";
import Logo2 from "../images/logo2.png";
import { Link } from "react-router-dom";

function NavBarReclutador(){
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

    return (
        <Flex as="nav" bg={"#007935"} color="white" align="center" justify="space-between" padding="1rem">
          <Link to="/">
        <Box padding="0px">
        {isLargerThan400 ? (
          <Image src={Logo2} alt="Logo" height= "30px" />
        ) : (
          <Image src={Logo} alt="Logo" height="25px" />
        )}
      </Box>
      </Link>
        {isLargerThan700 ? <Flex>
          <Link to="/PreguntasFrecuentes">
          <Box marginLeft="2rem">
            <Text fontSize="md" as='b'>FAQ</Text>
          </Box>
          </Link>
        </Flex> : <Flex>
        <Link to="/PreguntasFrecuentes">
          <Box marginLeft="1rem">
            <Text fontSize="12px" as='b'>FAQ</Text>
          </Box>
          </Link>
        </Flex> }
        
      </Flex>
    );
}
export default NavBarReclutador;