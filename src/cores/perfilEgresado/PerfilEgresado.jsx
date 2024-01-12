import React, { useEffect } from "react";
import NavBarEgresados from "../../components/NavbarEgresados";
import ExperienciaLaboralCard from "./ExperienciaLaboralCard";
import IdiomasCard from "./IdiomasCard";
import CertificadosCard from "./CertificadosCard";
import PortafoliosCard from "./PortafoliosCard";
import ContactoCard from "./ContactoCard";
import EducacionCard from "./EducacionCard";
import SobremiCard from "./SobreMiCard";
import { Box, Text, Flex, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider, Tooltip  } from "@chakra-ui/react";
import { useState } from "react";
import CustomSwitch from "./Switch";
import {
  editVisibility,
  getMeProfile,
} from "../../services/auth/MeProfile.services";
import LoadingSpinner from "../../components/LoadingSpinner";
import HabilidadesBlandasCard from "./HabilidadesBlandasCard";
import HabilidadesTecnicasCard from "./HabilidadesTecnicasCard";
import IndustriasInteresCard from "./IndustriasInteresCard";
import PosicionesInteresCard from "./PosicionesInteresCard";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from '@chakra-ui/icons'
import FooterEgresado from "../../components/FooterEgresado";
import DownloadMyCV from "./DownloadMyCV";
import { InfoIcon } from '@chakra-ui/icons'

function PerfilEgresado() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataProfile, setDataProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenO, setIsModalOpenO] = useState(false);
  const location = useLocation();
  const [openVisibleTooltip, setOpenVisibleTooltip] = useState(false); 
const navigate = useNavigate();

  const [cardData, setCardData] = useState([]);

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
      const isVisible = dataProfile.data.resume.isVisible;
      // Inicializa el valor del switch con el valor de visibilidad obtenido desde el backend
      setSwitchValue(isVisible);

      // Si isVisible es false, abre el modal
    if (!isVisible) {
      setIsModalOpenO(true);
    }

      // Calcula la fecha que será exactamente un mes después de visibleSince
    const visibleSinceDate = new Date(dataProfile.data.resume.visibleSince);
    const oneMonthLater = new Date(visibleSinceDate.setMonth(visibleSinceDate.getMonth() + 1));
    const oneWeekBeforeOneMonthLater = new Date(oneMonthLater.setDate(oneMonthLater.getDate() - 7));

    // Compara la fecha actual con oneWeekBeforeOneMonthLater
    const currentDate = new Date();
    if (currentDate >= oneWeekBeforeOneMonthLater) {
      setIsModalOpen(true);
    }
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
          {location.state && location.state.fromJobOffer && (
            <Button onClick={() => navigate(-1)} width="80px">
              <ArrowBackIcon /> <Text fontSize="11px">Volver</Text>{" "}
            </Button>
          )}
          <Box
            width="calc(100vw - 20px)"
            marginLeft="20px"
            display="flex"
            flexDirection={["column", "column", "row", "row"]}
            marginBottom="20px"
          >
            <Box width="70vw" display="flex" flexDirection="column">
              <Text
                color="#37B4E3"
                as="b"
                fontSize={["lg", "mlg", "xl", "2xl"]}
              >
                {(
                  dataProfile.data.names +
                  " " +
                  dataProfile.data.surnames
                ).toUpperCase()}
              </Text>
              <Text color="#37B4E3" fontSize={["md", "md", "lg", "lg"]}>
                {dataProfile &&
                  dataProfile.data.graduations.length > 0 &&
                  dataProfile.data.graduations
                    .map((career) => career.careerName)
                    .join(" / ")}
              </Text>
            </Box>
            <Box
              marginTop={["10px", "10px", "0px", "0px"]}
              display="flex"
              width={["90%", "30%"]}
              justifyContent={["center", "right"]}
              paddingRight={["0px", "0px", "20px", "20px"]}
              alignItems="center"
            >
              <Box display="flex" flexDirection="column">
                <DownloadMyCV
                  nombre={dataProfile.data.names}
                  apellido={dataProfile.data.surnames}
                />
                <Text color="grey" fontSize={["12px", "12px", "md", "md"]}>
                  Cantidad de descargas:{" "}
                  {dataProfile.data.resume.numberOfDownloads}
                </Text>
                <Flex
                  justifyContent={["center", "center", "flex-end", "flex-end"]}
                  alignItems="center"
                  marginTop="10px"
                >
                  <Tooltip label="Cuando tu perfil se encuentre público podrás aparecer en búsquedas de reclutadores" isOpen={openVisibleTooltip} fontSize={["12px", "12px", "sm", "sm"]}
                  hasArrow={true}>
                    <InfoIcon
                      cursor="pointer"
                      color="#37B4E3"
                      marginRight="7px"
                      onClick={()=> {
                        setOpenVisibleTooltip(!openVisibleTooltip);
                        if (!openVisibleTooltip) {
                          setTimeout(() => {
                            setOpenVisibleTooltip(false);
                          }, 2000);
                        }}}
                    />
                  </Tooltip>
                  {switchValue ? (
                    <Text
                      fontSize={["12px", "12px", "sm", "sm"]}
                      color="black"
                      marginRight="10px"
                      fontWeight="bold"
                    >
                      Perfil público
                    </Text>
                  ) : (
                    <Text
                      fontSize={["12px", "12px", "sm", "sm"]}
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
                cardData={
                  dataProfile && dataProfile.data.resume.industriesOfInterest
                }
                setCardData={setCardData}
              />
              <PosicionesInteresCard
                cardData={
                  dataProfile && dataProfile.data.resume.positionsOfInterest
                }
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
                setCardData={setCardData}
              />

              <HabilidadesBlandasCard
                cardData={dataProfile && dataProfile.data.resume.softSkills}
                setCardData={setCardData}
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
                setCardData={setCardData}
              />
              <EducacionCard
                cardData={
                  dataProfile && dataProfile.data.resume.higherEducationStudies
                }
                setCardData={setCardData}
              />
              <HabilidadesTecnicasCard
                cardData={
                  dataProfile && dataProfile.data.resume.technicalSkills
                }
                setCardData={setCardData}
              />
              <CertificadosCard
                cardData={dataProfile && dataProfile.data.resume.ciapCourses}
                setCardData={setCardData}
              />
            </Box>
          </Box>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">Aviso</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            Falta menos de una semana para que su perfil sea ocultado. Si desea
            mantenerlo visible, por favor haga click en el botón "Renovar".
          </ModalBody>
          <ModalFooter display="flex" flexDirection="row">
            <Button
              color="#007935"
              style={{ borderColor: "#007935", borderWidth: "2px" }}
              onClick={() => setIsModalOpen(false)}
              marginRight="10px"
            >
              Cancelar
            </Button>
            <Button
              bgColor="#007935"
              color="white"
              _hover={{ bg: "#025024" }}
              onClick={() => {
                editVisibility(true);
                setIsModalOpen(false);
              }}
            >
              Renovar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isModalOpenO} onClose={() => setIsModalOpenO(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">Perfil Oculto</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            Su perfil se encuentra oculto. Si desea activarlo, por favor haga
            click en el botón "Activar".
          </ModalBody>
          <ModalFooter display="flex" flexDirection="row">
            <Button
              color="#007935"
              style={{ borderColor: "#007935", borderWidth: "2px" }}
              onClick={() => setIsModalOpenO(false)}
              marginRight="10px"
            >
              Cancelar
            </Button>
            <Button
              bgColor="#007935"
              color="white"
              _hover={{ bg: "#025024" }}
              onClick={() => {
                editVisibility(true);
                setIsModalOpenO(false);
                setSwitchValue(true);
              }}
            >
              Activar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FooterEgresado />
    </Box>
  );
}

export default PerfilEgresado;
