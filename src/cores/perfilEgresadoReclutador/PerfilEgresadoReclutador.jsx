import React from "react";
import NavBarReclutador from "../../components/NavBarReclutador";
import Footer from "../../components/Footer";
import ExperienciaLaboralCard from "./ExperienciaLaboralCard";
import IdiomasCard from "./IdiomasCard";
import CertificadosCard from "./CertificadosCard";
import PortafoliosCard from "./PortafoliosCard";
import HabilidadesCard from "./HabilidadesCard";
import EducacionCard from "./EducacionCard";
import SobremiCard from "./SobremiCard";

import { Box, Text, Button  } from "@chakra-ui/react";
import { useState } from "react";

function PerfilEgresadoReclutador() {
  const [cardContentEducacion, setCardContentEducacion] = useState([
    {
      id: 1,
      grado: "Licenciatura",
      anioFinal: "2023",
      institucion: "Universidad Católica Andrés Bello",
    },
  ]);

  const [cardContentIdiomas, setCardContentIdiomas] = useState([
    {
      id: 1,
      idioma: "Inglés",
      nivel: "A1",
    },
  ]);
  const idiomas = ["Inglés", "Español", "Francés"];
  const niveles = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const [cardContentCertificados, setCardContentCertificados] = useState([
    {
      id: 1,
      curso: "Certificado de Estudios",
      fecha: "18/01/2020",
    },
  ]);
  const cursos = ["Prototipos con Arduino", "Photoshop", "Componente Docente"];

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
  const [cardContentHabilidades, setCardContentHabilidades] = useState([
    {
      id: 1,
      habilidad: "Nodejs",
    },
    {
      id: 2,
      habilidad: "Frontend",
    },
  ]);
  const [cardContentHabilidadesBlandas, setCardContentHabilidadesBlandas] =
    useState([
      {
        id: 1,
        habilidad: "Laravel",
      },
      {
        id: 2,
        habilidad: "Frontend",
      },
    ]);

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
            //color="#37B4E3"
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
            //color="#37B4E3"
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
          <PortafoliosCard
            cardContentPortafolios={cardContentPortafolios}
            setCardContentPortafolios={setCardContentPortafolios}
          />

          <SobremiCard
            cardContent={cardContentSobremi}
            setCardContent={setCardContentSobremi}
          />
        </Box>
        {/* inicio de 2do Box */}
        <Box
          width={{ base: "100%", md: "55%" }}
          bg="#F5F5F5"
          marginBottom="20px"
          position="relative"
        >
          <ExperienciaLaboralCard
            cardContent={cardContent}
            setCardContent={setCardContent}
          />

          <EducacionCard
            cardContent={cardContentEducacion}
            setCardContent={setCardContentEducacion}
          />

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
          <HabilidadesCard
            cardContentHabilidades={cardContentHabilidades}
            setCardContentHabilidades={setCardContentHabilidades}
            tipoHabilidad="Técnicas"
          />
          <HabilidadesCard
            cardContentHabilidades={cardContentHabilidadesBlandas}
            setCardContentHabilidades={setCardContentHabilidadesBlandas}
            tipoHabilidad="Blandas"
          />

          <IdiomasCard
            cardContentIdiomas={cardContentIdiomas}
            setCardContentIdiomas={setCardContentIdiomas}
            idiomas={idiomas}
            niveles={niveles}
          />

          <CertificadosCard
            cardContentCertificados={cardContentCertificados}
            setCardContentCertificados={setCardContentCertificados}
            cursos={cursos}
          />

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
