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
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

const SobreMiCard = ({ cardContentSobremi, setCardContentSobremi }) => {
 

  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState("cardContent");
  const [showIcons, setShowIcons] = useState(false);
  const [cardIdToEditSobremi, setcardIdToEditSobremi] = useState(null);


  const [showAddButton, setShowAddButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const [additionalFields, setAdditionalFields] = useState({}); // Estado para campos adicionales

  const handleFieldChange = (fieldName, value) => {
    // Actualizar solo el campo correspondiente en additionalFields
    setAdditionalFields({ ...additionalFields, [fieldName]: value });
  };

  const handleEditClick = (setShowIconsFunc, setEditModeFunc) => {
    setShowIconsFunc((prevIcons) => !prevIcons);
    setEditModeFunc((prevMode) => !prevMode);
    setShowAddButton(true); // Mostrar el botón de agregar después de editar
    setShowEditButton(false); // Ocultar el botón de editar después de editar
  };

  const handleEditCard = (cardToEdit) => {
    setEditingCard(cardToEdit);
    setShowEditModal(true);
  };

  // Modal de edición Experiencial Laboral
  const handleEditInputChange = (field, value, setState) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveEdit = (
    editedCard,
    content,
    setContent,
    setShowEditModal
  ) => {
    const updatedContent = content.map((card) => {
      if (card.id === editedCard.id) {
        return { ...editedCard }; // Actualizar la tarjeta completa con los nuevos datos
      }
      return card;
    });

    setContent(updatedContent);
    setShowEditModal(false);
    // agregar cada uno de los estados de edicion
    setShowIcons(false);
    setEditMode(true);
  };

  // Función genérica para manejar la apertura del modal para agregar tarjetas
  const handleAddClick = (cardType) => {
    setCardTypeToAdd(cardType);
    setShowAddButton(false);
    setShowAddModal(true);
  };

  const handleGuardar = () => {
    let newCardContent = [];

    // Lógica para agregar datos según el tipo de tarjeta actual
    switch (cardTypeToAdd) {
      case "Sobre Mi":
        newCardContent = [
          ...cardContentSobremi,
          {
            id: cardContentSobremi.length + 1, // Generar un nuevo ID
            descripcion: additionalFields.descripcion,
          },
        ];
        setCardContentSobremi(newCardContent);
        setShowIcons(false);
        setEditMode(true);
        break;

      // Agrega lógica para otros tipos de tarjetas si es necesario
      default:
        break;
    }

    // Restablecer los campos adicionales después de guardar
    setAdditionalFields({});
    // CERRAR MODAL DE AGREGAR
    setShowAddModal(false);
  };

  const handleCancelDelete = () => {
    // Cancelar la eliminación, cerrar el modal y limpiar el estado
    setShowDeleteModal(false);
    setCardToDelete(null);
    setShowIcons(false);
    setEditMode(true);
  };

  const handleDeleteClick = (cardId, cardType) => {
    if (cardId) {
      setCardToDelete(cardId);
      setCardTypeToDelete(cardType);
      setShowDeleteModal(true);
    } else {
      console.error("ID de tarjeta es nulo.");
    }
  };

  const handleConfirmDelete = (cardToDelete, cardTypeToDelete) => {
    if (cardToDelete !== null && cardTypeToDelete !== null) {
      let updatedCardContent = [];
      if (cardTypeToDelete === "cardContent") {
        updatedCardContent = cardContentSobremi.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContentSobremi(updatedCardContent);
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="4"
      >
        <Text fontWeight="bold" marginLeft="10">
              Sobre Mí
              <EditIcon
                  cursor="pointer"
                  position="absolute"
                  right="45px"
                  color="blue.500"
                  onClick={handleEditCard}
                />
            </Text>
      </Box>

      {cardContentSobremi.map((card) => (
        <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="2"
        key={card.id}
      >
        <Text marginLeft="10" marginRight="10" marginBottom="10">
          {card.descripcion}
        </Text>
      </Box>
      ))}

      {/* Modal de edición Sobre mi*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Sobre mí</ModalHeader>
              <ModalBody>
                {/* Verificar si hay una tarjeta en edición */}
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
                      placeholder="Cuéntanos un poco sobre de ti"
                      size="lg"
                      marginBottom="4"
                      height="200px" // Aquí se establece la altura del Textarea
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    handleSaveEdit(
                      editingCard,
                      cardContentSobremi,
                      setCardContentSobremi,
                      setShowEditModal,
                    );
                  }}
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
  );
};

export default SobreMiCard;