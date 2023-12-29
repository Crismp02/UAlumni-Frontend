import React from "react";
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
  ModalBody,
  useDisclosure,
  Center,
  Box,
  HStack,
} from "@chakra-ui/react";
import { postJobApplication } from "../../services/job-offers/Job-offers.services";
import { PreviewPdf } from "./PreviewPdf";

function InfoOfferCard({ cardData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  {cardData && (() => {
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
                <PreviewPdf/>
              </Center>
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
                      onClick={()=> postJobApplication(cardData.id)}
                    >
                      Aplicar
                    </Button>
                  </HStack>
                </Box>
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
}

export default InfoOfferCard;
