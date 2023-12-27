import { EgresadosProvider } from './EgresadosContext';
import NavBar from '../../components/Navbar';
import PantallaEgresados from './PantallaEgresados';

const App = () => {
  return (
    <EgresadosProvider>
      <NavBar />
      <PantallaEgresados />
    </EgresadosProvider>
  );
};

export default App;
