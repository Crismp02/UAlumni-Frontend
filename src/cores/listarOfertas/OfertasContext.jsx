import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../config";

const OfertasContext = createContext();

export const OfertasProvider = ({ children }) => {

  const [ofertas, setOfertas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [semilla, setSemilla] = useState(0);
  const [semillaPrevia, setSemillaPrevia] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

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

  const fetchPaginatedData = async (filters, page, seed) => {
    try {
      setIsLoading(true);
      setHasSearched(true);
      page = page ?? 1;

      let queryString =
        typeof filters === "object"
          ? convertFiltersToQueryString(filters)
          : filters;

      if (!seed) {
        const url = `${BASE_URL}/job-offers?page=${page}&per-page=4&${queryString}`;
        seed = await obtenerSemilla(url); // Obtener la semilla si no está presente
      }

      const seedParam = seed ? `&seed=${seed}` : '';


      const urlWithData = `${BASE_URL}/job-offers?page=${page}&per-page=4${seedParam}${queryString ? `&${queryString}` : ''}`;

      const response = await fetch(urlWithData);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();
      setOfertas(data.data.items);
      setTotalPages(data.data.meta.numberOfPages);
      setSemilla(seed);
      setCurrentPage(page);
      const newFilters = updateFiltersFromQueryString(queryString);
      // Actualiza el estado con los nuevos filtros y la semilla si está disponible
      if (data.data.meta.randomizationSeed) {
        setCurrentFilters({
          ...newFilters,
        });
        setPrevFilters({
          ...newFilters,
        });
        setSemilla(data.data.meta.randomizationSeed);
        setSemillaPrevia(data.data.meta.randomizationSeed);
        
      }

      // Guardar en localStorage los filtros, semilla y página actual
      localStorage.setItem("filtersURLOfertas", JSON.stringify(newFilters));
      localStorage.setItem("seedOfertas", JSON.stringify(seed));
      localStorage.setItem("pageOfertas", JSON.stringify(page));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtersURL = JSON.parse(localStorage.getItem("filtersURLOfertas"));
    const seed = JSON.parse(localStorage.getItem("seedOfertas"));
    const page = JSON.parse(localStorage.getItem("pageOfertas"));
  
    if (filtersURL && seed && page) {
      fetchPaginatedData(filtersURL, page, seed);
    } else {
      const obtenerCarreraActual = async () => {
        try {
          const response = await fetch(`${BASE_URL}/alumni/me/resume`, {
            method: 'GET',
            credentials: 'include',
          });
  
          if (!response.ok) {
            throw new Error("Error al obtener la carrera actual");
          }
  
          const data = await response.json();
  
          if (Array.isArray(data.data.graduations)) {
            const carreraActual = data.data.graduations.map((graduation) => graduation.careerName);
            const filtersURLOfertas = {
              "careers": carreraActual // carreraActual ya es un array, no es necesario usar [carreraActual]
            };
  
            const filtersJSON = JSON.stringify(filtersURLOfertas);
            localStorage.setItem('filtersURLOfertas', filtersJSON);
  
            fetchPaginatedData(filtersURLOfertas, 1); // Llamar a fetchPaginatedData con los filtros obtenidos
          }
        } catch (error) {
        }
      };
  
      obtenerCarreraActual(); // ¡No olvides llamar a esta función para obtener la carrera actual!
    }
  }, []);
  



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
  }, [currentFilters, prevFilters, semilla, semillaPrevia]);

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
        hasSearched,
        setHasSearched,
        semilla,
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
