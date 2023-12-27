import OfertaCard from "./OfertaCard"
import FiltrosOfertas from "./FiltrosOfertas";
import { Text, Center, Box } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

function ListarOfertas(){
    const [isLargerThan770] = useMediaQuery("(min-width: 770px)");
    return(
        <div>
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