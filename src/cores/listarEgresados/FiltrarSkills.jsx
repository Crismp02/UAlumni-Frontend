import React from "react";
import { Text, Button, List, ListItem, Select } from "@chakra-ui/react";


function FiltrarSkills({categoria, setCategoria, habilidad, habilidades, handleHabilidadChange, list, handleRemoveHabilidad}){
    return (
      <div>
       <Text marginBottom="10px">Habilidades:</Text>
            <Select placeholder="Categorías de las habilidades"
            size={["sm", "md"]}
            fontSize={["12px", "md"]}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="diseño">Diseño</option>
            </Select>
            {categoria && (
        <Select
          placeholder="Habilidad"
          size={["sm", "md"]}
            fontSize={["12px", "md"]}
          value={habilidad}
          onChange={handleHabilidadChange}
          marginTop="10px"
        >
          {habilidades[categoria].map((hab) => (
            <option key={hab} value={hab}>
              {hab}
            </option>
          ))}
        </Select>
      )}
<List mt={2}
          border="1px"
          borderColor="#E2E8F0"
          minH="70px"
          marginBottom="30px"
          padding="10px">
      {list.map((item, index) => (
        <ListItem key={index} 
        fontSize={["12px", "md"]}>
          {item.categoria}: {item.habilidad}
          <Button
            onClick={() => handleRemoveHabilidad(index)}
            mt={1}
            marginLeft="20px"
            marginBottom="8px"
            backgroundColor="#EDF2F6"
            color="black"
            size="xs"
          >
            x
          </Button>
        </ListItem>
        
      ))}
      </List>
      </div>
    );
}
export default FiltrarSkills;