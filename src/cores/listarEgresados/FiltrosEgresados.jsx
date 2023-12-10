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
  Checkbox,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import FiltrarNombre from "./FiltrarNombre";
import FiltrarSkills from "./FiltrarSkills";
import FiltrarPositions from "./FiltrarPositions";
import FiltrarCarreras from "./FiltrarCarreras";
import FiltrosButtons from "./FiltrosButtons";

function FiltrosEgresados() {
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
  

  {
    /*Busqueda por habilidades*/
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
    if (valuePos.trim() !== "") {
      setListPos((oldList) => [...oldList, valuePos]);
      setValuePos("");
    }
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
  const [exactMatch, setExactMatch] = useState(false);

  const handleCheckboxChange = (e) => setExactMatch(e.target.checked);
  const isDisabled =
    !valueName &&
    list.length === 0 &&
    listPos.length === 0 &&
    !selectedCarrera &&
    Object.keys(selectedTags).every((tag) => !selectedTags[tag]);

    const handleSubmit = async () => {
      if (isDisabled) {
        return;
      }
    
      const selectedCareers = Object.keys(selectedTags)
        .filter((tag) => selectedTags[tag] && tag !== selectedCarrera)
        .map(career => removeAccentsAndSpaces(career.toUpperCase()));
    
      const careerParams = [];
    
      if (selectedCarrera) {
        careerParams.push(removeAccentsAndSpaces(selectedCarrera.toUpperCase()));
      }
    
      if (selectedCareers.length > 0) {
        careerParams.push(...selectedCareers);
      }
    
      const newCarrersString = careerParams.join('&careers=');
    
      const selectedSkills = list.map((item) => `${item.categoria}:${item.habilidad}`);
      const newSkillsString = selectedSkills.join('&skills=');
    
      const selectedCategories = list.map((item) => item.categoria);
      const newCategoriesString = selectedCategories.join('&categories=');
    
      const selectedPositions = listPos.join('&positions=');
    
      const filters = {
        name: valueName,
        careers: newCarrersString,
        skills: newSkillsString,
        categories: newCategoriesString,
        positions: selectedPositions,
      };
    
      const url = constructURL(filters);
    
      try {
        const response = await fetch("http://localhost:3000/alumni/resume");
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        // Usa los datos como necesites
        console.log('Datos obtenidos:', data);
      } catch (error) {
        console.error('Hubo un error al obtener los datos:', error);
      }
    };
    

  const handleReset = () => {
    setValueName("");
    setList([]);
    setCategoria("");
    setHabilidad("");
    setValuePos("");
    setListPos([]);
    setSelectedTags({});
    setSelectedCarrera(null);
  };

  // Maneja el cambio de la URL
  const constructURL = (filters) => {
    const baseUrl = 'http://localhost:3000/alumni/resume';
    const url = new URL(baseUrl);
  
    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key])) {
        filters[key].forEach((value) => {
          url.searchParams.append(key, value);
        });
      } else if (key === 'careers') {
        url.searchParams.append(key, filters[key]);
      } else {
        url.searchParams.set(key, filters[key]);
      }
    });
  
    return decodeURIComponent(url.toString());
  };
  
  // normalizar texto de carreras
  const removeAccentsAndSpaces = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
  };
  
  const handleChangeName = (event) => {
    const newValue = event.target.value;
    setValueName(newValue);
  
    const selectedCareers = Object.keys(selectedTags)
      .filter((tag) => selectedTags[tag] && tag !== selectedCarrera)
      .map(career => removeAccentsAndSpaces(career.toUpperCase())); // Transformar nombres
  
    const careerParams = [];
  
    if (selectedCarrera) {
      careerParams.push(removeAccentsAndSpaces(selectedCarrera.toUpperCase()));
    }
  
    if (selectedCareers.length > 0) {
      careerParams.push(...selectedCareers);
    }
  
    const newCarrersString = careerParams.join('&careers=');
  
    const selectedSkills = list.map((item) => `${item.categoria}:${item.habilidad}`);
    const newSkillsString = selectedSkills.join('&skills=');
  
    const selectedCategories = list.map((item) => item.categoria);
    const newCategoriesString = selectedCategories.join('&categories=');
  
    const selectedPositions = listPos.join('&positions=');
  
    const filters = {
      name: newValue,
      careers: newCarrersString,
      skills: newSkillsString,
      categories: newCategoriesString,
      positions: selectedPositions,
    };
  
    const newUrl = constructURL(filters);
    console.log('URL:', newUrl);
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

            {/*Busqueda por carreras:*/}
            <FiltrarCarreras
              labels={labels}
              selectedCarrera={selectedCarrera}
              selectedTags={selectedTags}
              handleClick={handleClick}
            />

            {/*Filtros exactos:*/}
            <Checkbox
              marginBottom="10px"
              marginTop="10px"
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

export default FiltrosEgresados;
