import {OfertasProvider} from './OfertasContext';
import PantallaOfertas from './PantallaOfertas';
import NavBarEgresados from '../../components/NavBarEgresados';
import FooterEgresado from '../../components/FooterEgresado';

const ListarOfertasPrincipal = () => {
    return (
        <OfertasProvider>
        <NavBarEgresados />
        <PantallaOfertas />
        <FooterEgresado/>
        </OfertasProvider>
    );
    }

export default ListarOfertasPrincipal;