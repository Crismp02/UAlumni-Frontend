import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const OfertasContext = createContext();

export const OfertasProvider = ({ children }) => {
  const [ofertas, setOfertas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Total de Páginas
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    seed: null, // Inicializa la semilla como null
  });
  const [prevFilters, setPrevFilters] = useState({}); // Almacena los filtros previos

  // Resto del código de las funciones fetchPaginatedData y useEffect...

  const fetchPaginatedData = async (filters, page) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams(filters);
      queryParams.append("page", page);
      queryParams.append("per-page", "4");

      console.log(queryParams.toString(), "queryparams");
      const url = `http://localhost:3000/job-offers?${queryParams}`;
      const response = await fetch(url);
      console.log("url:", url);

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();
      setOfertas(data.data.items);
      // setTotalPages(data.data.meta.numberOfPages);
      // Se debe calcular el numero total de paginas
      setTotalPages(3);

      if (data.data.meta.randomizationSeed) {
        // Actualizar los filtros sin modificar los originales
        setCurrentFilters((prevFilters) => ({
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

  const updateOfertasData = (data) => {
    setOfertas(data);
  };

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
        updateOfertasData,
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
