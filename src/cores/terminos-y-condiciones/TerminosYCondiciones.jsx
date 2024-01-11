import {
    Box,
    Text,
    // useMediaQuery,
  } from "@chakra-ui/react";
  import Footer from "../../components/Footer";
  import NavBarEgresados from "../../components/NavbarEgresados";
  
  function TerminosCondiciones() {
    // const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  
    return (
      <Box
        width="100%"
        backgroundColor="#F5F5F5"
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <NavBarEgresados />
        <Text
          fontSize={["lg", "lg", "xl", "4xl"]}
          color="black"
          textAlign="center"
          as="b"
          paddingTop={["2px", "2px", "2px", "10px"]}
          marginTop="10px"
          marginBottom="10px"
          style={{
            textDecoration: "underline",
            textDecorationColor: "green",
            display: "flex",
            justifyContent: "center",
          }}
        >
          TÉRMINOS Y CONDICIONES DE UALUMNI
        </Text>
  
        {/* Contenido de los términos y condiciones */}
        <Box
          maxW="800px"
          mx="auto"
          px={4}
          paddingBottom={["20px", "20px", "40px", "80px"]}
          flexGrow="1"
          marginBottom="-40px"
        >
          {/* Agrega aquí tu texto de términos y condiciones */}
          <Text textAlign="justify">
            <b>1. Uso exclusivo:</b>
            <br />
            El uso de Ualumni es exclusivo para egresados de la Universidad
            Católica Andrés Bello extensión Guayana.
            <br />
            <br />
            <b>2. Legislación aplicable:</b>
            <br />
            Todos los usuarios deben regirse por las leyes y regulaciones vigentes
            de la República Bolivariana de Venezuela, así como por las normativas
            de la Universidad.
            <br />
            <br />
            <b>3. Creación de perfiles:</b>
            <br />
            Registro: al crear un perfil en Ualumni, el usuario se compromete a
            proporcionar información veraz, actualizada y completa sobre sus
            estudios, carrera profesional, habilidades blandas y técnicas, idiomas
            y cursos universitarios realizados. Generación de CV: la plataforma
            permite generar un currículum vitae descargable a partir de la
            información proporcionada en el perfil. El usuario es responsable de
            la precisión y actualización de esta información.
            <br />
            <br />
            <b>4. Ofertas de trabajo:</b>
            <br />
            Ofertas de empleo: Ualumni mostrará ofertas de trabajo de diversas
            empresas para los egresados registrados. Sin embargo, no se garantiza
            la idoneidad de estas ofertas y se recomienda a los usuarios
            investigar y verificar la información antes de aplicar. Aplicaciones:
            los egresados podrán postularse a las ofertas de trabajo publicadas
            por las empresas a través de la plataforma. La gestión y selección de
            candidatos son responsabilidad exclusiva de las empresas ofertantes.
            <br />
            <br />
            <b>5. Uso exclusivo del correo institucional:</b>
            El usuario deberá utilizar solamente el correo institucional de la
            Universidad para crearse una cuenta en Ualumni.
            <br />
            <br />
            <b>6. Responsabilidad del usuario:</b>
            <br />
            Los usuarios son responsables de utilizar Ualumni de manera adecuada y
            respetuosa, evitando actividades ilegales o que infrinjan los derechos
            de terceros.
            <br />
            <br />
            <b>7. Privacidad y Seguridad:</b>
            <br />
            Toda información personal y sensible de los usuarios será encriptada y
            almacenada dentro de los servidores de la aplicación, garantizando la
            privacidad y seguridad de los usuarios.
            <br />
            <br />
            <b>9. Contacto:</b>
            <br />
            Cualquier duda o inquietud sobre los términos o condiciones, así como
            sobre el funcionamiento de la plataforma, se pueden consultar a través
            de ualumni@ucab.edu.ve
            <br />
            <br />
            <b>10. Modificaciones en los términos y condiciones:</b>
            <br />
            La Universidad y el equipo de Ualumni se reservan el derecho de
            modificar estos términos y condiciones en cualquier momento,
            notificando a los usuarios de cualquier cambio significativo
            realizado. El uso continuado de la plataforma después de dichas
            modificaciones constituye una aceptación de los términos actualizados.
          </Text>
          {/* Fin del contenido */}
        </Box>
  
        <Footer />
      </Box>
    );
  }
  
  export default TerminosCondiciones;
  