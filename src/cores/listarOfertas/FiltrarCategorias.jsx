import React from "react";
import { Select, Text } from "@chakra-ui/react";

function FiltrarCategorias({ selectedOption, handleChangeCategory}) {
  return (
    <>
      <Text marginBottom="10px">Categorías:</Text>
      <Select
        placeholder="Seleccione una categoría"
        value={selectedOption}
        onChange={handleChangeCategory}
      >
        <option value="Contratos temporales">Contratos temporales</option>
        <option value="Contratos fijos">Contratos fijos</option>
        <option value="Contratos indefinidos">Contratos indefinidos</option>
      </Select>
    </>
  );
}
export default FiltrarCategorias;
