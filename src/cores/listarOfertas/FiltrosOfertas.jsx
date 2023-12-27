
import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FiltrarNombre from "./FiltrarNombre";
import FiltrarPositions from "./FiltrarPositions";
import FiltrosButtons from "./FiltrosButtons";
import { useOfertas } from "./OfertasContext";
import PropTypes from "prop-types";
// import { c } from "@chakra-ui/toast/dist/toast.provider-ab09bc2e";

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
    const [carreras, setCarreras] = useState("");
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
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
  
      fetchCategorias();
    }, []);

    // Fetch de las carreras del Alumni
    useEffect(() => {
      const fetchCarrerasAlumni = async () => {
        try {
          const response = await fetch("http://localhost:3000/alumni/me/resume");
          if (!response.ok) {
            throw new Error("Error al obtener las carreras");
          }
          const data = await response.json();
          console.log("carreras obtenidas: ", data.data.items);
          
          if (Array.isArray(data.data.items)) {
            const carrerasObtenidas = data.data.items.map((item) => item.name);
            setCarreras(carrerasObtenidas);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      fetchCarrerasAlumni();
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

    const handleSubmit= async () =>{
      if (isDisabled){
        return;
      }

      const selectedSkills = list.map(
        (item) => `${item.categoria}:${item.habilidad}`
      );
      const selectedCategories = list.map((item) => item.categoria);
      const selectedPositions = listPos.length > 0 ? listPos : [];
      const selectIndustries= listInd.length > 0 ? listInd: [];

      const filters={
        company:
        selectIndustries.length > 0
          ? selectIndustries.join("&company=")
        : undefined,
        skills:
        selectedSkills.length > 0 ? selectedSkills.join("&skills=") : undefined,
        
      }
    }
}

    FiltrosOfertas.propTypes = {
        setHasSearched: PropTypes.func.isRequired,
      };
      export default FiltrosOfertas;
