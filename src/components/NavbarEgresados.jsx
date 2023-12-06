import React from 'react';
import { Flex, Box, Text, useMediaQuery} from "@chakra-ui/react"

function NavBarEgresados(){
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
    return (
        <Flex as="nav" bg={"#007935"} color="white" align="center" justify="space-between" padding="1rem">
        <Box>
          <Text fontSize="lg" fontWeight="bold">Logo</Text>
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
          <Box marginLeft="2rem">
            <Text fontSize="md" as='b'>Logout</Text>
          </Box>
        </Flex> : <Flex>
        <Box marginLeft="2rem">
            <Text fontSize="12px" as='b'>PERFIL</Text>
          </Box>
          <Box marginLeft="2rem">
            <Text fontSize="12px" as='b'>OFERTAS</Text>
          </Box>
          <Box marginLeft="1rem">
            <Text fontSize="12px" as='b'>FAQ</Text>
          </Box>
          <Box marginLeft='1rem'>
            <Text fontSize="12px" as='b'>Logout</Text>
          </Box>
        </Flex> }
        
      </Flex>
    );
}
export default NavBarEgresados;