import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const OfertasContext = createContext();

export const OfertasProvider = ({ children }) => {

  const [ofertas, setOfertas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [semilla, setSemilla] = useState(0);

  // Total de Páginas
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [currentFilters, setCurrentFilters] = useState({
    seed: semilla,
    name: [],
    careers: [],
    skills: [],
    categories: [],
    positions: [],
    contracts: [],
  });

  const [prevFilters, setPrevFilters] = useState({
    seed: semilla,
    name: [],
    careers: [],
    skills: [],
    categories: [],
    positions: [],
    contracts: [],
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

  const obtenerSemilla = async(url) =>{
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener la semilla");
    }
    const data = await response.json();
    const miSemilla = data.data.meta.randomizationSeed;
  
    return miSemilla;
  }

  const fetchPaginatedData = async (filters, page) => {
    try {
      setIsLoading(true);
      let queryString ='';

      if (typeof filters == 'object'){
        queryString = convertFiltersToQueryString(filters);
      }
      else{
        queryString = filters;
      }

      page = page ?? 1;

      const url = `http://localhost:3000/job-offers?page=${page}&per-page=4&${queryString}`;
      const miSemilla = await obtenerSemilla(url);

      const url2 = queryString.includes('seed=')
        ? `http://localhost:3000/job-offers?page=${page}&per-page=4&seed=${miSemilla}&${queryString.split('&').filter(param => !param.startsWith('seed=')).join('&')}`
        : `http://localhost:3000/job-offers?page=${page}&per-page=4&seed=${miSemilla}&${queryString}`;

      const response = await fetch(url2);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      setOfertas(data.data.items);
      setTotalPages(data.data.meta.numberOfPages);
      setSemilla(miSemilla);
      setCurrentPage(page);

      const newFilters = updateFiltersFromQueryString(queryString);
      if (data.data.meta.randomizationSeed) {
        // Actualizar los filtros sin modificar los originales
        setCurrentFilters({
          seed: miSemilla,  // Usar la semilla extraída de la primera solicitud
          ...newFilters,   
        });
        setPrevFilters({
          seed: miSemilla, // Usar la semilla extraída de la primera solicitud
          ...newFilters,
        });
        
      }
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
  }, [currentPage]);
  
  useEffect(() => {
    if (
      Object.keys(currentFilters).length > 0 &&
      JSON.stringify(prevFilters) !== JSON.stringify(currentFilters)
    ) {
      setPrevFilters(currentFilters);
    }
  }, [currentFilters, prevFilters]);

  return (
    <OfertasContext.Provider
      value={{
        ofertas,
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
    </OfertasContext.Provider>
  );
};

export const useOfertas = () => {
  const context = useContext(OfertasContext);
  if (!context) {
    throw new Error(
      "useOfertas debe estar dentro del proveedor OfertasContext"
    );
  }
  return context;
};

//Declaracion de las props:
OfertasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
