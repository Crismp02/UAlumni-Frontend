import { EgresadosProvider } from './EgresadosContext';
import NavBar from '../../components/Navbar';
import PantallaEgresados from './PantallaEgresados';
import Footer from '../../components/Footer';

const App = () => {
  return (
    <EgresadosProvider>
      <NavBar />
      <PantallaEgresados />
      <Footer/>
    </EgresadosProvider>
  );
};

export default App;
