import  { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import FiltrarNombre from "../../components/Filtros/FiltrarNombre";
import FiltrarSkills from "../../components/Filtros/FiltrarSkills";
import FiltrarPositions from "../../components/Filtros/FiltrarPositions";
import FiltrosButtons from "../../components/Filtros/FiltrosButtons";
import { useOfertas } from './OfertasContext';
import PropTypes from "prop-types";



function FiltrosOfertasMenu({ setHasSearched }) {

  const { fetchPaginatedData} = useOfertas();

  const [semilla, ] = useState(0);
  const [, setIsLoading] = useState(false);

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

    //Constantes del Drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const placement = "left";

  //Busqueda por nombre
  const [valueName, setValueName] = useState("");
  const handleChangeName = (event) => setValueName(event.target.value);


  //Busqueda por habilidades categoria
  const [categoria, setCategoria] = useState("");
  const [habilidad, setHabilidad] = useState("");
  const [list, setList] = useState([]);

  // Objeto inicial de habilidades
  const [habilidades, setHabilidades] = useState({});

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {

    async function fetchCategorias() {

      try {
        const response = await fetch("http://localhost:3000/skill-category");
        if (!response.ok) {
          throw new Error("Error al obtener los egresados");
        }
        const data = await response.json();
        if (Array.isArray(data.data.items)) {
          const categoriasObtenidas = data.data.items.map((item) => item.name);
          setCategorias(categoriasObtenidas);
        }
      } catch (error) {
        console.error("Error:", error);
      }

    }

    fetchCategorias();
  }, []);

  const [, setCarreras] = useState([]);

  useEffect(() => {

    async function fetchCarreras() {

      try {
        const response = await fetch("http://localhost:3000/career");
        if (!response.ok) {
          throw new Error("Error al obtener los egresados");
        }
        const data = await response.json();
        if (Array.isArray(data.data.items)) {
          const carrerasObtenidas = data.data.items.map((item) => item.name);
          setCarreras(carrerasObtenidas);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchCarreras();
  }, []);

  const handleHabilidadChange = (e) => {
    setHabilidad(e.target.value);
    if (
      e.target.value !== "" &&
      !list.some((item) => item.habilidad === e.target.value)
    ) {
      setList([...list, { categoria, habilidad: e.target.value }]);
    }
  };

  // Estado de habilitación para el botón de categorías
  const [isCatButtonDisabled, setIsCatButtonDisabled] = useState(true);

  // Actualizar el estado de habilitación cuando cambia la categoría
  useEffect(() => {
    setIsCatButtonDisabled(!categoria);
  }, [categoria]);

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


  //Búsqueda por posición de interés

  const [valuePos, setValuePos] = useState("");
  const [listPos, setListPos] = useState([]);

  const handleChangePos = (event) => setValuePos(event.target.value);
  const handleAddPos = () => {
    if (valuePos.trim() !== "") {
      setListPos((oldList) => [...oldList, valuePos]);
      setValuePos("");
    }
  };

  const [isPosButtonDisabled, setIsPosButtonDisabled] = useState(true);

  // Actualizar el estado de habilitación cuando cambia el valor de pos
  
  useEffect(() => {
      setIsPosButtonDisabled(!valuePos);
    }, [valuePos]);
  const handleRemovePos = (indexToRemove) => {
    setListPos((oldList) =>
      oldList.filter((_, index) => index !== indexToRemove)
    );
  };


  //Búsqueda por carrera

  const [selectedTags, setSelectedTags] = useState({});

  const isDisabled =
    !valueName &&
    list.length === 0 &&
    listPos.length === 0 &&
    !selectedCarrera &&
    Object.keys(selectedTags).every((tag) => !selectedTags[tag]);

  // const [egresados, setEgresados] = useState([]);

  const handleSubmit = async () => {
    if (isDisabled) {
      return;
    }


    const selectedSkills = list.map(
      (item) => `${item.categoria}:${item.habilidad}`
    );
    const selectedCategories = list.map((item) => item.categoria);
    const selectedPositions = listPos.length > 0 ? listPos : [];

    const params = new URLSearchParams();

    if (semilla) {
      params.append('seed', semilla);
    }

    if (valueName) {
      params.append('company', valueName);
    }

    if (selectedCategories.length > 0) {
      selectedCategories.forEach((category) => params.append('categories', category));
    }
  
    if (selectedSkills.length > 0) {
      selectedSkills.forEach((skill) => params.append('skills', skill));
    }
  
    if (selectedPositions.length > 0) {
      selectedPositions.forEach((position) => params.append('positions', position));
    }
  
    const queryString = params.toString();

 
    try {
      await fetchPaginatedData(queryString, 1);
    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
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
          position: "absolute", 
          top: "60px", 
          left: "10px", 
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
              placeholderName="Buscar a su empresa por nombre"
            />

            {/*Busqueda por habilidad*/}
            <FiltrarSkills
              list={list}
              categoria={categoria}
              setCategoria={setCategoria}
              setCategorias={setCategorias}
              habilidad={habilidad}
              habilidades={habilidades}
              setHabilidades={setHabilidades}
              handleAddCategoria={handleAddCategoria}
              handleHabilidadChange={handleHabilidadChange}
              handleRemoveHabilidad={handleRemoveHabilidad}
              categorias={categorias}
              isDisabled={isCatButtonDisabled}
            />

            {/*Busqueda por posiciones de interes*/}
            <FiltrarPositions
              valuePos={valuePos}
              handleChangePos={handleChangePos}
              handleAddPos={handleAddPos}
              listPos={listPos}
              handleRemovePos={handleRemovePos}
              isDisabled={isPosButtonDisabled}
            />
        
            {/*Botones de búsqueda y reset*/}
            <FiltrosButtons
              handleReset={handleReset}
              handleSubmit={handleSubmit}
              isDisabled={isDisabled}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
              onClose={onClose}
              setHasSearched={setHasSearched}
            />
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

FiltrosOfertasMenu.propTypes = {
  setHasSearched: PropTypes.func.isRequired,
};

export default FiltrosOfertasMenu;
