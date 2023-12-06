import NavBarReclutador from "../../components/NavbarReclutador";
import Footer from "../../components/Footer";
import {
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

function PerfilEgresadoReclutador() {
  
    const [cardIdToEditExpLaboral, setcardIdToEditExpLaboral] = useState(null);
    const [cardIdToEditEducacion, setCardIdToEditEducacion] = useState(null);
    const [cardIdToEditIdiomas, setCardIdToEditIdiomas] = useState(null);
    const [cardIdToEditCertificados, setCardIdToEditCertificados] =
      useState(null);
    const [cardIdToEditPortafolios, setCardIdToEditPortafolios] = useState(null);
    const [cardIdToEditSobremi, setCardIdToEditSobremi] = useState(null);
  
    const [cardContentEducacion, setCardContentEducacion] = useState([
      {
        id: 1,
        grado: "Licenciatura",
        anioFinal: "2023",
      },
    ]);
  
    const [cardContent, setCardContent] = useState([
      {
        id: 1,
        empresa: "Corporación XYZ",
        posicion: "Posición",
        fechaInicio: "01/01/2020",
        fechaFinal: "01/01/2022",
        descripcion:
          "En este cargo como Jefe de Comunicaciones en la Corporación XYZ, logró aumentar el tráfico web en un 20%.",
      },
    ]);
    const [cardContentIdiomas, setCardContentIdiomas] = useState([
      {
        id: 1,
        idioma: "Inglés",
        nivel: "Intermedio",
      },
    ]);
    const idiomas = ["Inglés", "Español", "Francés"];
  
    const niveles = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const [cardContentCertificados, setCardContentCertificados] = useState([
      {
        id: 1,
        titulo: "Titulo Certificado",
        curso: "CIAP",
        fecha: "18/01/2020",
      },
    ]);
    const [cardContentPortafolios, setCardContentPortafolios] = useState([
      {
        id: 1,
        titulo: "Titulo Portafolio",
        url: "wwww.miportafolio.com",
      },
    ]);
    const [cardContentSobremi, setCardContentSobremi] = useState([
      {
        id: 1,
        descripcion:
          "Soy María, una licenciada en comunicadora social con 2 años de experiencia. Me apasiona crear experiencias visuales que impacten a las personas. Creo que el diseño gráfico es una herramienta poderosa que puede usarse para comunicar ideas de una manera efectiva.",
      },
    ]);
  
    const handleMouseEnterHabilidades = (skill) => {
      setSelectedSkill(skill);
    };
  
    const handleMouseLeaveHabilidades = () => {
      setSelectedSkill(null);
    };
  
  return (
    <div>
      <NavBarReclutador />

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
        PERFIL
      </Text>

      <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
        <Box
          width={{ base: "100%", md: "45%" }}
          bg="#F5F5F5"
          height="100%"
          marginRight={{ base: "0", md: "20px" }}
          marginBottom={{ base: "20px", md: "0" }}
          marginLeft={{ base: "0", md: "20px" }}
          position="relative"
        >
          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
            textAlign="center"
          >
            Nombre del Egresado
          </Text>
          <Text
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
            textAlign="center"
          >
            Carrera
          </Text>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            <Button
              bg="#007935"
              color="white"
              padding="4"
              borderRadius="4"
              cursor="pointer"
              fontWeight="bold"
              _hover={{ bg: "#005e28" }}
            >
              Descargar CV
            </Button>
          </Box>
          <Text
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
            textAlign="left"
            fontWeight="bold"
          >
            Portafolio
          </Text>
          {cardContentPortafolios.map((card) => (
            <Box
              key={card.id}
              bg="white"
              padding="4"
              border="1px solid #ccc"
              borderRadius="8px"
              marginLeft="10"
              marginRight="10"
              marginTop="5"
              marginBottom="5"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="4"
                marginTop="5"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="3"
                >
                  <Text fontWeight="bold">{card.titulo}</Text>
                </Box>
              </Box>
              <Text fontSize="md" marginBottom="2">
                {card.url}
              </Text>
            </Box>
          ))}
          {/* Cierre de box */}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="4"
          >
            <Text fontWeight="bold" marginLeft="10">
              Sobre Mí
            </Text>
          </Box>
          {cardContentSobremi.map((card) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="2"
              key={card.id}
            >
              <Text marginLeft="10" marginRight="10" marginBottom="10">
                {card.descripcion}
              </Text>
            </Box>
          ))}
          
        </Box>

        {/* inicio de 2do Box */}
        <Box
          width={{ base: "100%", md: "55%" }}
          bg="#F5F5F5"
          marginBottom="20px"
          position="relative"
        >
          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginTop="10"
            marginBottom="0"
            display="flex"
            alignItems="center"
          >
            Experiencia Laboral
          </Text>
          {/* Inicio Exp Laboral */}
          {cardContent.map((card) => (
            <Box
              key={card.id}
              bg="white"
              padding="4"
              border="1px solid #ccc"
              borderRadius="8px"
              marginLeft="10"
              marginRight="10"
              marginTop="5"
              marginBottom="5"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="4"
                marginTop="7"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="3"
                >
                  <Text fontWeight="bold">{card.empresa}</Text>
                </Box>
                <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
                  {card.posicion}
                </Text>
              </Box>
              <Text fontSize="md" marginBottom="2">
                {card.descripcion}
              </Text>

              <Text fontSize="md" marginBottom="2">
                {card.fechaInicio} - {card.fechaFinal}
              </Text>
            </Box>
          ))}
          {/* Cierre de box */}

          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
          >
            Estudios Realizados
          </Text>
          {/* inicio de tarjeta de educacion */}
          {cardContentEducacion.map((card) => (
            <Box
              key={card.id}
              bg="white"
              padding="4"
              border="1px solid #ccc"
              borderRadius="8px"
              marginLeft="10"
              marginRight="10"
              marginTop="5"
              marginBottom="5"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0)"
              position="relative"
            >

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="4"
              >
                <Text fontWeight="bold" marginTop="8">
                  {card.grado}
                </Text>
                <Text marginRight="4" marginTop="8">
                  {card.anioFinal}
                </Text>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="2"
              >
                <Text marginRight="4">Universidad Católica Andrés Bello</Text>
              </Box>
            </Box>
          ))}
          {/* cierre de tarjeta de educacion */}

          {/* Texto Principal Habilidades */}
          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Habilidades
          </Text>
          <Text
            fontSize="lg"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Técnicas
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            <Box
              position="relative"
              padding="2"
              marginBottom="2"
              marginRight="2"
              cursor="pointer"
              onMouseEnter={() => handleMouseEnterHabilidades("Habilidad 1")}
              onMouseLeave={handleMouseLeaveHabilidades}
            >
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 1
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 2
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 3
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 4
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 5
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 6
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 7
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 8
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 9
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 10
              </Text>
            </Box>
          </Box>
          <Text
            fontSize="lg"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Blandas
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
            cursor="pointer"
            onMouseEnter={handleMouseEnterHabilidades}
            onMouseLeave={handleMouseLeaveHabilidades}
          >
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 100000
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 2
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 3
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 4
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 5
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 6
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 7
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 8
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 9
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 10
              </Text>
            </Box>
          </Box>
          <Text
            fontWeight="bold"
            fontSize="xl"
            margin="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Idiomas
          </Text>
          {/* Inicio box de Idiomas */}
          {cardContentIdiomas.map((card) => (
            <Box
              key={card.id}
              bg="white"
              padding="4"
              border="1px solid #ccc"
              borderRadius="8px"
              marginLeft="10"
              marginRight="10"
              marginTop="5"
              marginBottom="5"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              position="relative"
            >

              <Box display="flex" alignItems="center" marginBottom="4">
                <Text fontWeight="bold">{card.idioma}</Text>
                <Text
                  bg="#FBC430"
                  color="black"
                  padding="2"
                  borderRadius="8"
                  marginLeft="5"
                >
                  {card.nivel}
                </Text>
              </Box>
            </Box>
          ))}
          {/* Fin box de Idiomas */}

          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Certificados
          </Text>
          {cardContentCertificados.map((card) => (
            <Box
              key={card.id}
              bg="white"
              padding="4"
              border="1px solid #ccc"
              borderRadius="8px"
              marginLeft="10"
              marginRight="10"
              marginTop="5"
              marginBottom="5"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              position="relative"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="4"
                marginTop="10"
              >
                <Text fontWeight="bold">{card.titulo}</Text>
                <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
                  {card.curso}
                </Text>
              </Box>
              <Text fontSize="md" marginBottom="2">
                {card.fecha}
              </Text>
            </Box>
          ))}

          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Información de Contacto
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            <Button
              bg="#007935"
              color="white"
              fontWeight='bold'
              padding="4"
              borderRadius="4"
              cursor="pointer"
              _hover={{ bg: "#005e28" }}
            >
              Descargar CV
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </div>
  );
}

export default PerfilEgresadoReclutador;