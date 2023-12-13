import React, { createContext, useContext, useState } from 'react';

const EgresadosContext = createContext();

export const EgresadosProvider = ({ children }) => {
  const [egresados, setEgresados] = useState([]);

  return (
    <EgresadosContext.Provider value={{ egresados, setEgresados }}>
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
