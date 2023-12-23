import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Input,
  Text,
  List,
  ListItem,
  Box,
  Select,
  Tag,
  TagLabel,
  Stack,
  Flex,
  IconButton,
  useMediaQuery,
  Tooltip,
  Checkbox,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import FiltrarNombre from "./FiltrarNombre";
import FiltrarSkills from "./FiltrarSkills";
import FiltrarPositions from "./FiltrarPositions";
import FiltrosButtons from "./FiltrosButtons";

function FiltrosOfertas() {
  const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
  const [isHovering, setIsHovering] = useState(false);


  {
    /*Const del Drawer*/
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const placement = "left";

  {
    /*Busqueda por nombre*/
  }
  const [valueName, setValueName] = useState("");
  const handleChangeName = (event) => setValueName(event.target.value);

  {
    /*Busqueda por habilidades categoria*/
  }

  const [categoria, setCategoria] = useState("");
  const [habilidad, setHabilidad] = useState("");
  const [list, setList] = useState([]); 

  const habilidades = {
    frontend: ["React", "Vue", "Angular"],
    backend: ["Node.js", "Python", "Ruby"],
    diseño: ["Photoshop", "Illustrator", "Figma"],
  };
  const handleHabilidadChange = (e) => {
    setHabilidad(e.target.value);
    if (
      e.target.value !== "" &&
      !list.some((item) => item.habilidad === e.target.value)
    ) {
      setList([...list, { categoria, habilidad: e.target.value }]);
    }
  };

  const handleAddCategoria = () => {
    if (
      categoria !== "" &&
      !list.some((item) => item.categoria === categoria)
    ) {
      setList((oldList) => [...oldList, { categoria, habilidad: "" }]);
      setCategoria("");
    }
  };
  const handleRemoveHabilidad = (index) => {
    setList(list.filter((_, i) => i !== index));
  };


  {
    /*Busqueda por posición de interés*/
  }
  const [valuePos, setValuePos] = useState("");
  const [listPos, setListPos] = useState([]);
  const handleChangePos = (event) => setValuePos(event.target.value);
  const handleAddPos = () => {
    setListPos((oldList) => [...oldList, valuePos]);
    setValuePos("");
  };
  const handleRemovePos = (indexToRemove) => {
    setListPos((oldList) =>
      oldList.filter((_, index) => index !== indexToRemove)
    );
  };

  {
    /*Busqueda por categoría*/
  }
  const [selectedOption, setSelectedOption] = useState('');

  const handleChangeCategory = (event) => {
    setSelectedOption(event.target.value);
  };
  {
    /*Botones de búsqueda y reset*/
  }
  const [exactMatch, setExactMatch] = useState(false);

  const handleCheckboxChange = (e) => setExactMatch(e.target.checked);

  const isDisabled =
    !valueName &&
    list.length === 0 &&
    listPos.length === 0 &&
    !selectedOption;

  const handleSubmit = () => {
    if (isDisabled) {
      return;
    }

    const data = {
      name: valueName,
      skills: list,
      positionsOfInterest: listPos,
      exactMatch,
      category: selectedOption,

    };
    console.log(data);
  };

  const handleReset = () => {
    setValueName("");
    setList([]);
    setCategoria("");
    setHabilidad("");
    setValuePos("");
    setListPos([]);
    setSelectedOption("");
  };

  return (
    <>
      <Button
        backgroundColor="#37B4E3"
        _hover={{ bg: "#247390" }}
        onClick={onOpen}
        style={{
          borderRadius: "30px",
          marginLeft: "10px",
          width: "40px",
          height: "40px",
        }}
        marginBottom="5px"
      >
        <HamburgerIcon color="white" />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent paddingLeft="5px" paddingRight="5px">
          <DrawerHeader borderBottomWidth="1px">
            Filtros
            <IconButton icon={<CloseIcon />} onClick={onClose} float="right" />
          </DrawerHeader>

          <DrawerBody>
            {/*Busqueda por nombre*/}
            <FiltrarNombre
              valueName={valueName}
              handleChangeName={handleChangeName}
            />

            {/*Busqueda por habilidad*/}
            <FiltrarSkills
              list={list}
              categoria={categoria}
              setCategoria={setCategoria}
              habilidad={habilidad}
              habilidades={habilidades}
              handleAddCategoria={handleAddCategoria}
              handleHabilidadChange={handleHabilidadChange}
              handleRemoveHabilidad={handleRemoveHabilidad}
            />

            {/*Busqueda por posiciones de interes*/}
            <FiltrarPositions
              valuePos={valuePos}
              handleChangePos={handleChangePos}
              handleAddPos={handleAddPos}
              listPos={listPos}
              handleRemovePos={handleRemovePos}
            />

            {/*Busqueda por categorías:*/}
            <Text marginBottom="10px">Categorías:</Text>
            <Select
              placeholder="Seleccione una categoría"
              fontSize={["12px", "sm"]}
              value={selectedOption}
              onChange={handleChangeCategory}
            >
              <option value="Contratos temporales">Contratos temporales</option>
              <option value="Contratos fijos">Contratos fijos</option>
              <option value="Contratos indefinidos">
                Contratos indefinidos
              </option>
            </Select>

            {/*Filtros exactos:*/}
            <Checkbox
              marginBottom="10px"
              marginTop="30px"
              isChecked={exactMatch}
              as="b"
              onChange={handleCheckboxChange}
            >
              Filtrar por coincidencia exacta
            </Checkbox>

            {/*Botones de búsqueda y reset*/}
            <FiltrosButtons
              handleReset={handleReset}
              handleSubmit={handleSubmit}
              isDisabled={isDisabled}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FiltrosOfertas;
