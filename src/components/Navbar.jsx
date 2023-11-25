import React from 'react';
import { Flex, Box, Text, useMediaQuery } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

function NavBar(){
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
    return (
      <Flex
        as="nav"
        bg={"#007935"}
        color="white"
        align="center"
        justify="space-between"
        padding="1rem"
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Logo
          </Text>
        </Box>
        {isLargerThan550 ? (
          <Flex>
            <Flex>
            <Box marginLeft="2rem">
                <Text fontSize="md" as="b">
                  FAQ
                </Text>
              </Box>
              <Box marginLeft="2rem">
                <Text fontSize="md" as="b">
                  EGRESADO
                </Text>
              </Box>
              <Box marginLeft="2rem">
                <Link to="/listarEgresados">
                  <Text fontSize="md" as="b">
                    RECLUTADOR
                  </Text>
                </Link>
              </Box>
            </Flex>
          </Flex>
        ) : (
          <Flex>
            <Box marginLeft="1rem">
                <Text fontSize="11px" as="b">
                  FAQ
                </Text>
              </Box>
            <Box marginLeft="1rem">
              <Text fontSize="11px" as="b">
                EGRESADO
              </Text>
            </Box>
            <Box marginLeft="1rem">
              <Link to="/listarEgresados">
                <Text fontSize="11px" as="b">
                  RECLUTADOR
                </Text>
              </Link>
            </Box>
          </Flex>
        )}
      </Flex>
    );
}
export default NavBar;