import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const EgresadosContext = createContext();

export const EgresadosProvider = ({ children }) => {
  const [egresados, setEgresados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Total de Páginas
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    seed: null, // Inicializa la semilla como null
  });
  const [prevFilters, setPrevFilters] = useState({}); // Almacena los filtros previos
  


  const fetchPaginatedData = async (filters, page) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams(filters);
      queryParams.set("page", page);
      queryParams.set("per-page", "4");
      const url = `http://localhost:3000/alumni/resume?${queryParams}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();
      setEgresados(data.data.items);
      setTotalPages(data.data.meta.numberOfPages);

      if (data.data.meta.randomizationSeed) {

        // Actualizar los filtros sin modificar los originales
        setCurrentFilters(prevFilters => ({
          ...prevFilters,
          seed: data.data.meta.randomizationSeed,
        }));

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