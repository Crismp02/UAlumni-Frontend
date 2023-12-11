import React, { useState, useEffect } from "react";
import { format, addDays } from 'date-fns';
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
  IconButton,
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CustomSwitch from "./Switch";
import { AddHigherEducationStudy, DeleteHigherEducationStudy, EditHigherEducationStudy, getHigherEducationStudies, getHigherEducationStudy } from "../../services/auth/MeProfile.services";

const EducacionCard = () => {

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      const data = await getHigherEducationStudies();
      if (Array.isArray(data.data.items)) {
        setCardData(data.data.items);
      } else {
        console.error('data.data.items no es un array');
      }
    };
  
    fetchCardData();
  }, []);

  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState("cardContent");
  const [showIcons, setShowIcons] = useState(false);
  const [cardIdToEditEducacion, setcardIdToEditEducacion] = useState(null);

  const [showAddButton, setShowAddButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const [additionalFields, setAdditionalFields] = useState({}); // Estado para campos adicionales

  const handleAddEducation = async () => {
    // Validar que los campos no estén vacíos
    if (additionalFields.title.trim() === '' || additionalFields.institution.trim() === '' || additionalFields.endDate.trim() === '' || additionalFields.title.trim() === null || additionalFields.institution.trim() === null || additionalFields.endDate.trim() === null) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      console.error('Los campos no pueden estar vacíos');
      return;
    }
  
    // Preparar los datos para la solicitud POST
    const newData = {
      title: additionalFields.title,
      institution: additionalFields.institution,
      endDate: additionalFields.endDate,
      isVisible: true,
    };
  
    // Llamar a la función AddHigherEducationStudy con los datos preparados
    const newCard = await AddHigherEducationStudy(newData);
  
    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setCardData(prevCardData => [...prevCardData, newCard.data]);
    }

    // Cerrar el modal de agregar y restablecer los campos adicionales
    setShowAddModal(false);
    setAdditionalFields({});
  };

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

  useEffect(() => {
    if (editingCard) {
      setShowEditModal(true);
    }
  }, [editingCard]);

  const [originalTitle, setOriginalTitle] = useState(null);

  const handleEditCard = async (cardTitle) => {
    const cardToEdit = await getHigherEducationStudy(cardTitle);
    
    // Formatear la fecha y agregar un día
  const date = new Date(cardToEdit.endDate);
  const datePlusOneDay = addDays(date, 1);
  const formattedDate = format(datePlusOneDay, 'yyyy-MM-dd');
  cardToEdit.endDate = formattedDate;
  
    setEditingCard(cardToEdit);
    setOriginalTitle(cardTitle); // Guardar el título original
  };

  // Modal de edición Experiencial Laboral
  const handleEditInputChange = (field, value, setState) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const [content, setContent] = useState(null);

  const handleSaveEdit = async () => {

    // Validar que los campos no estén vacíos
    if (editingCard.title.trim() === '' || editingCard.institution.trim() === '' || editingCard.endDate.trim() === '' || editingCard.title.trim() === null || editingCard.institution.trim() === null || editingCard.endDate.trim() === null ) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      console.error('Los campos no pueden estar vacíos');
      return;
    }

    // Preparar los datos para la solicitud PATCH
  const newData = {
    title: editingCard.title, // Ajusta esto según sea necesario
    institution: editingCard.institution,
    endDate: editingCard.endDate,
    isVisible: true,
  };

  const updatedCard = await EditHigherEducationStudy(originalTitle, newData);

  setContent(updatedCard);

  // Actualizar cardData con los nuevos datos
  const updatedCardData = cardData.map(card => {
    if (card.title === originalTitle) {
      return { ...card, title: newData.title, institution: newData.institution, endDate: newData.endDate };
    } else {
      return card;
    }
  });
  setCardData(updatedCardData);

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

  

  const handleCancelDelete = () => {
    // Cancelar la eliminación, cerrar el modal y limpiar el estado
    setShowDeleteModal(false);
    setCardToDelete(null);
    setShowIcons(false);
    setEditMode(true);
  };

  const handleDeleteClick = (cardTitle, cardType) => {
    setOriginalTitle(cardTitle); 
    if (cardTitle) {
      setCardToDelete(cardTitle);
      setCardTypeToDelete(cardType);
      setShowDeleteModal(true);
    } else {
      console.error("ID de tarjeta es nulo.");
    }
  };

  const handleConfirmDelete = async (cardToDelete, cardTypeToDelete) => {
    if (cardToDelete !== null && cardTypeToDelete !== null) {
      if (cardTypeToDelete === "cardContent") {
        await DeleteHigherEducationStudy(originalTitle);
        const updatedCardData = cardData.filter(card => card.title !== cardToDelete);
        setCardData(updatedCardData);
        setShowIcons(false);
        setEditMode(true);
      } else {
        console.error("Tipo de tarjeta no reconocido.");
        return;
      }
      setShowDeleteModal(false);
      setCardToDelete(null);
    } else {
      console.error("ID de tarjeta o tipo de tarjeta es nulo.");
    }
  };

  const handleCancelEdit = () => {
    // Cancelar la edición, cerrar el modal y limpiar el estado
    setcardIdToEditEducacion(null);
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
        marginTop="10"
        marginBottom="0"
        display="flex"
        alignItems="center"
      >
        Educación
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
            onClick={() => handleAddClick("Educación")}
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

      {Array.isArray(cardData)  && cardData.map((item, index) => (
        <Box
          key={index}
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
          {/* posición a la derecha */}
          {showIcons && (
            <Flex justifyContent="flex-end" marginBottom="10px">
              <IconButton
                aria-label="Editar"
                icon={<EditIcon />}
                colorScheme="blue"
                marginRight="5px"
                onClick={() => handleEditCard(item.title)}
              />
              <IconButton
                aria-label="Eliminar"
                icon={<DeleteIcon />}
                colorScheme="red"
                marginLeft="5px"
                onClick={() => handleDeleteClick(item.title, "cardContent")}
              />
            </Flex>
          )}
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">{item.title}</Text>
          </Flex>

          <Text>{item.institution}</Text>
          {addDays(new Date(item.endDate), 1).getFullYear()}
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

      {/* Modal de edición Educación*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Estudios Realizados</ModalHeader>
          <ModalBody>
            {editingCard && (
              <>
                <Input
                  value={editingCard.title}
                  onChange={(e) =>
                    handleEditInputChange(
                      "title",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar grado..."
                  size="lg"
                  marginBottom="4"
                />
                <Input
                  value={editingCard.institution}
                  onChange={(e) =>
                    handleEditInputChange(
                      "institution",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar institución..."
                  size="lg"
                  marginBottom="4"
                />
                Fecha de culminación
                <Input
                  value={editingCard.endDate}
                  onChange={(e) =>
                    handleEditInputChange(
                      "endDate",
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

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar {cardTypeToAdd}</ModalHeader>
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            {cardTypeToAdd === "Educación" && (
              <>
                Grado
                <Input
                  value={additionalFields.title || ""}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  placeholder="Grado"
                  marginBottom="10px"
                />
                Institución
                <Input
                  value={additionalFields.institution || ""}
                  onChange={(e) =>
                    handleFieldChange("institution", e.target.value)
                  }
                  placeholder="Institución"
                  marginBottom="10px"
                />
                Fecha Final
                <Input
                  value={additionalFields.endDate || ""}
                  onChange={(e) =>
                    handleFieldChange("endDate", e.target.value)
                  }
                  type="date"
                  marginBottom="10px"
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddEducation}>
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

export default EducacionCard;