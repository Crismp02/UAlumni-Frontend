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
import { Box, Card, Divider, Text, CardBody } from "@chakra-ui/react";
import { getAlumniProfile } from "../../services/profileEgresado/AlumniProfile.services";
import LoadingSpinner from "../../components/LoadingSpinner";
import HabilidadesTecnicasCard from "./HabilidadesTecnicasCard";
import DownloadCV from "./DownloadCV";
import IndustriasInteresCard from "./IndustriasInteresCard";
import PosicionesInteresCard from "./PosiciónInterésCard";

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
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
      }}
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

          <Box
            width="calc(100vw - 20px)"
            marginLeft="20px"
            display="flex"
            flexDirection="row"
            marginBottom="20px"
          >
            <Box width="70vw" display="flex" flexDirection="column">
              <Text color="#37B4E3" as="b" fontSize={["md", "md", "xl", "2xl"]}>
                {(
                  dataProfile.data.names +
                  " " +
                  dataProfile.data.surnames
                ).toUpperCase()}
              </Text>
              <Text color="#37B4E3" fontSize={["sm", "sm", "lg", "lg"]}>
                {dataProfile &&
                  dataProfile.data.graduations.length > 0 &&
                  dataProfile.data.graduations
                    .map((career) => career.careerName)
                    .join(" / ")}
              </Text>
            </Box>
            <Box
              display="flex"
              width="30%"
              justifyContent="right"
              paddingRight="20px"
              alignItems="center"
            >
              <DownloadCV email={email} />
            </Box>
          </Box>
          <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
            <Box
              width={{ base: "100%", md: "33.3%" }}
              height="100%"
              marginRight={{ base: "0", md: "20px" }}
              marginBottom= "20px"
              marginLeft={{ base: "0", md: "20px" }}
              position="relative"
            >
              <IndustriasInteresCard
              cardData={dataProfile && dataProfile.data.resume.industriesOfInterest}/>

              <PosicionesInteresCard
              cardData={dataProfile && dataProfile.data.resume.positionsOfInterest}/>

              <PortafoliosCard
                cardData={dataProfile && dataProfile.data.resume.portfolio}
              />
              <SobremiCard
                cardData={dataProfile && dataProfile.data.resume.aboutMe}
              />
              <IdiomasCard
                cardData={dataProfile && dataProfile.data.resume.knownLanguages}
              />
              <HabilidadesBlandasCard
                cardData={dataProfile && dataProfile.data.resume.softSkills}
              />
            </Box>
            {/* inicio de 2do Box */}
            <Box
              width={{ base: "100%", md: "66.6%" }}
              marginBottom="20px"
              position="relative"
              marginRight={{ base: "0", md: "20px" }}
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
              <HabilidadesTecnicasCard
                cardData={
                  dataProfile && dataProfile.data.resume.technicalSkills
                }
              />
              <CertificadosCard
                cardData={dataProfile && dataProfile.data.resume.ciapCourses}
              />
              <Card marginTop="20px">
                <CardBody p="10px">
                  <Text
                    fontWeight="bold"
                    fontSize="md"
                    marginLeft="2"
                    marginBottom="1"
                    display="flex"
                    alignItems="center"
                    color="#007935"
                  >
                    Información de Contacto
                  </Text>
                  <Divider orientation="horizontal" />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop="3"
                  >
                    <DownloadCV email={email} />
                  </Box>
                </CardBody>
              </Card>
            </Box>
          </Box>
        </>
      )}
      <Footer />
    </Box>
  );
}

export default PerfilEgresadoReclutador;
