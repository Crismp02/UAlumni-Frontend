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
import { AddIcon, EditIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";

const HabilidadesCard = ({
  cardContentHabilidades,
  setCardContentHabilidades,
  tipoHabilidad
}) => {
  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState(
    "cardContentHabilidades"
  );
  const [showIcons, setShowIcons] = useState(false);
  const [cardIdToEditExpLaboral, setcardIdToEditExpLaboral] = useState(null);

  const [showAddButton, setShowAddButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
    setShowIcons(true);
  };


  const handleSaveEdit = (
    editedCard,
    content,
    setContent,
    setShowEditModal
  ) => {

    // Validar que los campos no estén vacíos
    if (editedCard.habilidad.trim() === '') {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      console.error('No puede estar vacío');
      return;
    }

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

    // Validar que los campos no estén vacíos
    if (additionalFields.habilidad.trim() === '') {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      console.error('Los campos no pueden estar vacíos');
      return;
    }

    let newCardContent = [];

    // Lógica para agregar datos según el tipo de tarjeta actual
    switch (cardTypeToAdd) {
      case tipoHabilidad:
        newCardContent = [
          ...cardContentHabilidades,
          {
            id: cardContentHabilidades.length + 1, // Generar un nuevo ID
            habilidad: additionalFields.habilidad,
          },
        ];
        setCardContentHabilidades(newCardContent);
        setEditMode(true);
        setShowIcons(false);

        break;

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
      if (cardTypeToDelete === "cardContentHabilidades") {
        updatedCardContent = cardContentHabilidades.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContentHabilidades(updatedCardContent);
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
    setcardIdToEditExpLaboral(null);
    setShowEditModal(false);
  };

  return (
    <>
      {/* Texto Principal Habilidades */}
      
      <Text
  fontSize="lg"
  marginLeft="10"
  marginRight="10"
  marginTop="5"
>
  {tipoHabilidad}
  {editMode ? (
    <EditIcon
      cursor="pointer"
      position="absolute"
      right="45px"
      color="blue.500"
      onClick={() => handleEditClick(setShowIcons, setEditMode)}
    />
  ) : (
    <AddIcon
      cursor="pointer"
      color="white"
      position="absolute"
      right="45px"
      bg="#007935"
      borderRadius="10px"
      width="42px"
      height="33px"
      padding="8px"
      onClick={() => handleAddClick(tipoHabilidad)}
    />
  )}
</Text>
<Box
  display="flex"
  flexDirection="row"
  flexWrap="wrap"
  marginLeft="10"
  marginRight="10"
  marginBottom="5"
>
  {cardContentHabilidades.map((card) => (
    <Box
      key={card.id}
      position="relative"
      padding="2"
      marginRight="2"
    >
      <Box padding="2" marginBottom="2" marginRight="2">
        <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
          {card.habilidad}
        </Text>
        {showIcons && (
          <CloseIcon
            color="black"
            position="absolute"
            top="9px"
            right="17px"
            fontSize="16px"
            cursor="pointer"
            display={showIcons ? "block" : "none"}
            onClick={() => handleDeleteClick(card.id, "cardContentHabilidades")}
          />
        )}
      </Box>
    </Box>
  ))}
</Box>

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Habilidades {cardTypeToAdd}</ModalHeader>
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            {cardTypeToAdd === tipoHabilidad && (
              <>
                <Input
                  value={additionalFields.habilidad || ""}
                  onChange={(e) =>
                    handleFieldChange("habilidad", e.target.value)
                  }
                  placeholder="Habilidad"
                  marginBottom="10px"
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleGuardar}>
              Guardar
            </Button>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
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

export default HabilidadesCard;