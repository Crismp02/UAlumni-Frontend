import React from 'react';
import { Flex, Box, Text } from "@chakra-ui/react"

function NavBarReclutador(){
    return (
        <Flex as="nav" bg={"#007935"} color="white" align="center" justify="space-between" padding="1rem">
        <Box>
          <Text fontSize="lg" fontWeight="bold">Logo</Text>
        </Box>
        <Flex>
          <Box marginLeft="2rem">
            <Text fontSize="md" as='b'>FAQ</Text>
          </Box>
        </Flex>
      </Flex>
    );
}
export default NavBarReclutador;