import { Flex, Box, Text, useMediaQuery} from "@chakra-ui/react"

function NavBarReclutador(){
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
    return (
        <Flex as="nav" bg={"#007935"} color="white" align="center" justify="space-between" padding="1rem">
        <Box>
          <Text fontSize="lg" fontWeight="bold">Logo</Text>
        </Box>
        {isLargerThan700 ? <Flex>
          <Box marginLeft="2rem">
            <Text fontSize="md" as='b'>FAQ</Text>
          </Box>
        </Flex> : <Flex>
          <Box marginLeft="1rem">
            <Text fontSize="12px" as='b'>FAQ</Text>
          </Box>
        </Flex> }
        
      </Flex>
    );
}
export default NavBarReclutador;