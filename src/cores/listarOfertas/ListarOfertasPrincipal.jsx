import {OfertasProvider} from './OfertasContext';
import NavBar from '../../components/Navbar';
import PantallaOfertas from './PantallaOfertas';

const ListarOfertasPrincipal = () => {
    return (
        <OfertasProvider>
        <NavBar />
        <PantallaOfertas />
        </OfertasProvider>
    );
    }

export default ListarOfertasPrincipal;