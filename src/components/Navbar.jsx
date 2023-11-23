import React from 'react';
import { Flex, Box, Grid, Text, ChakraProvider } from "@chakra-ui/react"

function NavBar(){
    return (
        <Flex as="nav" bg={"#007935"} color="white" align="center" justify="space-between" padding="1rem">
        <Box>
          <Text fontSize="lg" fontWeight="bold">Logo</Text>
        </Box>
        <Flex>
          <Box marginLeft="2rem">
            <Text fontSize="md" as='b'>EGRESADO</Text>
          </Box>
          <Box marginLeft="2rem">
            <Text fontSize="md" as='b'>RECLUTADOR</Text>
          </Box>
        </Flex>
      </Flex>
    );
}
export default NavBar;