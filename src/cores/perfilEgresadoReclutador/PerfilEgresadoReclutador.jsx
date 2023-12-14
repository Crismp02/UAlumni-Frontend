import React from "react";
import { useState, useEffect } from "react";
import NavBarReclutador from "../../components/NavBarReclutador";
import Footer from "../../components/Footer";
import ExperienciaLaboralCard from "./ExperienciaLaboralCard";
import IdiomasCard from "./IdiomasCard";
import CertificadosCard from "./CertificadosCard";
import PortafoliosCard from "./PortafoliosCard";
import HabilidadesBlandasCard from "./HabilidadesBlandasCard";
import EducacionCard from "./EducacionCard";
import SobremiCard from "./SobremiCard";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { getAlumniProfile } from "../../services/profileEgresado/AlumniProfile.services";
import LoadingSpinner from "../../components/LoadingSpinner";
import HabilidadesTecnicasCard from "./HabilidadesTecnicasCard";
import DownloadCV from "./DownloadCV";

function PerfilEgresadoReclutador() {
  const { email } = useParams();
  const [dataProfile, setDataProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (email) {
      async function fetchData() {
        const result = await getAlumniProfile(email);
        setDataProfile(result);
        setIsLoading(false);
      }
      fetchData();
    }
  }, [email]);

  return (
    <Box
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBarReclutador />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
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
                {dataProfile.data.names} {dataProfile.data.surnames}
              </Text>
              <Text
                fontSize="xl"
                marginLeft="10"
                marginRight="10"
                marginTop="10"
                marginBottom="0"
                textAlign="center"
              >
                {dataProfile &&
                  dataProfile.data.graduations.length > 0 &&
                  dataProfile.data.graduations
                    .map((career) => career.careerName)
                    .join(" / ")}
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
                <DownloadCV email={email} />
              </Box>
              <PortafoliosCard
                cardData={dataProfile && dataProfile.data.resume.portfolio}
              />

              <SobremiCard
                cardData={dataProfile && dataProfile.data.resume.aboutMe}
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
                cardData={
                  dataProfile && dataProfile.data.resume.workExperiences
                }
              />
              <EducacionCard
                cardData={
                  dataProfile && dataProfile.data.resume.higherEducationStudies
                }
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
              <HabilidadesBlandasCard
                cardData={dataProfile && dataProfile.data.resume.softSkills}
              />
              <HabilidadesTecnicasCard
                cardData={
                  dataProfile && dataProfile.data.resume.technicalSkills
                }
              />
              <IdiomasCard
                cardData={dataProfile && dataProfile.data.resume.knownLanguages}
              />
              <CertificadosCard
                cardData={dataProfile && dataProfile.data.resume.ciapCourses}
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
                <DownloadCV email={email} />
              </Box>
            </Box>
          </Box>
        </>
      )}
      <Footer />
    </Box>
  );
}

export default PerfilEgresadoReclutador;
