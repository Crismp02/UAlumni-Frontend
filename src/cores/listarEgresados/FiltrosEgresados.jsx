
import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FiltrarCarreras from "./FiltrarCarreras";
import FiltrarNombre from "./FiltrarNombre";
import FiltrarPositions from "./FiltrarPositions";
import FiltrarIndustrias from "./FiltrarIndustrias";
import FiltrarSkills from "./FiltrarSkills";
import FiltrosButtons from "./FiltrosButtons";
import { useEgresados } from "./EgresadosContext";
import PropTypes from "prop-types";

function FiltrosEgresados({ setHasSearched }) {
  const {
    fetchPaginatedData,
  } = useEgresados();
  const [randomizationSeed,] = useState(null);
  const [, setIsLoading] = useState(false);
  // Estado para la semilla
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const carreraFromUrl = params.get("carrera");
  // Estado para la carrera seleccionada
  const [selectedCarrera, setSelectedCarrera] = useState(carreraFromUrl);
  // Actualiza la carrera seleccionada cuando cambia la URL
  useEffect(() => {
    setSelectedCarrera(carreraFromUrl);
  }, [carreraFromUrl]);

  
  const { onClose } = useDisclosure();
  const [valueName, setValueName] = useState("");
  const handleChangeName = (event) => setValueName(event.target.value);

  {
    /*Busqueda por habilidades*/
  }
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

  const [carreras, setCarreras] = useState([]);

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
    /*Busqueda por industria de interés*/
  }
  const [valueInd, setValueInd] = useState("");
  const [listInd, setListInd] = useState([]);
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

  {
    /*Botones de búsqueda y reset*/
  }
  const isDisabled =
    !valueName &&
    list.length === 0 &&
    listPos.length === 0 &&
    listInd.length === 0 && 
    !selectedCarrera &&
    Object.keys(selectedTags).every((tag) => !selectedTags[tag]);

  // const [egresados, setEgresados] = useState([]);

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
  
    const selectedSkills = list.map(
      (item) => `${item.categoria}:${item.habilidad}`
    );
    const selectedCategories = list.map((item) => item.categoria);
    const selectedPositions = listPos.length > 0 ? listPos : [];
    const selectIndustries = listInd.length > 0 ? listInd : [];
  
    const params = new URLSearchParams();
  
    if (valueName) {
      params.append('name', valueName);
    }
  
    if (careerParams.length > 0) {
      careerParams.forEach((career) => params.append('careers', career));
    }
  
    if (selectedSkills.length > 0) {
      selectedSkills.forEach((skill) => params.append('skills', skill));
    }
  
    if (selectedCategories.length > 0) {
      selectedCategories.forEach((category) => params.append('categories', category));
    }
  
    if (selectedPositions.length > 0) {
      selectedPositions.forEach((position) => params.append('positions', position));
    }
  
    if (selectIndustries.length > 0) {
      selectIndustries.forEach((industry) => params.append('industries', industry));
    }
  
    if (randomizationSeed) {
      params.append('seed', randomizationSeed);
    }
  
    const queryString = params.toString();
  
    try {
      await fetchPaginatedData(queryString, 1); // Envía la página actual como 1
    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Funciones para manejar la paginación
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
      <Box
      marginLeft="50px">
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
            />

            {/*Busqueda por posiciones de interes*/}
            <FiltrarPositions
              valuePos={valuePos}
              handleChangePos={handleChangePos}
              handleAddPos={handleAddPos}
              listPos={listPos}
              handleRemovePos={handleRemovePos}
            />

            {/*Busqueda por industrias de interes*/}
            <FiltrarIndustrias
              valueInd={valueInd}
              handleChangeInd={handleChangeInd}
              handleAddInd={handleAddInd}
              listInd={listInd}
              handleRemoveInd={handleRemoveInd}
            />

            {/*Busqueda por carreras:*/}
            <FiltrarCarreras
              labels={carreras}
              selectedCarrera={selectedCarrera}
              selectedTags={selectedTags}
              handleClick={handleClick}
            />

            <FiltrosButtons
              handleReset={handleReset}
              handleSubmit={handleSubmit}
              isDisabled={isDisabled}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
              onClose={onClose}
              setHasSearched={setHasSearched}
            />      
      </Box>         
    </>
  );
}

FiltrosEgresados.propTypes = {
  setHasSearched: PropTypes.func.isRequired,
};
export default FiltrosEgresados;
