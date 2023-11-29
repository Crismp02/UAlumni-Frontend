import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
  useMediaQuery,
  Tooltip,
  Input,
  Box,
  Text,
  List,
  ListItem,
  Select,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import FiltrarNombre from "./FiltrarNombre";
import FiltrarSkills from "./FiltrarSkills";
import FiltrarPositions from "./FiltrarPositions";
import FiltrarCarreras from "./FiltrarCarreras";
import FiltrosButtons from "./FiltrosButtons";

function FiltrosEgresados() {
  const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
  const [isHovering, setIsHovering] = useState(false);

  // Obtén la carrera de la URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const carreraFromUrl = params.get("carrera");

  // Estado para la carrera seleccionada
  const [selectedCarrera, setSelectedCarrera] = useState(carreraFromUrl);

  // Actualiza la carrera seleccionada cuando cambia la URL
  useEffect(() => {
    setSelectedCarrera(carreraFromUrl);
  }, [carreraFromUrl]);

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
    /*Busqueda por habilidades*/
  }
  const [value, setValue] = useState("");

  const handleChange = (event) => setValue(event.target.value);
  const handleAdd = () => {
    setList((oldList) => [...oldList, value]);
    setValue("");
  };
  const handleRemove = (indexToRemove) => {
    setList((oldList) => oldList.filter((_, index) => index !== indexToRemove));
  };
  
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
    if (e.target.value !== "" && !list.some(item => item.habilidad === e.target.value)) {
      setList([...list, { categoria, habilidad: e.target.value }]);
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
    /*Busqueda por carrera*/
  }
  const [selectedTags, setSelectedTags] = useState({});
  const handleClick = (label) => {
    if (selectedCarrera === label) {
      setSelectedCarrera(null);
    } else {
      setSelectedTags((prev) => ({ ...prev, [label]: !prev[label] }));
    }
  };
  const labels = [
    "ADMINISTRACIÓN",
    "COMUNICACIÓN SOCIAL",
    "CONTADURÍA",
    "DERECHO",
    "EDUCACIÓN",
    "INGENIERÍA CIVIL",
    "INGENIERÍA INDUSTRIAL",
    "INGENIERÍA INFORMÁTICA",
    "RELACIONES INDUSTRIALES",
  ];

  const selectedTagsToSend = Object.keys(selectedTags).filter(
    (tag) => selectedTags[tag]
  );

  const carrersToSend = selectedCarrera
    ? [selectedCarrera, ...selectedTagsToSend]
    : selectedTagsToSend;

  {
    /*Botones de búsqueda y reset*/
  }
  const isDisabled =
    !valueName &&
    list.length === 0 &&
    listPos.length === 0 &&
    !selectedCarrera &&
    Object.keys(selectedTags).every((tag) => !selectedTags[tag]);


  const handleSubmit = () => {
    if (isDisabled) {
      return;
    }

    const data = {
      name: valueName,
      skills: list,
      positionsOfInterest: listPos,
      carrers: carrersToSend,
    };
    console.log(data);
  };

  const handleReset = () => {
    setValueName("");
    setValue("");
    setList([]);
    setCategoria("");
    setHabilidad("");
    setValuePos("");
    setListPos([]);
    setSelectedTags({});
    setSelectedCarrera(null);
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
              handleHabilidadChange={handleHabilidadChange}
              handleRemoveHabilidad={handleRemoveHabilidad}
            />
             {/*Busqueda por posiciones de interes
            <Text marginBottom="10px">Habilidades:</Text>
            <Select placeholder="Categorías de las habilidades"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="diseño">Diseño</option>
            </Select>
            {categoria && (
        <Select
          placeholder="Habilidad"
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
        <ListItem key={index}>
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
      </List>*/}
      
            {/*Busqueda por posiciones de interes*/}
            <FiltrarPositions
              valuePos={valuePos}
              handleChangePos={handleChangePos}
              handleAddPos={handleAddPos}
              listPos={listPos}
              handleRemovePos={handleRemovePos}
            />
            {/*Busqueda por carreras:*/}
            <FiltrarCarreras
              labels={labels}
              selectedCarrera={selectedCarrera}
              selectedTags={selectedTags}
              handleClick={handleClick}
            />
              {/*Botones de búsqueda y reset*/}
            <FiltrosButtons
              handleReset={handleReset}
              handleSubmit={handleSubmit}
              isDisabled={isDisabled}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
              onClose={onClose}/>
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FiltrosEgresados;
