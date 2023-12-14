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
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { editAboutMe } from "../../services/auth/MeProfile.services";

const SobremiCard = ({ cardData: initialCardData }) => {

  const [cardData, setCardData] = useState(initialCardData);
  const [cardContent, setCardContent] = useState([]);

  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState("cardContent");
  const [showIcons, setShowIcons] = useState(false);
  const [cardIdToEditSobremi, setcardIdToEditSobremi] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const toast = useToast();

  const handleEditCard = () => {
    setEditingCard({ descripcion: cardData});
    setShowEditModal(true);
  };

  // Modal de edición Sobre mí
  const handleEditInputChange = (field, value, setState) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveEdit = async () => {
  // Validar que el campo de descripción no esté vacío
  if (editingCard.descripcion.trim() === '' || editingCard.descripcion === null) {
    // Mostrar un mensaje de error o manejar la situación según lo desees
    toast({
      title: "Error",
      description: "La descripción no pueden esta vacía",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return;
  }

  // Preparar los datos para la solicitud PATCH
  const newData = {
    isVisible: true, // Ajusta esto según sea necesario
    aboutMe: editingCard.descripcion,
  };

  // Llamar a la función editAboutMe para hacer la solicitud PATCH
  const updatedCard = await editAboutMe(newData);

  // Actualizar cardContent con updatedCard
  setCardContent(updatedCard);

  // Actualizar cardData con la nueva descripción
  setCardData(newData.aboutMe); // Aquí es donde se cambió el código

  setShowEditModal(false);
  // agregar cada uno de los estados de edicion
  setShowIcons(false);
  setEditMode(true);
};

  const handleCancelDelete = () => {
    // Cancelar la eliminación, cerrar el modal y limpiar el estado
    setShowDeleteModal(false);
    setCardToDelete(null);
    setShowIcons(false);
    setEditMode(true);
  };

  const handleConfirmDelete = (cardToDelete, cardTypeToDelete) => {
    if (cardToDelete !== null && cardTypeToDelete !== null) {
      let updatedCardContent = [];
      if (cardTypeToDelete === "cardContent") {
        updatedCardContent = cardContent.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContent(updatedCardContent);
        // agregar cada uno de los estados de edicion
        setShowIcons(false);
        setEditMode(true);
      } else {
        console.error("Tipo de tarjeta no reconocido.");
        return;
      }

      // Cerrar el modal y limpiar el estado
      setShowDeleteModal(false);
      setCardToDelete(null);
    } else {
      console.error("ID de tarjeta o tipo de tarjeta es nulo.");
    }
  };

  const handleCancelEdit = () => {
    // Cancelar la edición, cerrar el modal y limpiar el estado
    setcardIdToEditSobremi(null);
    setShowEditModal(false);
  };

  return (
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
        Sobre mí
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
        {cardData ? (
      <Text>{cardData}</Text>
    ) : (
      <Text color="grey">En esta sección, puedes añadir una descripción sobre tí.</Text>
    )}
        </Flex>
      </Box>

      {/* Modal de edición Sobre mí*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Sobre Mí</ModalHeader>
          <ModalBody>
            {editingCard && (
              <>
                <Textarea
                  value={editingCard.descripcion}
                  onChange={(e) =>
                    handleEditInputChange(
                      "descripcion",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar Descripción..."
                  size="lg"
                  minHeight="200px" // Establece una altura mínima para mostrar el contenido
                  resize="vertical" // Permite el redimensionamiento vertical si el contenido supera la altura mínima
                  marginBottom="4"
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={ handleSaveEdit }
            >
              Guardar
            </Button>
            <Button variant="ghost" onClick={handleCancelEdit}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal isOpen={showDeleteModal} onClose={handleCancelDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalBody>¿Estás seguro de que deseas eliminar?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() =>
                handleConfirmDelete(cardToDelete, cardTypeToDelete)
              }
            >
              Eliminar
            </Button>
            <Button variant="ghost" onClick={handleCancelDelete}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SobremiCard;