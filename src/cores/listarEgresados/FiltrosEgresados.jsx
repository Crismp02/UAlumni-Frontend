
import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FiltrarCarreras from "./FiltrarCarreras";
import FiltrarNombre from "./FiltrarNombre";
import FiltrarPositions from "./FiltrarPositions";
import FiltrarSkills from "./FiltrarSkills";
import FiltrosButtons from "./FiltrosButtons";
import { useEgresados } from "./EgresadosContext";
import PropTypes from "prop-types";

function FiltrosEgresados({ setHasSearched }) {
  const {
    fetchPaginatedData,
    isLoading,
    updateEgresadosData,
    setCurrentPage,
    totalPages,
  } = useEgresados();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [currentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [egresados] = useState([]);
  const [randomizationSeed, setRandomizationSeed] = useState(null);

  const [, setIsLoading] = useState(false);
  // Estado para la semilla
  const [seed, setSeed] = useState(0);

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

  // {
  //   /*Const del Drawer*/
  // }
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const placement = "left";

  {
    /*Busqueda por nombre*/
  }
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
  const [exactMatch, setExactMatch] = useState(false);

  const handleCheckboxChange = (e) => setExactMatch(e.target.checked);
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

    const filters = {
      name: valueName ? valueName : undefined,
      careers:
        careerParams.length > 0 ? careerParams.join("&careers=") : undefined,
      skills:
        selectedSkills.length > 0 ? selectedSkills.join("&skills=") : undefined,
      categories:
        selectedCategories.length > 0
          ? selectedCategories.join("&categories=")
          : undefined,
      positions:
        selectedPositions.length > 0
          ? selectedPositions.join("&positions=")
          : undefined,
      // Agrega la semilla a la URL para paginación
      seed: randomizationSeed ? randomizationSeed : undefined,
    };

    const newFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== undefined)
    );
    // const url = constructURL(newFilters);
    // const queryParams = new URLSearchParams(newFilters);


    try {
      await fetchPaginatedData(newFilters, 1); // Envía la página actual como 1
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

  // Maneja el cambio de la URL
  const constructURL = (filters) => {
    const baseUrl = "http://localhost:3000/alumni/resume?";
    const url = new URL(baseUrl);

    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key])) {
        filters[key].forEach((value) => {
          url.searchParams.append(key, value);
        });
      } else if (key === "page" || key === "per-page") {
        url.searchParams.set(key, filters[key]);
      } else {
        url.searchParams.append(key, filters[key]);
      }
    });

    return decodeURIComponent(url.toString());
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

            {/*Busqueda por carreras:*/}
            <FiltrarCarreras
              labels={carreras}
              selectedCarrera={selectedCarrera}
              selectedTags={selectedTags}
              handleClick={handleClick}
            />

            {/*Filtros exactos:*/}
            {/* <Checkbox
              marginBottom="10px"
              marginTop="10px"
              isChecked={exactMatch}
              as="b"
              onChange={handleCheckboxChange}
            >
              Filtrar por coincidencia exacta
            </Checkbox> */}
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
      </Box>         
    </>
  );
}

FiltrosEgresados.propTypes = {
  setHasSearched: PropTypes.func.isRequired,
};
export default FiltrosEgresados;
