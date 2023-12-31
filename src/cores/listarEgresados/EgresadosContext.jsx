import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const EgresadosContext = createContext();

export const EgresadosProvider = ({ children }) => {
  const [egresados, setEgresados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [semilla, setSemilla] = useState(0);

  
  // Total de Páginas
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
 

  const [currentFilters, setCurrentFilters] = useState({
    seed:  semilla,
    name: [],
    careers: [], 
    skills: [],
    categories: [],
    positions: [], 
    industries: [],
  });

  const [prevFilters, setPrevFilters] = useState({
    seed:  semilla,
    name: [],
    careers: [],
    skills: [],
    categories: [],
    positions: [],
    industries: [],
  });

  const convertFiltersToQueryString = (filtersObject) => {
    const params = new URLSearchParams();
  
    for (const key in filtersObject) {
      if (Array.isArray(filtersObject[key])) {
        filtersObject[key].forEach((value) => {
          params.append(key, value);
        });
      } else {
        params.append(key, filtersObject[key]);
      }
    }
  
    return params.toString();
  };

  const updateFiltersFromQueryString = (queryString) => {
    const filters = {};
    const urlParams = new URLSearchParams(queryString);
  
    for (const [key, value] of urlParams) {
      if (!filters[key]) {
        filters[key] = [];
      }
      filters[key].push(value);
    }
  
    return filters;
  };

  


  const obtenerSemilla = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener la semilla");
    }
    const data = await response.json();
    const miSemilla = data.data.meta.randomizationSeed;
  
    return miSemilla;
  };
  
  const fetchPaginatedData = async (filters, page) => {
    try {
      setIsLoading(true);
      let queryString = '';
  
      if (typeof filters === 'object') {
        queryString = convertFiltersToQueryString(filters);
      } else {
        queryString = filters;
      }
  
      page = page ?? 1;
  
      const url = `http://localhost:3000/alumni/resume?page=${page}&per-page=4&${queryString}`;
      const miSemilla = await obtenerSemilla(url);
  
      const url2 = queryString.includes('seed=')
      ? `http://localhost:3000/alumni/resume?page=${page}&per-page=4&seed=${miSemilla}&${queryString.split('&').filter(param => !param.startsWith('seed=')).join('&')}`
      : `http://localhost:3000/alumni/resume?page=${page}&per-page=4&seed=${miSemilla}&${queryString}`;
    
      const response = await fetch(url2);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      setEgresados(data.data.items);
      setTotalPages(data.data.meta.numberOfPages);
      setSemilla(miSemilla);
      setCurrentPage(page);
  
      const newFilters = updateFiltersFromQueryString(queryString);
      // Actualiza el estado con los nuevos filtros y la semilla si está disponible
      if (data.data.meta.randomizationSeed) {
        setCurrentFilters({
          seed: miSemilla,  // Usar la semilla extraída de la primera solicitud
          ...newFilters,
        });
        setPrevFilters({
          seed: miSemilla, // Usar la semilla extraída de la primera solicitud
          ...newFilters,
        });
      }
  
      // Resto del código de la segunda solicitud y manejo de datos...
    } catch (error) {
      console.error("Error al obtener datos paginados:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  
  
  

  
  
  

  useEffect(() => {
    if (currentPage !== 1 && Object.keys(currentFilters).length > 0) {
      fetchPaginatedData(currentFilters, currentPage);
    }
    console.log(currentPage, "currentPage")
  }, [currentPage]);
  
  useEffect(() => {
    if (
      Object.keys(currentFilters).length > 0 &&
      JSON.stringify(prevFilters) !== JSON.stringify(currentFilters)
    ) {
      setPrevFilters(currentFilters);
    }
    console.log(currentPage, "currentPage")

   
  }, [currentFilters, prevFilters]);
  

  return (
    <EgresadosContext.Provider
      value={{
        egresados,
        currentPage,
        totalPages,
        fetchPaginatedData,
        setCurrentPage,
        isLoading,
        setIsLoading,
        currentFilters,
        setCurrentFilters,
      }}
    >
      {children}
    </EgresadosContext.Provider>
  );
};

export const useEgresados = () => {
  const context = useContext(EgresadosContext);
  if (!context) {
    throw new Error("useEgresados debe estar dentro del proveedor EgresadosContext");
  }
  return context;
};

//Declaracion de las props:
EgresadosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};