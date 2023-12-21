import React from 'react';
import { Flex, Box, Text, useMediaQuery, Image, Icon} from "@chakra-ui/react"
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import Logo2 from "../images/logo2.png";
import { logoutUser } from '../services/auth/Auth.services';
import { IoIosLogOut } from "react-icons/io";

function NavBarEgresados(){
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
    return (
        <Flex as="nav" bg={"#007935"} color="white" align="center" justify="space-between" padding="1rem">
        <Box padding="0px">
        {isLargerThan400 ? (
          <Image src={Logo2} alt="Logo" height= "30px" />
        ) : (
          <Image src={Logo} alt="Logo" height="25px" />
        )}
      </Box>
        {isLargerThan700 ? <Flex>
          <Box marginLeft="2rem">
            <Text fontSize="md" as='b'>PERFIL</Text>
          </Box>
          <Box marginLeft="2rem">
            <Text fontSize="md" as='b'>OFERTAS</Text>
          </Box>
          <Box marginLeft="2rem">
            <Text fontSize="md" as='b'>FAQ</Text>
          </Box>
          <Link to="/">
          <Box marginLeft="2rem">
            <Icon as={IoIosLogOut} boxSize="24px" onClick={logoutUser}/>
          </Box>
          </Link>
        </Flex> : <Flex>
        <Box marginLeft="1rem">
            <Text fontSize="10px" as='b'>PERFIL</Text>
          </Box>
          <Box marginLeft="1rem">
            <Text fontSize="10px" as='b'>OFERTAS</Text>
          </Box>
          <Box marginLeft="1rem">
            <Text fontSize="10px" as='b'>FAQ</Text>
          </Box>
          <Link to="/">
          <Box marginLeft='1rem'>
          <Icon as={IoIosLogOut} boxSize="18px" onClick={logoutUser}/>
          </Box>
          </Link>
        </Flex> }
        
      </Flex>
    );
}
export default NavBarEgresados;