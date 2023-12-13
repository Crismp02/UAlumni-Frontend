import { EgresadosProvider } from './EgresadosContext';
import FiltrosEgresados from './FiltrosEgresados';
import ListarEgresados from './ListarEgresados';
import NavBar from '../../components/Navbar';

const App = () => {
  return (
    <EgresadosProvider>
      <NavBar />
      <FiltrosEgresados />
      <ListarEgresados />
    </EgresadosProvider>
  );
};

export default App;
