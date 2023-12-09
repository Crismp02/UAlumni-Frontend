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
  Box,
  Flex,
  Select,
  IconButton,
  VStack,
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CustomSwitch from "./Switch";

const IdiomasCard = ({
  cardContentIdiomas,
  setCardContentIdiomas,
  idiomas,
  niveles,
}) => {
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] =
    useState("cardContentIdiomas");
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

  // Modal de edición Idiomas
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
    if (editedCard.idioma.trim() === '' || editedCard.nivel.trim() === '') {
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
    if (additionalFields.idioma.trim() === '' || additionalFields.nivel.trim() === '') {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      console.error('Los campos no pueden estar vacíos');
      return;
    }

    let newCardContent = [];

    // Lógica para agregar datos según el tipo de tarjeta actual
    switch (cardTypeToAdd) {
      case "Idiomas":
        newCardContent = [
          ...cardContentIdiomas,
          {
            id: cardContentIdiomas.length + 1, // Generar un nuevo ID
            idioma: additionalFields.idioma,
            nivel: additionalFields.nivel,
          },
        ];
        setCardContentIdiomas(newCardContent);
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
      if (cardTypeToDelete === "cardContentIdiomas") {
        updatedCardContent = cardContentIdiomas.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContentIdiomas(updatedCardContent);
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
    setShowIcons(false);
    setEditMode(true);
  };

  return (
    <>
      <Text
        fontWeight="bold"
        fontSize="xl"
        marginLeft="10"
        marginTop="5"
        marginBottom="0"
        display="flex"
        alignItems="center"
      >
        Idiomas
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
            onClick={() => handleAddClick("Idiomas")}
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

      {cardContentIdiomas.map((card) => (
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
          {/* posicion a la derecha */}
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
                onClick={() => handleDeleteClick(card.id, "cardContentIdiomas")}
              />
            </Flex>
          )}
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">{card.idioma}</Text>
            <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
              {card.nivel}
            </Text>
          </Flex>
          <Flex alignItems="center" marginTop="5px">
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

      {/* Modal de edición Idiomas*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Idiomas</ModalHeader>
          <ModalBody>
            {editingCard && (
              <>
                <Select
                  value={editingCard.idioma}
                  onChange={(e) =>
                    handleEditInputChange(
                      "idioma",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar Idioma..."
                  size="lg"
                  marginBottom="4"
                >
                  {idiomas.map((idioma) => (
                    <option key={idioma} value={idioma}>
                      {idioma}
                    </option>
                  ))}
                </Select>

                <Select
                  value={editingCard.niveles}
                  onChange={(e) =>
                    handleEditInputChange(
                      "nivel",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar Nivel..."
                  size="lg"
                  marginBottom="4"
                >
                  {niveles.map((nivel) => (
                    <option key={nivel} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </Select>
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
                  cardContentIdiomas,
                  setCardContentIdiomas,
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
            {cardTypeToAdd === "Idiomas" && (
              <>
                Idioma
                <Select
                  value={additionalFields.idioma || ""}
                  onChange={(e) => handleFieldChange("idioma", e.target.value)}
                  placeholder="Agregar Idioma"
                  marginBottom="10px"
                >
                  {idiomas.map((idioma) => (
                    <option key={idioma} value={idioma}>
                      {idioma}
                    </option>
                  ))}
                </Select>
                Nivel
                <Select
                  value={additionalFields.nivel || ""}
                  onChange={(e) => handleFieldChange("nivel", e.target.value)}
                  placeholder="Agregar Nivel"
                  marginBottom="10px"
                >
                  {niveles.map((niveles) => (
                    <option key={niveles} value={niveles}>
                      {niveles}
                    </option>
                  ))}
                </Select>
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

export default IdiomasCard;