import { createContext, useContext, useState, useEffect } from "react";

const EgresadosContext = createContext();

export const EgresadosProvider = ({ children }) => {
  const [egresados, setEgresados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
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
      queryParams.set("per-page", "2");

      console.log("queryParams2:", queryParams.toString());

      const url = `http://localhost:3000/alumni/resume?${queryParams}`;
      const response = await fetch(url);
      console.log("url:", url)

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();
      setEgresados(data.data.items);
      console.log("SEMILLA",data.data.meta.randomizationSeed)
      setTotalPages(3);
      if (data.data.meta.randomizationSeed) {
        // Actualizar los filtros sin modificar los originales
        setCurrentFilters(prevFilters => ({
          ...prevFilters,
          seed: data.data.meta.randomizationSeed,
        }));
      }
      console.log("Datos obtenidos de la página:", page, data);
      console.log("Semillas Guardadas", currentFilters.seed)

      
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

  const updateEgresadosData = (data) => {
    setEgresados(data);
  };

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
        updateEgresadosData,
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
    throw new Error("useEgresados must be used within an EgresadosProvider");
  }
  return context;
};
