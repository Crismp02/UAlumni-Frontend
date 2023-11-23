import {Text} from '@chakra-ui/react'
function Footer() {
    
    return(
        <div style={{
            backgroundColor:'#787878',
            width:'100%',
            height:'120px',
            display: 'flex',
            flexDirection:'column',
            
        }}>
            <Text fontSize='md' textAlign='center' paddingTop='20px' color='white' >¿TIENES ALGÚN PROBLEMA, DUDA O COMENTARIO?</Text>
            <Text fontSize='md' textAlign='center' paddingTop='5px' color='white'>NO DUDES EN CONTACTARNOS</Text>
            <Text fontSize='md' textAlign='center' paddingTop='10px' color='white'>CORREO@GMAIL.COM</Text>
        </div>
    );
}
export default Footer;