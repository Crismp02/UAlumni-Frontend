import React, { useEffect } from "react";
import NavBarEgresados from "../../components/NavBarEgresados";
import Footer from "../../components/Footer";
import ExperienciaLaboralCard from "./ExperienciaLaboralCard";
import IdiomasCard from "./IdiomasCard";
import CertificadosCard from "./CertificadosCard";
import PortafoliosCard from "./PortafoliosCard";
import ContactoCard from "./ContactoCard";
import EducacionCard from "./EducacionCard";
import SobremiCard from "./SobreMiCard";

import { Box, Text, Flex, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import CustomSwitch from "./Switch";
import { editVisibility, getMeProfile } from "../../services/auth/MeProfile.services";
import LoadingSpinner from "../../components/LoadingSpinner";
import HabilidadesBlandasCard from "./HabilidadesBlandasCard";
import HabilidadesTecnicasCard from "./HabilidadesTecnicasCard";
import DownloadCV from "../perfilEgresadoReclutador/DownloadCV";
import IndustriasInteresCard from "./IndustriasInteresCard";
import PosicionesInteresCard from "./PosicionesInteresCard";

function PerfilEgresado() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataProfile, setDataProfile] = useState(null);

  const [cardData, setCardData] = useState([]);

  const handleCardDataChange = (newData) => {
    setCardData(newData);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getMeProfile();
      setDataProfile(result);
      setIsLoading(false);
    }
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (dataProfile) {
      //console.log(dataProfile.data.resume);
      // Inicializa el valor del switch con el valor de visibilidad obtenido desde el backend
      setSwitchValue(dataProfile.data.resume.isVisible);
    }
  }, [dataProfile]);
  
  const handleSwitchChange = async (e) => {
    const isVisible = e.target.checked;
    setSwitchValue(isVisible);
  
    await editVisibility(isVisible);
  };
  const [switchValue, setSwitchValue] = useState(false);


  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
      }}
    >
      <NavBarEgresados />
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
              <Box display="flex" flexDirection="column">
                <DownloadCV email={dataProfile.data.email} />
                <Text color="grey">
                  Cantidad de descargas:{" "}
                  {dataProfile.data.resume.numberOfDownloads}
                </Text>
                <Flex
                  justifyContent="flex-end"
                  alignItems="center"
                  marginTop="10px"
                >
                  {switchValue ? (
                    <Text
                      fontSize="sm"
                      color="black"
                      marginRight="10px"
                      fontWeight="bold"
                    >
                      Perfil público
                    </Text>
                  ) : (
                    <Text
                      fontSize="sm"
                      color="black"
                      marginRight="10px"
                      fontWeight="bold"
                    >
                      Perfil oculto
                    </Text>
                  )}
                  <VStack spacing={4}>
                    <CustomSwitch
                      isChecked={switchValue}
                      onChange={handleSwitchChange}
                    />
                  </VStack>
                </Flex>
              </Box>
            </Box>
          </Box>
          <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
            <Box
              width={{ base: "100%", md: "33.3%" }}
              height="100%"
              marginRight={{ base: "0", md: "20px" }}
              marginBottom="20px"
              marginLeft={{ base: "0", md: "20px" }}
              position="relative"
            >
              <ContactoCard cardData={dataProfile && dataProfile.data} />

              <IndustriasInteresCard
                cardData={dataProfile && dataProfile.data.resume.industriesOfInterest}
                setCardData={setCardData}
              />
              <PosicionesInteresCard
                cardData={dataProfile && dataProfile.data.resume.positionsOfInterest}
                setCardData={setCardData}
              />

              <PortafoliosCard
                cardData={dataProfile && dataProfile.data.resume.portfolio}
                setCardData={setCardData}
              />

              <SobremiCard
                cardData={dataProfile && dataProfile.data.resume.aboutMe}
              />

            <IdiomasCard
          cardData={dataProfile && dataProfile.data.resume.knownLanguages}
          setCardData={ setCardData } />

          <HabilidadesBlandasCard
            cardData={dataProfile && dataProfile.data.resume.softSkills}
            setCardData={ setCardData }
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
           cardData={dataProfile && dataProfile.data.resume.workExperiences}
           setCardData={ setCardData }
          />
          <EducacionCard
          cardData={dataProfile && dataProfile.data.resume.higherEducationStudies}
          setCardData={ setCardData } />
          <HabilidadesTecnicasCard
            cardData={dataProfile && dataProfile.data.resume.technicalSkills}
            setCardData={ setCardData }
          />
 <CertificadosCard
            cardData={dataProfile && dataProfile.data.resume.ciapCourses}
            setCardData={ setCardData }
          />
            </Box>
          </Box>
        </>
      )}
      <Footer />
    </Box>
    /*
    <Box style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <NavBarEgresados />
      {isLoading ? <LoadingSpinner/> : ( <>
      {dataProfile && (
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

      <Flex justifyContent="flex-end" alignItems="center" marginBottom="5px">
        {switchValue && (
          <Text
            fontSize="sm"
            color="black"
            marginRight="10px"
            fontWeight="bold"
          >
            Perfil visible
          </Text>
        )}
        <VStack spacing={4} marginRight="20px">
          <CustomSwitch isChecked={switchValue} onChange={handleSwitchChange} />
        </VStack>
      </Flex>

      <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
        <Box
          width={{ base: "100%", md: "45%" }}
          bg="#F3FAF7"
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
            {dataProfile && dataProfile.data.graduations.length > 0 && dataProfile.data.graduations.map(career => career.careerName).join(' / ')}
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
            <Text
              bg="#FBC430"
              color="black"
              padding="4"
              borderRadius="4"
              cursor="pointer"
              fontWeight="BOLD"
              _hover={{ bg: "#FBC930" }}
            >
              Cantidad de Descargas CV
            </Text>
          </Box>
          <ContactoCard
            cardData={dataProfile && dataProfile.data}
          />

          <PortafoliosCard
          cardData={dataProfile && dataProfile.data.resume.portfolio}
          setCardData={ setCardData } />

          <SobremiCard
            cardData={dataProfile && dataProfile.data.resume.aboutMe}
          />
        </Box>
        {/* inicio de 2do Box 
        <Box
          width={{ base: "100%", md: "55%" }}
          bg="#F5F5F5"
          marginBottom="20px"
          position="relative"
        >
          <ExperienciaLaboralCard
           cardData={dataProfile && dataProfile.data.resume.workExperiences}
           setCardData={ setCardData }
          />

          <EducacionCard
          cardData={dataProfile && dataProfile.data.resume.higherEducationStudies}
          setCardData={ setCardData } />

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
          cardData={dataProfile && dataProfile.data.resume.knownLanguages}
          setCardData={ setCardData } />

          <CertificadosCard
            cardData={dataProfile && dataProfile.data.resume.ciapCourses}
            setCardData={ setCardData }
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
      </>)}</>)}

      <Footer />
    </Box> */
  );
}

export default PerfilEgresado;
