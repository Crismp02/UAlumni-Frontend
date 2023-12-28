
import { useDisclosure } from "@chakra-ui/react";
import { Box, Center, Icon, Text, useMediaQuery } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FiltrarNombre from "./FiltrarNombre";
import FiltrarPositions from "./FiltrarPositions";
import FiltrosButtons from "./FiltrosButtons";
import { useOfertas } from "./OfertasContext";
import PropTypes from "prop-types";
import FiltrarSkills from "../listarEgresados/FiltrarSkills";



function FiltrosOfertas({ setHasSearched }) {
  const{fetchPaginatedData,
  }=useOfertas();
  const [randomizationSeed, ] = useState(null);
  const [, setIsLoading] = useState(false);
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

    //Busqueda por habilidades categoria
    const [categoria, setCategoria] = useState("");
    const [habilidad, setHabilidad] = useState("");
    const [list, setList] = useState([]);
  
    // Objeto inicial de habilidades
    const [habilidades, setHabilidades] = useState({});

    // Objeto inicial de categorias
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
      async function fetchCategorias() {
        try {
          const response = await fetch("http://localhost:3000/skill-category");
          if (!response.ok) {
            throw new Error("Error al obtener las categorías");
          }
          const data = await response.json();
          if (Array.isArray(data.data.items)) {
            const categoriasObtenidas = data.data.items.map((item) => item.name);
            setCategorias(categoriasObtenidas);
            console.log("categoriasObtenidas", categoriasObtenidas);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
  
      fetchCategorias();
    }, []);

    // Fetch de las carreras del Alumni
    const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    async function fetchCarreras() {
      try {
        const response = await fetch("http://localhost:3000/alumni/me/resume",{
          method: 'GET',
          credentials: 'include',
        });
        console.log(response)
        if (!response.ok) {
          throw new Error("Error al obtener las carreras");
        }
        const data = await response.json();
        console.log("datos obtenidos",data)
        console.log(data.data.graduations)
        if (Array.isArray(data.data.graduations)) {
          const carrerasObtenidas = data.data.graduations.map((graduation) => graduation.careerName);
          setCarreras(carrerasObtenidas);
          console.log("carrerasObtenidas", carrerasObtenidas);
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
  

  const [selectedTags, setSelectedTags] = useState({});
  const handleClick = (label) => {
    if (selectedCarrera === label) {
      setSelectedCarrera(null);
    } else {
      setSelectedTags((prev) => ({ ...prev, [label]: !prev[label] }));
    }
  };

    const isDisabled =
    !valueName &&
    list.length === 0 &&
    listPos.length === 0
    Object.keys(selectedTags).every((tag) => !selectedTags[tag]);

    const handleSubmit= async () =>{
      if (isDisabled){
        return;
      }

      const selectedCareers = Object.keys(selectedTags)
      .filter((tag) => selectedTags[tag] && tag !== selectedCarrera)
      .map((career) => career);

      const selectedSkills = list.map(
        (item) => `${item.categoria}:${item.habilidad}`
      );
      const selectedCategories = list.map((item) => item.categoria);
      const selectedPositions = listPos.length > 0 ? listPos : [];

      const filters={
        company: valueName ? valueName : undefined,
        careers: carreras.length > 0 ? carreras.join("&careers=") : undefined,
        skills: selectedSkills.length > 0 ? selectedSkills.join("&skills=") : undefined,
        positions: selectedPositions.length > 0 ? selectedPositions.join("&positions=") : undefined,
        
      }
      const newFilters = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== undefined)
      );
  
      try {
        await fetchPaginatedData(newFilters, 1); // Envía la página actual como 1
        console.log("se envio el filtro")
      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    const handleReset = () => {
      setValueName("");
      setList([]);
      setCategoria("");
      setHabilidad("");
      setValuePos("");
      setListPos([]);
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
    )
}


    FiltrosOfertas.propTypes = {
      setHasSearched: PropTypes.func.isRequired,
      };
      export default FiltrosOfertas;
