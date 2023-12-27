import {OfertasProvider} from './OfertasContext';
import NavBar from '../../components/Navbar';
import PantallaOfertas from './PantallaOfertas';

const App = () => {
    return (
        <OfertasProvider>
        <NavBar />
        <PantallaOfertas />
        </OfertasProvider>
    );
    }

export default App;