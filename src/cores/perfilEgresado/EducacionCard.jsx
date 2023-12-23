import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
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
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import CustomSwitch from "./Switch";
import {
  AddHigherEducationStudy,
  DeleteHigherEducationStudy,
  EditHigherEducationStudy,
  getHigherEducationStudy,
} from "../../services/auth/MeProfile.services";

const EducacionCard = ({ cardData, setCardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);

  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  const toast = useToast();

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
    if (
      !additionalFields.title ||
      additionalFields.title.trim() === "" ||
      !additionalFields.institution ||
      additionalFields.institution.trim() === "" ||
      !additionalFields.endDate ||
      additionalFields.endDate.trim() === ""
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

    // Preparar los datos para la solicitud POST
    const newData = {
      title: additionalFields.title,
      institution: additionalFields.institution,
      endDate: additionalFields.endDate,
      isVisible: true,
    };

    // Verificar si la tarjeta ya existe
    const cardExists = newCardData.some(
      (card) =>
        card.title === newData.title &&
        card.institution === newData.institution &&
        card.endDate === newData.endDate
    );

    if (cardExists) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "Ese Estudio Realizado ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Llamar a la función AddHigherEducationStudy con los datos preparados
    const newCard = await AddHigherEducationStudy(newData);

    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData((prevCardData) => [...prevCardData, newCard.data]);
    }
    // Mostrar un toast de éxito
    toast({
      title: "Éxito",
      description: "El Estudio Realizado se ha añadido con éxito",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

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
    const formattedDate = format(datePlusOneDay, "yyyy-MM-dd");
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
    if (
      editingCard.title.trim() === "" ||
      editingCard.institution.trim() === "" ||
      editingCard.endDate.trim() === "" ||
      editingCard.title.trim() === null ||
      editingCard.institution.trim() === null ||
      editingCard.endDate.trim() === null
    ) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
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
      title: editingCard.title, // Ajusta esto según sea necesario
      institution: editingCard.institution,
      endDate: editingCard.endDate,
      isVisible: true,
    };

    // Verificar si la tarjeta ya existe
    const cardExists = cardData.some(
      (card) =>
        card.title === newData.title &&
        card.institution === newData.institution &&
        card.endDate === newData.endDate &&
        card.title !== originalTitle // Excluir la tarjeta original que se está editando
    );

    if (cardExists) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "Ese Estudio Realizado ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedCard = await EditHigherEducationStudy(originalTitle, newData);

    setContent(updatedCard);

    // Actualizar cardData con los nuevos datos
    const updatedCardData = cardData.map((card) => {
      if (card.title === originalTitle) {
        return {
          ...card,
          title: newData.title,
          institution: newData.institution,
          endDate: newData.endDate,
        };
      } else {
        return card;
      }
    });

    setNewCardData(updatedCardData);
    // Mostrar un toast de éxito
    toast({
      title: "Éxito",
      description: "El Estudio Realizado se ha editado con éxito",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

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
        await DeleteHigherEducationStudy(cardToDelete);
        const updatedCardData = cardData.filter(
          (card) => card.title !== cardToDelete
        );
        setNewCardData(updatedCardData);
        setShowIcons(false);
        setEditMode(true);
        toast({
          title: "Éxito",
          description: "El Estudio Realizado ha sido eliminado con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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
    <Card marginTop="20px">
        <CardBody p="10px">
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Text
            fontWeight="bold"
            fontSize="md"
            marginLeft="2"
            marginBottom="1"
            display="flex"
            alignItems="center"
            color="#007935"
          >
            Estudios Realizados
          </Text>
          <AddIcon
            onClick={() => handleAddClick("Educación")}
            cursor="pointer"
            color="white"
            bg="#007935"
            borderRadius="10px"
            width="30px"
            height="25px"
            padding="6px"
          />
          </Box>
          <Divider orientation="horizontal" />

          {Array.isArray(newCardData) && newCardData.length > 0 ? (
        newCardData.map((item, index) => (
          <Box
            key={index}
             border="2px solid #007935"
              borderTop="none"
              borderRight="none"
              borderBottom="none"
              marginTop="3"
              paddingLeft="2"
          >
            <Box>
            <Flex justifyContent="space-between" alignItems="center">
            <Flex justifyContent="space-between">
              <Text fontWeight="bold">{item.title}</Text>
            </Flex>
            {addDays(new Date(item.endDate), 1).getFullYear()}
            </Flex>
            

            <Text>{item.institution}</Text>
           
            </Box>
            <Box>
            <Flex justifyContent="flex-end">
          <EditIcon cursor="pointer"
            display="flex"
            justifySelf="flex-end"
            color="#C0C0C0"
            onClick={() => handleEditCard(item.title)}/>
          <DeleteIcon
          cursor="pointer"
          display="flex"
          justifySelf="flex-end"
          marginLeft="10px"
          color="#C0C0C0"
          onClick={() =>
            handleDeleteClick(item.title, "cardContent")
          }/>
        </Flex>
            </Box>
          </Box>
        ))
      ) : (
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
          <Text color="grey">
            En esta sección, puedes añadir tus estudios realizados
          </Text>
        </Box>
      )}

          </CardBody>
          </Card>

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
            <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
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
                  onChange={(e) => handleFieldChange("endDate", e.target.value)}
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
          <ModalHeader>Eliminación Estudio Realizado</ModalHeader>
          <ModalBody>
            ¿Está seguro de que desea eliminar este Estudio Realizado?
          </ModalBody>
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
