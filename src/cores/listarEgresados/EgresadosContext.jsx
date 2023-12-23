import React, { createContext, useContext, useState, useEffect } from 'react';

const EgresadosContext = createContext();

export const EgresadosProvider = ({ children }) => {
  const [egresados, setEgresados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5; // Cantidad de egresados por página
  const totalItems = 25; // Total de egresados

  useEffect(() => {
    const totalPageCount = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPageCount);
    fetchPaginatedData(currentPage);
  }, [currentPage, totalItems]);

  const fetchPaginatedData = async (page) => {
    setIsLoading(true);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Simulación de datos ficticios
    const mockEgresados = Array.from({ length: totalItems }, (_, index) => ({
      email: `egresado${index + 1}@example.com`,
      names: `Nombre${index + 1}`,
      surnames: `Apellido${index + 1}`,
      graduations: [
        {
          careerName: `Carrera ${Math.floor(Math.random() * 5) + 1}`,
          graduationDate: '1970-01-01T00:00:00.000Z',
        },
      ],
    }));

    const paginatedData = mockEgresados.slice(startIndex, endIndex);
    setEgresados(paginatedData);
    setIsLoading(false);
  };

  return (
    <EgresadosContext.Provider
      value={{
        egresados,
        currentPage,
        setCurrentPage,
        totalPages,
        fetchPaginatedData,
        isLoading,
      }}
    >
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
