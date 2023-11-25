import OfertaCard from "./OfertaCard"
import FiltrosOfertas from "./FiltrosOfertas";
import NavBar from "../../components/Navbar";
import { Text, Center, Box } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

function ListarOfertas(){
    const [isLargerThan770] = useMediaQuery("(min-width: 770px)");
    return(
        <div>
            <NavBar/>
            <Text
              fontSize={["lg", "lg", "xl", "4xl"]}
              color="black"
              textAlign="center"
              as="b"
              paddingTop={["2px", "2px", "2px", "10px"]}
              marginTop="10px"
              marginBottom="10px"
              style={{
                textDecoration: "underline",
                textDecorationColor: "green",
                display: "flex",
                justifyContent: "center",
              }}
            >
              ENCUENTRA OFERTAS DE TRABAJO
            </Text>
            <FiltrosOfertas/>
            <Center>
              <Box w={["90%", "80%", "70%", "80%",]} h={["60rem","65rem","40rem", "35rem"]} backgroundColor="#F5F5F5" marginBottom="10px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <OfertaCard/>
              <OfertaCard/>
              <OfertaCard/>
              {isLargerThan770 &&  <OfertaCard/>}
              </Box> 
            </Center>
            </div>
    );
}
export default ListarOfertas;