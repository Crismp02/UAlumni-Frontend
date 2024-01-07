import { EgresadosProvider } from './EgresadosContext';
import PantallaEgresados from './PantallaEgresados';
import Footer from '../../components/Footer';
import NavBarReclutador from '../../components/NavBarReclutador';

const App = () => {
  return (
    <EgresadosProvider>
      <NavBarReclutador/>
      <PantallaEgresados />
      <Footer/>
    </EgresadosProvider>
  );
};

export default App;
