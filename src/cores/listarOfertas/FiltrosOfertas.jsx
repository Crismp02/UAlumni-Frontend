
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FiltrarNombre from "../../components/Filtros/FiltrarNombre";
import FiltrarPositions from "../../components/Filtros/FiltrarPositions";
import FiltrosButtons from "../../components/Filtros/FiltrosButtons";
import { useOfertas } from "./OfertasContext";
import PropTypes from "prop-types";
import FiltrarSkills from "../../components/Filtros/FiltrarSkills";
import FiltrarContratos from "./filtrarContratos";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";

function FiltrosOfertas({ setHasSearched }) {

  const{fetchPaginatedData}=useOfertas();
 const toast = useToast();
  const [semilla, ] = useState(0);
  const [, setIsLoading] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const carreraFromUrl = params.get("carrera");

  // Estado para la carrera
  const [,setSelectedCarrera] = useState(carreraFromUrl);

  // Actualiza la carrera seleccionada cuando cambia la URL
  useEffect(() => {
    setSelectedCarrera(carreraFromUrl);
  }, [carreraFromUrl]);

  const [isHovering, setIsHovering] = useState(false);
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
      // Verificar si hay filtros previamente guardados en localStorage
      const storedFilters = localStorage.getItem("storedFiltersOfertas");
  
      if (storedFilters) {
        // Parsear los filtros almacenados
        const parsedFilters = JSON.parse(storedFilters);

        // preseleccionar nombre
        if (parsedFilters.name) {
          setValueName(parsedFilters.name);
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

        //preseleccionar contratos
        if (parsedFilters.contracts && parsedFilters.contracts.length > 0) {
          setContratosSeleccionados(parsedFilters.contracts);
        }
  
        
      }
    }, []);



    useEffect(() => {

      async function fetchCategorias() {
        try {
          const response = await fetch(`${BASE_URL}/skill-category`);
          if (!response.ok) {
            throw new Error("Error al obtener las categorías");
          }
          const data = await response.json();
          if (Array.isArray(data.data.items)) {
            const categoriasObtenidas = data.data.items.map((item) => item.name);
            setCategorias(categoriasObtenidas);
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Ha ocurrido un error inesperado",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
  
      fetchCategorias();
    }, []);

    // Fetch de las carreras del Alumni
    const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    async function fetchCarreras() {
      try {
        const response = await fetch(`${BASE_URL}/alumni/me/resume`,{
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error("Error al obtener las carreras");
        }
        const data = await response.json();
        if (Array.isArray(data.data.graduations)) {
          const carrerasObtenidas = data.data.graduations.map((graduation) => graduation.careerName);
          setCarreras(carrerasObtenidas);
        }

        
      } catch (error) {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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

    //Búsqueda por tipo de contrato
    const [contrato,setContrato ] = useState("");

    // Objeto inicial de contratos seleccionados
    const [contratosSeleccionados, setContratosSeleccionados] = useState([]);

    // Objeto inicial de todos los contratos
    const [todosLosContratos, setTodosLosContratos] = useState([]);

    useEffect(() => {

      fetch(`${BASE_URL}/contract-type`,{
          method: 'GET',
          credentials: 'include',
      })
      .then((response) => {
          if (response.ok) {
              return response.json();
          }
          throw new Error("Error al obtener los contratos");
      })
      .then((data) => {
          if (Array.isArray(data.data.items)) {
              const contratosNombres = data.data.items.map((item) => item.name);
              setTodosLosContratos(contratosNombres);                                               
          }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

    const handleAddCon = () =>{
      if(contrato !== "" && !contratosSeleccionados.includes(contrato)){
        setContratosSeleccionados((oldList) => [...oldList, {contrato}]);
        setContrato("");
      }
    }

    const handleRemoveCon = (index) => {
      setContratosSeleccionados(contratosSeleccionados.filter((_, i) => i !== index));
    };

    // const handleConChange = (e) => {
    //   setContrato(e.target.value);
    // }

    const [isConButtonDisabled, setIsConButtonDisabled] = useState(true);

    // Actualizar el estado de habilitación cuando cambia el valor de con
    useEffect(() => {
        setIsConButtonDisabled(!contrato);
      }, [contrato]);

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
  
    //Botones de búsqueda y reset

   

    const handleSubmit = async () => {
     

    // Estado para las categorías seleccionadas con y sin habilidades 
    const categoriesWithSkills = list.filter(item => item.habilidad);
    const categoriesWithoutSkills = list.filter(item => !item.habilidad);

    const selectedSkills = categoriesWithSkills.map(
        (item) => `${item.categoria}:${item.habilidad}`
      );
      
    const selectedCategories = categoriesWithoutSkills.map((item) => item.categoria);
    const selectedPositions = listPos.length > 0 ? listPos : [];
    
      const params = new URLSearchParams();

      if (semilla) {
        params.append('seed', semilla);
      }
    
      if (valueName) {
        params.append('company', valueName);
      }

      if (carreras.length > 0) {
        carreras.forEach((career) => params.append('careers', career));
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

      if (contratosSeleccionados.length > 0) {
        contratosSeleccionados.forEach((contrato) => params.append('contracts', contrato.contrato));
      }
    
      const queryString = params.toString();
    
      try {
        await fetchPaginatedData(queryString, 1); // Envía la página actual como 1
      } catch (error) {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }

       // Guardar los filtros en localStorage después de realizar la búsqueda
    localStorage.setItem(
      "storedFiltersOfertas",
      JSON.stringify({
        name: valueName,
        categories: selectedCategories,
        skills: selectedSkills,
        positions: selectedPositions,
        contracts: contratosSeleccionados,
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
      setSelectedCarrera(null);
      setContratosSeleccionados([]);
    };

    return (
      <>
      <Box
      marginLeft="50px">

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

            {/*Búsqueda por tipo de contrato*/}
            <FiltrarContratos
              contrato={contrato}
              setContrato={setContrato}
              contratos={todosLosContratos}
              contratosSeleccionados={contratosSeleccionados}
              handleAddCon={handleAddCon}
              handleRemoveCon={handleRemoveCon}
              isDisabled={isConButtonDisabled}
            />

            <FiltrosButtons
              handleReset={handleReset}
              handleSubmit={handleSubmit}
              isDisabled={false}
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
