import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  Text,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Center,
  Box,
  HStack,
  useToast,
} from "@chakra-ui/react";
import {
  getJobApplications,
  postJobApplication,
} from "../../services/job-offers/Job-offers.services";
import { PreviewPdf } from "./PreviewPdf";
import { useNavigate } from "react-router-dom";

function InfoOfferCard({ cardData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSecondModal,
    onOpen: onOpenSecondModal,
    onClose: onCloseSecondModal,
  } = useDisclosure();
  const [isCancelled, setIsCancelled] = useState(false);
  const isCancelledRef = useRef(false);
  const [countdown, setCountdown] = useState(10);
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isCancelledRef.current = isCancelled;
  }, [isCancelled]);

  const handleApply = async () => {
    const response = await getJobApplications();
    const appliedJobs = response.data.items;

    if (
      appliedJobs &&
      appliedJobs.some((job) => job.jobOfferId === cardData.id)
    ) {
      toast({
        title: "Ya has aplicado a esta oferta de trabajo.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setIsCancelled(false);
    onOpenSecondModal();
    setCountdown(10);
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      if (!isCancelledRef.current) {
        postJobApplication(cardData.id)
          .then(() => {
            toast({
              title: "Aplicación enviada.",
              description: "Hemos enviado tu aplicación a la empresa.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            setIsLoading(false);
            onClose();
          })
          .catch((error) => {
            toast({
              title: "Error al enviar la aplicación.",
              description:
                "Ha ocurrido un error al enviar tu aplicación para el trabajo.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            setIsLoading(false);
            onClose();
          });
      }
      onCloseSecondModal();
    }, 10000);
  };

  const undoApplication = () => {
    setIsCancelled(true);
    onCloseSecondModal();
    setIsLoading(false);
  };

  return (
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
          Información de la Oferta
        </Text>
        <Divider orientation="horizontal" />
        <Text
          fontWeight="bold"
          fontSize="15px"
          marginLeft="20px"
          marginTop="10px"
        >
          Fecha de Publicación
        </Text>
        <Text fontSize="15px" marginLeft="20px">
          {cardData &&
            (() => {
              const date = new Date(cardData.offerTimestamp);
              date.setDate(date.getDate() + 1);
              return date.toLocaleDateString();
            })()}
        </Text>
        <Text
          fontWeight="bold"
          fontSize="15px"
          marginLeft="20px"
          marginTop="10px"
        >
          Lugar
        </Text>
        <Text fontSize="15px" marginLeft="20px">
          {cardData && cardData.offerLocation}
        </Text>
        <Text
          fontWeight="bold"
          fontSize="15px"
          marginLeft="20px"
          marginTop="10px"
        >
          Contacto
        </Text>
        <Text fontSize="15px" marginLeft="20px">
          {cardData && cardData.companyEmail}
        </Text>
        <Center>
          <Button
            marginTop="20px"
            backgroundColor="#007935"
            color="white"
            _hover={{ bg: "#005e28" }}
            onClick={onOpen}
          >
            Enviar CV
          </Button>
        </Center>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="#007935">Enviar CV</ModalHeader>
            <Divider orientation="horizontal" />
            <ModalCloseButton />
            <ModalBody>
              <Text>
                {" "}
                Su currículum será enviado con la información que tiene marcada
                como visible en estos momentos en su perfil.
              </Text>
              <Text marginTop="20px">
                Debajo, puede ver una vista previa de su currículum con la
                información que será enviada. Si quiere modificar qué secciones
                de su perfil están marcadas, puede hacerlo antes de enviar.
              </Text>
              <Center>
                <PreviewPdf />
              </Center>
              <Box marginTop="20px" display="flex" justifyContent="center">
                <Text
                  color="#007935"
                  as="u"
                  onClick={() =>
                    navigate("/profile", { state: { fromJobOffer: true } })
                  }
                  style={{ cursor: "pointer" }}
                >
                  Ir al perfil
                </Text>
              </Box>
              <Box display="flex" flexDirection="column">
                <Center>
                  <Box marginTop="20px">
                    <HStack spacing={5}>
                      <Button
                        borderColor="#007935"
                        borderWidth="2px"
                        backgroundColor="white"
                        color="#007935"
                        onClick={onClose}
                      >
                        Cancelar
                      </Button>
                      <Button
                        backgroundColor="#007935"
                        _hover={{ bg: "#005e28" }}
                        color="white"
                        onClick={handleApply}
                        isLoading={isLoading}
                        loadingText="Procesando aplicación..."
                      >
                        Aplicar
                      </Button>
                    </HStack>
                  </Box>
                </Center>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenSecondModal} onClose={undoApplication}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Haga clic en Cancelar para deshacer la aplicación
            </ModalHeader>
            <ModalBody>
              La aplicación se enviará automáticamente después de {countdown}{" "}
              segundos a menos que haga clic en Cancelar.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={undoApplication}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
}

export default InfoOfferCard;
