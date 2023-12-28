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
import FiltrarNombre from "./FiltrarNombre";
import FiltrarSkills from "./FiltrarSkills";
import FiltrarPositions from "./FiltrarPositions";
import FiltrarIndustrias from "../listarEgresados/FiltrarIndustrias";
import FiltrosButtons from "./FiltrosButtons";
import { useOfertas } from './OfertasContext';
import PropTypes from "prop-types";



function FiltrosOfertasMenu({ setHasSearched }) {
  const {
    fetchPaginatedData,
    isLoading,
    setCurrentPage,
    totalPages,
  } = useOfertas();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [currentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [ofertas] = useState([]);
  const [, setIsLoading] = useState(false);
  const [randomizationSeed, setRandomizationSeed] = useState(null);
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
  // const [exactMatch, setExactMatch] = useState(false);

  // const handleCheckboxChange = (e) => setExactMatch(e.target.checked);
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
      ? [
          selectedCarrera,
          ...selectedCareers,
        ]
      : selectedCareers;

    const selectedSkills = list.map(
      (item) => `${item.categoria}:${item.habilidad}`
    );
    const selectedCategories = list.map((item) => item.categoria);
    const selectedPositions = listPos.length > 0 ? listPos : [];
    const selectIndustries= listInd.length > 0 ? listInd: [];

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
          industries:
          selectIndustries.length > 0
            ? selectIndustries.join("&industries=")
            : undefined,
          seed: randomizationSeed ? randomizationSeed : undefined,

    };

    const newFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== undefined)
    );
    try {
      await fetchPaginatedData(newFilters, 1);
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
