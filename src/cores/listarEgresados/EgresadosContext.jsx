import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const EgresadosContext = createContext();

export const EgresadosProvider = ({ children }) => {
  const [egresados, setEgresados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [semilla, setSemilla] = useState(0);

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
    industries: [],
  });

  const [prevFilters, setPrevFilters] = useState({
    seed: semilla,
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

  const fetchPaginatedData = async (filters, page, seed) => {
    try {
      setIsLoading(true);
      setHasSearched(true);
      console.log("mi filtro")
      console.log(filters);
      console.log(page);
      console.log("nuestra semilla");
      console.log(seed);

      console.log("ejecutando fetchPaginatedData");

      page = page ?? 1;

      let queryString =
        typeof filters === "object"
          ? convertFiltersToQueryString(filters)
          : filters;

      if (!seed) {
        const url = `http://localhost:3000/alumni/resume?page=${page}&per-page=4&${queryString}`;
        seed = await obtenerSemilla(url); // Obtener la semilla si no está presente
      }

      const seedParam = seed ? `&seed=${seed}` : '';


      const urlWithData = `http://localhost:3000/alumni/resume?page=${page}&per-page=4${seedParam}${queryString ? `&${queryString}` : ''}`;


      console.log(urlWithData);

      const response = await fetch(urlWithData);
      console.log(response);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const data = await response.json();
      console.log("datos de LocalStorage");
      console.log(data);
      setEgresados(data.data.items);
      setTotalPages(data.data.meta.numberOfPages);
      setSemilla(seed);
      setCurrentPage(page);
      console.log("queryString como esta")
      console.log(queryString)
      const newFilters = updateFiltersFromQueryString(queryString);
      console.log(newFilters)

      // Actualiza el estado con los nuevos filtros y la semilla si está disponible
      if (data.data.meta.randomizationSeed) {
        setCurrentFilters({
          ...newFilters,
        });
        setPrevFilters({
          ...newFilters,
        });
      }

      // Guardar en localStorage los filtros, semilla y página actual
      localStorage.setItem("filtersURL", JSON.stringify(newFilters));
      localStorage.setItem("seed", JSON.stringify(seed));
      localStorage.setItem("page", JSON.stringify(page));
    } catch (error) {
      console.error("Error al obtener datos paginados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect que se ejecuta una sola vez para obtener los filtros y la semilla de localStorage y pagina actual y aplicarlos

  useEffect(() => {
    const filtersURL = JSON.parse(localStorage.getItem("filtersURL"));
    const seed = JSON.parse(localStorage.getItem("seed"));
    const page = JSON.parse(localStorage.getItem("page"));

    // convertir en objeto los filtros desde localStorage
    if (filtersURL && seed && page) {
      console.log("ejecutando useEffect LocalStorage");
      fetchPaginatedData(filtersURL, page, seed); // Pasar los filtros y la semilla a fetchPaginatedData
      setHasSearched(true);
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
        hasSearched,
        setHasSearched,
        semilla,
      }}
    >
      {children}
    </EgresadosContext.Provider>
  );
};

export const useEgresados = () => {
  const context = useContext(EgresadosContext);
  if (!context) {
    throw new Error(
      "useEgresados debe estar dentro del proveedor EgresadosContext"
    );
  }
  return context;
};

//Declaracion de las props:
EgresadosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
