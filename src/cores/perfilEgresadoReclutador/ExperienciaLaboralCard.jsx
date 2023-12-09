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
  VStack,
  IconButton
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon, CalendarIcon } from "@chakra-ui/icons";

const ExperienciaLaboralCard = ({ cardContent, setCardContent }) => {
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState("cardContent");
  const [showIcons, setShowIcons] = useState(false);
  const [cardIdToEditExpLaboral, setcardIdToEditExpLaboral] = useState(null);

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
    if (editedCard.empresa.trim() === '' || editedCard.posicion.trim() === '' || editedCard.descripcion.trim() === '' || editedCard.fechaInicio.trim() === '' || editedCard.fechaFinal.trim() === '') {
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
  if (additionalFields.empresa.trim() === '' || additionalFields.posicion.trim() === '' || additionalFields.descripcion.trim() === '' || additionalFields.fechaInicio.trim() === '' || additionalFields.fechaFinal.trim() === '') {
    // Mostrar un mensaje de error o manejar la situación según lo desees
    console.error('Los campos no pueden estar vacíos');
    return;
  }

    let newCardContent = [];

    // Lógica para agregar datos según el tipo de tarjeta actual
    switch (cardTypeToAdd) {
      case "Experiencia Laboral":
        newCardContent = [
          ...cardContent,
          {
            id: cardContent.length + 1, // Generar un nuevo ID
            empresa: additionalFields.empresa,
            descripcion: additionalFields.descripcion,
            posicion: additionalFields.posicion,
            fechaInicio: additionalFields.fechaInicio,
            fechaFinal: additionalFields.fechaFinal,
          },
        ];
        setCardContent(newCardContent);
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
    setcardIdToEditExpLaboral(null);
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
        Experiencia Laboral
      </Text>

  {cardContent.map((card) => (
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
          onClick={() => handleDeleteClick(card.id, "cardContent")}
        />
      </Flex>
    )}
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontWeight="bold">{card.empresa}</Text>
      <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
        {card.posicion}
      </Text>
    </Flex>

    <Flex justifyContent="space-between" alignItems="center" marginTop="5px">
      <Text>{card.descripcion}</Text>
    </Flex>
    <Flex justifyContent="space-between" alignItems="center" marginTop="5px">
      <Text>
        {card.fechaInicio} - {card.fechaFinal} <CalendarIcon color="blue.500" marginLeft="5px" />
      </Text>
    </Flex>
  </Box>
))}


      {/* Modal de edición Experiencia Laboral*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Experiencia Laboral</ModalHeader>
          <ModalBody>
            {editingCard && (
              <>
                <Input
                  value={editingCard.empresa}
                  onChange={(e) =>
                    handleEditInputChange(
                      "empresa",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar empresa..."
                  size="lg"
                  marginBottom="4"
                />
                <Input
                  value={editingCard.posicion}
                  onChange={(e) =>
                    handleEditInputChange(
                      "posicion",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar posición..."
                  size="lg"
                  marginBottom="4"
                />
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
                  marginBottom="4"
                />
                Fecha Inicio
                <Input
                  value={editingCard.fechaInicio}
                  onChange={(e) =>
                    handleEditInputChange(
                      "fechaInicio",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  size="lg"
                  marginBottom="4"
                  type="date"
                />
                Fecha Final
                <Input
                  value={editingCard.fechaFinal}
                  onChange={(e) =>
                    handleEditInputChange(
                      "fechaFinal",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  size="lg"
                  marginBottom="4"
                  type="date"
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
                  cardContent,
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

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar {cardTypeToAdd}</ModalHeader>
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            {cardTypeToAdd === "Experiencia Laboral" && (
              <>
                <Input
                  value={additionalFields.grado || ""}
                  onChange={(e) => handleFieldChange("grado", e.target.value)}
                  placeholder="Grado"
                  marginBottom="10px"
                />
                Fecha
                <Input
                  value={additionalFields.anioFinal || ""}
                  onChange={(e) =>
                    handleFieldChange("anioFinal", e.target.value)
                  }
                  type="date"
                  marginBottom="10px"
                />
              </>
            )}
            {cardTypeToAdd === "Experiencia Laboral" && (
              <>
                <Input
                  placeholder="Nombre Empresa"
                  marginBottom="10px"
                  value={additionalFields.empresa || ""}
                  onChange={(e) => handleFieldChange("empresa", e.target.value)}
                />
                <Input
                  value={additionalFields.posicion || ""}
                  onChange={(e) =>
                    handleFieldChange("posicion", e.target.value)
                  }
                  placeholder="Posición"
                  marginBottom="10px"
                />
                <Textarea
                  value={additionalFields.descripcion || ""}
                  onChange={(e) =>
                    handleFieldChange("descripcion", e.target.value)
                  }
                  placeholder="Descripción..."
                  marginBottom="10px"
                />
                Fecha Inicio
                <Input
                  value={additionalFields.fechaInicio || ""}
                  onChange={(e) =>
                    handleFieldChange("fechaInicio", e.target.value)
                  }
                  type="date"
                  placeholder="Posición"
                  marginBottom="10px"
                />
                Fecha Final
                <Input
                  value={additionalFields.fechaFinal || ""}
                  onChange={(e) =>
                    handleFieldChange("fechaFinal", e.target.value)
                  }
                  type="date"
                  placeholder="Posición"
                  marginBottom="10px"
                />
                {/* ... Otros campos específicos de Experiencia Laboral ... */}
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

export default ExperienciaLaboralCard;