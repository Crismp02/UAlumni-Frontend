import { EgresadosProvider } from './EgresadosContext';
import NavBar from '../../components/Navbar';
import PantallaEgresados from './PantallaEgresados';
import TituloListarEgresados from './TituloListarEgresados';

const App = () => {
  return (
    <EgresadosProvider>
      <NavBar />
      <TituloListarEgresados/>
      <PantallaEgresados/>
    </EgresadosProvider>
  );
};

export default App;
