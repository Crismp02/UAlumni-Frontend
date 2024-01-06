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
import FiltrarIndustrias from "./FiltrarIndustrias";
import FiltrarCarreras from "./FiltrarCarreras";
import FiltrosButtons from "../../components/Filtros/FiltrosButtons";
import { useEgresados } from './EgresadosContext';
import PropTypes from "prop-types";
import BASE_URL from '../../config/index';




function FiltrosEgresadosMenu({ setHasSearched }) {

  const { fetchPaginatedData  } = useEgresados();

  const [semilla, ] = useState(0);
  const [, setIsLoading] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  // Obtener la carrera de la URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const carreraFromUrl = params.get("carrera");

  // Estado para la carrera seleccionada
  const [selectedCarrera, setSelectedCarrera] = useState(carreraFromUrl);

  useEffect(() => {
    // Verificar si hay filtros previamente guardados en localStorage
    const storedFilters = localStorage.getItem("storedFiltersEgresados");

    if (storedFilters) {
      // Parsear los filtros almacenados
      const parsedFilters = JSON.parse(storedFilters);

      // preseleccionar carreras
      if (parsedFilters.careerParams && parsedFilters.careerParams.length > 0) {
        parsedFilters.careerParams.forEach(
          (career) => (selectedTags[career] = true)
        );
        setSelectedTags({ ...selectedTags }); // Actualizar el estado para que se refleje en la interfaz
      }

      //preseleccionar categorías que no estén seleccionadas con su skills
      if (parsedFilters.categories && parsedFilters.categories.length > 0) {
        const newCategories = parsedFilters.categories.map((category) => ({
          categoria: category,
        }));

        setList((oldList) => {
          const existingCategories = oldList.map((item) => item.categoria);
          const categoriesToAdd = newCategories.filter(
            (category) => !existingCategories.includes(category.categoria)
          );
          return [...oldList, ...categoriesToAdd];
        });
      }

      // Preseleccionar habilidades
      if (parsedFilters.skills && parsedFilters.skills.length > 0) {
        setList((oldList) => {
          const existingSkills = oldList.map(
            (item) => `${item.categoria}:${item.habilidad}`
          );
          const newSkills = parsedFilters.skills.filter(
            (skill) => !existingSkills.includes(skill)
          );

          return [
            ...oldList,
            ...newSkills.map((skill) => {
              const [category, skillName] = skill.split(":");
              return { categoria: category, habilidad: skillName };
            }),
          ];
        });
      }

      //preseleccionar posiciones de interes
      if (parsedFilters.positions && parsedFilters.positions.length > 0) {
        setListPos(parsedFilters.positions);
      }

      // preseleccionar industrias
      if (parsedFilters.industries && parsedFilters.industries.length > 0) {
        setListInd(parsedFilters.industries);
      }

      // preseleccionar nombre
      if (parsedFilters.name) {
        setValueName(parsedFilters.name);
      }
    }
  }, []);

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
        const response = await fetch(`${BASE_URL}/skill-category`);
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

  const [carreras, setCarreras] = useState([]);

  useEffect(() => {

    async function fetchCarreras() {

      try {
        const response = await fetch(`${BASE_URL}/career`);
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

  //Búsqueda por industrias de interés

  const [valueInd, setValueInd] = useState("");
  const [listInd, setListInd] = useState([]);

  // Estados de habilitación del botón de industrias
  const [isIndButtonDisabled, setIsIndButtonDisabled] = useState(true);
  
  useEffect(() => {
      setIsIndButtonDisabled(!valueInd);
    }, [valueInd]);

  const handleChangeInd = (event) => setValueInd(event.target.value);
  const handleAddInd = () => {
    if (valueInd.trim() !== "") {
      setListInd((oldList) => [...oldList, valueInd]);
      setValueInd("");
    }
  };
  const handleRemoveInd = (indexToRemove) => {
    setListInd((oldList) =>
      oldList.filter((_, index) => index !== indexToRemove)
    );
  };

  //Búsqueda por carrera

  const [selectedTags, setSelectedTags] = useState({});
  const handleClick = (label) => {
    if (selectedCarrera === label) {
      setSelectedCarrera(null);
    } else {
      setSelectedTags((prev) => ({ ...prev, [label]: !prev[label] }));
    }
  };

  //Botones de búsqueda y reset

  const isDisabled =
    !valueName &&
    list.length === 0 &&
    listPos.length === 0 &&
    listInd.length === 0 && 
    !selectedCarrera &&
    Object.keys(selectedTags).every((tag) => !selectedTags[tag]);

  
  const handleSubmit = async () => {
    if (isDisabled) {
      return;
    }
  
    const selectedCareers = Object.keys(selectedTags)
      .filter((tag) => selectedTags[tag] && tag !== selectedCarrera)
      .map((career) => career);
  
    // quitar espacios desactivados
    const careerParams = selectedCarrera
      ? [selectedCarrera, ...selectedCareers]
      : selectedCareers;

    // Estado para las categorías seleccionadas con y sin habilidades 
    const categoriesWithSkills = list.filter(item => item.habilidad);
    const categoriesWithoutSkills = list.filter(item => !item.habilidad);
  
    const selectedSkills = categoriesWithSkills.map(
      (item) => `${item.categoria}:${item.habilidad}`
    );

    const selectedCategories = categoriesWithoutSkills.map((item) => item.categoria);
    const selectedPositions = listPos.length > 0 ? listPos : [];
    const selectIndustries = listInd.length > 0 ? listInd : [];
  
    const params = new URLSearchParams();

    if (semilla) {
      params.append('seed', semilla);
    }
  
    if (valueName) {
      params.append('name', valueName);
    }
  
    if (careerParams.length > 0) {
      careerParams.forEach((career) => params.append('careers', career));
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
  
    if (selectIndustries.length > 0) {
      selectIndustries.forEach((industry) => params.append('industries', industry));
    }
  
    
    const queryString = params.toString();
  
    try {
      await fetchPaginatedData(queryString, 1, null); // Envía la página actual como 1
    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }

     // Guardar los filtros en localStorage después de realizar la búsqueda
     localStorage.setItem(
      "storedFiltersEgresados",
      JSON.stringify({
        name: valueName,
        careerParams,
        categories: selectedCategories,
        skills: selectedSkills,
        positions: selectedPositions,
        industries: selectIndustries,
      })
    );

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
    setValueInd("");
    setListInd([]); 
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

            {/*Busqueda por industrias de interes*/}
            <FiltrarIndustrias
              valueInd={valueInd}
              handleChangeInd={handleChangeInd}
              handleAddInd={handleAddInd}
              listInd={listInd}
              handleRemoveInd={handleRemoveInd}
              isDisabled={isIndButtonDisabled}
              />

            {/*Busqueda por carreras:*/}
            <FiltrarCarreras
              labels={carreras}
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
              onClose={onClose}
              setHasSearched={setHasSearched}
            />

            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

FiltrosEgresadosMenu.propTypes = {
  setHasSearched: PropTypes.func.isRequired,
};

export default FiltrosEgresadosMenu;
