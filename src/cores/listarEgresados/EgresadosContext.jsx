import { createContext, useContext, useState, useEffect } from "react";

const EgresadosContext = createContext();

export const EgresadosProvider = ({ children }) => {
  const [egresados, setEgresados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPaginatedData = async (page = currentPage,filters= {}) => {
    
    // Incluye la página actual en los parámetros de consulta
    filters.page = page;
    filters.pageSize = 4;
    
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:3000/alumni/resume?${queryParams}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        console.log("JAMAICA",data);
        setEgresados(data.data.items);
        setTotalPages(data.data.meta.numberOfPages);
        setCurrentPage(data.data.meta.pageNumber);
      } catch (error) {
        console.error("Error al obtener datos paginados:", error);
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchPaginatedData(currentPage);
  }, [currentPage]);

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
        updateEgresadosData, // Agregando la función de actualización al contexto
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
