import React from "react";
import { Flex, Box, Text, useMediaQuery, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import Logo2 from "../images/logo2.png"

function NavBar() {
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");
  return (
    <Flex
      as="nav"
      bg={"#007935"}
      color="white"
      align="center"
      justify="space-between"
      padding="1rem"
    >
      <Link to="/">
      <Box padding="0px">
        {isLargerThan400 ? (
          <Image src={Logo2} alt="Logo" height={["25px", "30px"]} />
        ) : (
          <Image src={Logo} alt="Logo" height={["25px", "30px"]} />
        )}
      </Box>
      </Link>
      {isLargerThan550 ? (
        <Flex>
          <Link to="/PreguntasFrecuentes">
          <Box marginLeft="2rem">
            <Text fontSize="md" as="b">
              FAQ
            </Text>
          </Box>
          </Link>
          <Link to="/register">
            <Box marginLeft="2rem">
              <Text fontSize="md" as="b">
                EGRESADO
              </Text>
            </Box>
          </Link>
          <Link to="/listarEgresados">
          <Box marginLeft="2rem">
            <Text fontSize="md" as="b">
              RECLUTADOR
            </Text>
          </Box>
          </Link>
        </Flex>
      ) : (
        <Flex>
          <Box marginLeft="1rem">
            <Text fontSize="11px" as="b">
              FAQ
            </Text>
          </Box>
          <Link to="/register">
            <Box marginLeft="1rem">
              <Text fontSize="11px" as="b">
                EGRESADO
              </Text>
            </Box>
          </Link>
          <Box marginLeft="1rem">
            <Text fontSize="11px" as="b">
              RECLUTADOR
            </Text>
          </Box>
        </Flex>
      )}
    </Flex>
  );
}
export default NavBar;
