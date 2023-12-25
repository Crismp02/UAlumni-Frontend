import React, { useState } from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Textarea,
  Box,
  Flex,
  useToast,
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { editContactInfo } from "../../services/auth/MeProfile.services";

const ContactoCard = ({ cardData: initialCardData }) => {
  const toast = useToast();

  const [cardData, setCardData] = useState(initialCardData);
  const [cardContent, setCardContent] = useState([]);

  const [editMode, setEditMode] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [cardIdToEditContacto, setcardIdToEditContacto] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleEditCard = () => {
    setEditingCard(cardData);
    setShowEditModal(true);
  };

  // Modal de edición Contacto
  const handleEditInputChange = (field, value, setState) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveEdit = async () => {
    if (
      !editingCard &&
      !editingCard.address &&
      editingCard.address.trim() === ""
    ) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "Los campos no pueden estar vacíos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud PATCH
    const newData = {
      address: editingCard.address,
    };

    // Llamar a la función editContactInfo para hacer la solicitud PATCH
    const updatedCard = await editContactInfo(newData);

    // Actualizar cardContent con updatedCard
    setCardContent(updatedCard);

    // Actualizar cardData con la nueva descripción
    setCardData(newData); // Aquí es donde se cambió el código

    setShowEditModal(false);
    // agregar cada uno de los estados de edicion
    setShowIcons(false);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    // Cancelar la edición, cerrar el modal y limpiar el estado
    setcardIdToEditContacto(null);
    setShowEditModal(false);
  };

  return (
    <>
      {cardData && (
        <>
          <Card>
            <CardBody p="10px">
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  fontWeight="bold"
                  fontSize="md"
                  marginLeft="2"
                  marginBottom="1"
                  display="flex"
                  alignItems="center"
                  color="#007935"
                >
                  Contacto
                </Text>
                <EditIcon
                  cursor="pointer"
                  display="flex"
                  justifySelf="flex-end"
                  color="#C0C0C0"
                  onClick={() => handleEditCard(cardData)}
                />
              </Box>
              <Divider orientation="horizontal" />
              <Box
                border="2px solid #007935"
                borderTop="none"
                borderRight="none"
                borderBottom="none"
                marginTop="3"
                paddingLeft="2"
              >
                <Flex>
                  <Text fontWeight="bold" fontSize="15px">
                    Dirección
                  </Text>
                </Flex>
                <Text>{cardData.address}</Text>
              </Box>
            </CardBody>
          </Card>

          {/* Modal de edición Contacto*/}
          <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="#007935">Editar Contacto</ModalHeader>
              <Divider orientation="horizontal" />
              <ModalBody>
                {editingCard && (
                  <>
                    <Text marginTop="2px" as="b">Dirección</Text>
                    <Textarea
                    marginTop="2px"
                      value={editingCard.address}
                      onChange={(e) =>
                        handleEditInputChange(
                          "address",
                          e.target.value,
                          setEditingCard
                        )
                      }
                      placeholder="Ciudad, Estado, País"
                      size="lg"
                      marginBottom="4"
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  bgColor="#007935"
                  color="white"
                  _hover={{ bg: "#025024" }}
                  mr={3}
                  onClick={() =>
                    handleSaveEdit(
                      editingCard,
                      cardData,
                      setCardContent,
                      setShowEditModal
                    )
                  }
                >
                  Guardar
                </Button>
                <Button variant="ghost" onClick={handleCancelEdit} color="#007935" style={{ borderColor: '#007935', borderWidth: '2px' }}>
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default ContactoCard;
