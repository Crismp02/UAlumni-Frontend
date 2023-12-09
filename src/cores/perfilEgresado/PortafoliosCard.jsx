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
  IconButton,
  VStack
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CustomSwitch from "./Switch";


const PortafoliosCard = ({
  cardContentPortafolios,
  setCardContentPortafolios,
}) => {
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };
  
  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState(
    "cardContentPortafolios"
  );
  const [showIcons, setShowIcons] = useState(false);
  const [cardIdToEdit, setcardIdToEdit] = useState(null);

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

    // Validar que los campos no estén vacíos
    if (editedCard.titulo.trim() === '' || editedCard.url.trim() === '') {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      console.error('Los campos no pueden estar vacíos');
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

    // Validar que los campos no estén vacíos antes de guardar
    if (additionalFields.titulo.trim() === '' || additionalFields.url.trim() === '') {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      console.error('Los campos no pueden estar vacíos');
      return;
    }

    let newCardContent = [];

    // Lógica para agregar datos según el tipo de tarjeta actual
    switch (cardTypeToAdd) {
      case "Portafolios":
        newCardContent = [
          ...cardContentPortafolios,
          {
            id: cardContentPortafolios.length + 1, // Generar un nuevo ID
            titulo: additionalFields.titulo,
            descripcion: additionalFields.descripcion,
            url: additionalFields.url,
            fechaInicio: additionalFields.fechaInicio,
            fechaFinal: additionalFields.fechaFinal,
          },
        ];
        setCardContentPortafolios(newCardContent);
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
      if (cardTypeToDelete === "cardContentPortafolios") {
        updatedCardContent = cardContentPortafolios.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContentPortafolios(updatedCardContent);
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
    setcardIdToEdit(null);
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
        Portafolios
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
            onClick={() => handleAddClick("Portafolios")}
            cursor="pointer"
            color="white"
            position="absolute"
            right="45px"
            bg="#007935"
            borderRadius="10px"
            width="42px"
            height="33px"
            padding="8px"
          />
        )}
      </Text>

      {cardContentPortafolios.map((card) => (
        <Box
          key={card.id}
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
          {showIcons && (
            <Flex justifyContent="flex-end" marginBottom="10px">
              <IconButton
                aria-label="Editar"
                icon={<EditIcon />}
                colorScheme="blue"
                marginRight="5px"
                onClick={() => handleEditCard(card)}
              />
              <IconButton
                aria-label="Eliminar"
                icon={<DeleteIcon />}
                colorScheme="red"
                marginLeft="5px"
                onClick={() =>
                  handleDeleteClick(card.id, "cardContentPortafolios")
                }
              />
            </Flex>
          )}
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">{card.titulo}</Text>
          </Flex>
          <Text>{card.url}</Text>
          <Flex alignItems="center" marginTop="10px">
            <CustomSwitch
              isChecked={switchValue}
              onChange={handleSwitchChange}
            />
            {switchValue && (
              <Text
                fontSize="sm"
                color="black"
                marginLeft="10px"
                fontWeight="bold"
                alignItems="center"
              >
                Visible
              </Text>
            )}
          </Flex>
        </Box>
      ))}

      {/* Modal de edición Portafolios*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Portafolios</ModalHeader>
          <ModalBody>
            {editingCard && (
              <>
                <Input
                  value={editingCard.titulo}
                  onChange={(e) =>
                    handleEditInputChange(
                      "titulo",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar titulo..."
                  size="lg"
                  marginBottom="4"
                />
                <Input
                  value={editingCard.url}
                  onChange={(e) =>
                    handleEditInputChange("url", e.target.value, setEditingCard)
                  }
                  placeholder="Editar Url..."
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
                  cardContentPortafolios,
                  setCardContentPortafolios,
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

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar {cardTypeToAdd}</ModalHeader>
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            {cardTypeToAdd === "Portafolios" && (
              <>
                <Input
                  value={additionalFields.titulo || ""}
                  onChange={(e) => handleFieldChange("titulo", e.target.value)}
                  placeholder="Título"
                  marginBottom="10px"
                />

                <Input
                  value={additionalFields.url || ""}
                  onChange={(e) => handleFieldChange("url", e.target.value)}
                  placeholder="Url del portafolio"
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

export default PortafoliosCard;