
import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FiltrosOfertas from "./FiltrosOfertas";
import FiltrarNombre from "./FiltrarNombre";
import FiltrarPositions from "./FiltrarPositions";
import FiltrosButtons from "./FiltrosButtons";
import { useOfertas } from "./OfertasContext";
import PropTypes from "prop-types";

function FiltrosOfertasMenu({ setHasSearched }) {
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

    