import {OfertasProvider} from './OfertasContext';
import PantallaOfertas from './PantallaOfertas';
import NavBarEgresados from '../../components/NavBarEgresados';

const ListarOfertasPrincipal = () => {
    return (
        <OfertasProvider>
        <NavBarEgresados />
        <PantallaOfertas />
        </OfertasProvider>
    );
    }

export default ListarOfertasPrincipal;