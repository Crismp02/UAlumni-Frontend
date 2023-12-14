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
  Input,
  Textarea,
  Box,
  Flex,
  useToast,
} from "@chakra-ui/react"; 
import { EditIcon, PhoneIcon, InfoIcon } from "@chakra-ui/icons";
import { editContactInfo } from "../../services/auth/MeProfile.services";
import { Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt } from "react-icons/fa";

const ContactoCard = ({ cardData: initialCardData }) => {
  const toast = useToast();

  const [cardData, setCardData] = useState(initialCardData);
  const [cardContent, setCardContent] = useState([]);

  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState("cardContent");
  const [showIcons, setShowIcons] = useState(false);
  const [cardIdToEditContacto, setcardIdToEditContacto] = useState(null);


  const [showAddButton, setShowAddButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);


  const handleEditClick = (setShowIconsFunc, setEditModeFunc) => {
    setShowIconsFunc((prevIcons) => !prevIcons);
    setEditModeFunc((prevMode) => !prevMode);
    setShowAddButton(true); // Mostrar el botón de agregar después de editar
    setShowEditButton(false); // Ocultar el botón de editar después de editar
  };

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
      !editingCard.telephoneNumber &&
      !editingCard.address &&
      editingCard.telephoneNumber.trim() === '' ||
      editingCard.address.trim() === ''
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
    telephoneNumber: editingCard.telephoneNumber, // Ajusta esto según sea necesario
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
      <Text
        fontWeight="bold"
        fontSize="xl"
        marginLeft="10"
        marginTop="10"
        marginBottom="0"
        display="flex"
        alignItems="center"
      >
        Contacto
          <EditIcon
            cursor="pointer"
            position="absolute"
            right="45px"
            color="blue.500"
            onClick={() => handleEditCard(cardData)}
          />
      </Text>

        <Box
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
          <Flex>
            <PhoneIcon color="blue.500" marginRight="20px" marginTop="5px" />
            <Text fontWeight="bold">{cardData.telephoneNumber}</Text>
          </Flex>
        </Box>
        <Box
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
          <Flex>
            <Icon as={FaMapMarkerAlt} color="blue.500" marginRight="20px" marginTop="5px"/>
            <Text fontWeight="bold">{cardData.address}</Text>
          </Flex>
        </Box>

      {/* Modal de edición Contacto*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Contacto</ModalHeader>
          <ModalBody>
            {editingCard && (
              <>
                <Input
                  value={editingCard.telephoneNumber}
                  onChange={(e) =>
                    handleEditInputChange(
                      "telephoneNumber",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar teléfono..."
                  size="lg"
                  marginBottom="4"
                />
                <Textarea
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
              colorScheme="blue"
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
            <Button variant="ghost" onClick={handleCancelEdit}>
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