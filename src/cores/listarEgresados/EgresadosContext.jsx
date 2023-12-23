import React, { createContext, useContext, useState, useEffect } from 'react';

const EgresadosContext = createContext();

export const EgresadosProvider = ({ children }) => {
  const [egresados, setEgresados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5; // Cantidad de egresados por página

  const fetchPaginatedData = async (page) => {
    setIsLoading(true);

    try {
      // Aquí haces la solicitud real al servidor para obtener los datos paginados
      const response = await fetch(`URL_DE_TU_API?page=${page}&perPage=${itemsPerPage}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }

      const data = await response.json();
      setEgresados(data.data.items); // Ajusta esta línea según la estructura de tus datos
      setCurrentPage(data.data.meta.pageNumber);
      setTotalPages(data.data.meta.numberOfPages);
    } catch (error) {
      console.error('Hubo un error al obtener los datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Aquí puedes usar useEffect u otros métodos para cargar datos al montar el componente, si es necesario

  const contextValue = {
    egresados,
    setEgresados,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchPaginatedData,
    isLoading,
  };

  return (
    <EgresadosContext.Provider value={contextValue}>
      {children}
    </EgresadosContext.Provider>
  );
};

export const useEgresados = () => {
  const context = useContext(EgresadosContext);
  if (!context) {
    throw new Error('useEgresados must be used within an EgresadosProvider');
  }
  return context;
};
