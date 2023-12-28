import React from "react";
import { Input, Text, useMediaQuery } from "@chakra-ui/react";

function FiltrarNombre({ valueName, handleChangeName }){
    const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
    return(
        <div>
             <Text marginBottom="10px" marginTop="10px">
              Nombre:
            </Text>
            {isLargerThan435 ? (
              <div>
                <Input
                  value={valueName}
                  onChange={handleChangeName}
                  placeholder="Buscar a su empresa por nombre"
                  size="md"
                  marginBottom="30px"
                />
              </div>
            ) : (
              <div>
                {" "}
                <Input
                  value={valueName}
                  onChange={handleChangeName}
                  placeholder="Buscar a su empresa por nombre"
                  size="sm"
                  fontSize="10px"
                  marginBottom="30px"
                />
              </div>
            )}
        </div>
    )
}
export default FiltrarNombre;