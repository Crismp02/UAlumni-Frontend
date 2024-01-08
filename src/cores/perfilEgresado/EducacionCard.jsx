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
  Card,
  CardBody,
  Divider,
  Checkbox,
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import {
  AddHigherEducationStudy,
  DeleteHigherEducationStudy,
  EditHigherEducationStudy,
  getHigherEducationStudy,
} from "../../services/auth/MeProfile.services";

const EducacionCard = ({ cardData, setCardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setNewCardData(cardData);
  }, [cardData]);

  useEffect(() => {
    const checkedItems = newCardData
      .filter((item) => item.isVisible)
      .map((item) => item.title);
    setCheckedItems(checkedItems);
  }, [newCardData]);

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

  const handleCheckAll = async (e) => {
    if (e.target.checked) {
      setCheckedItems(newCardData.map((item) => item.title));
      // Update all items to be isVisible: true in the backend and local state
      const updatedData = newCardData.map((item) => ({
        ...item,
        isVisible: true,
      }));
      for (const item of updatedData) {
        await EditHigherEducationStudy(item.title, item);
      }
      setNewCardData(updatedData);
    } else {
      setCheckedItems([]);
      // Update all items to be isVisible: false in the backend and local state
      const updatedData = newCardData.map((item) => ({
        ...item,
        isVisible: false,
      }));
      for (const item of updatedData) {
        await EditHigherEducationStudy(item.title, item);
      }
      setNewCardData(updatedData);
    }
  };

  const handleCheck = async (e, item) => {
    const isChecked = e.target.checked;
    const updatedItem = { ...item, isVisible: isChecked };

    if (isChecked) {
      setCheckedItems([...checkedItems, item.title]);
    } else {
      setCheckedItems(checkedItems.filter((title) => title !== item.title));
    }

    try {
      // Update the isVisible property in the backend
      await EditHigherEducationStudy(item.title, updatedItem);
      // Update the isVisible property in the local state
      setNewCardData((prevData) =>
        prevData.map((card) => (card.title === item.title ? updatedItem : card))
      );
    } catch (error) {
      // Handle error
      console.error("Error updating item:", error);
    }
  };

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

    const TitleExists = newCardData.some(
      (card) =>
        card.title === newData.title 
    );

    if (TitleExists) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "Ese grado de Estudio Realizado ya existe",
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

    // Verificar si la tarjeta ya existe en newCardData
  const existingCard = newCardData.find(card => card.title === editingCard.title && card.institution === editingCard.institution && card.title !== originalTitle);
  if (existingCard) {
    // Mostrar un mensaje de error en un toast
    toast({
      title: "Error",
      description: "Ese estudio realizado ya existe",
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
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="left">
              <Checkbox
                colorScheme="green"
                isChecked={checkedItems.length === newCardData.length}
                onChange={handleCheckAll}
              />
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
            </Flex>
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
              <Flex key={index} alignItems="center" marginTop="3">
                <Checkbox
                  colorScheme="green"
                  isChecked={checkedItems.includes(item.title)}
                  onChange={(e) => handleCheck(e, item)}
                  marginRight="5px"
                />
                <Box
                  key={index}
                  border="2px solid #007935"
                  borderTop="none"
                  borderRight="none"
                  borderBottom="none"
                  marginTop="3"
                  paddingLeft="2"
                  width="100%"
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
                      <EditIcon
                        cursor="pointer"
                        display="flex"
                        justifySelf="flex-end"
                        color="#C0C0C0"
                        onClick={() => handleEditCard(item.title)}
                      />
                      <DeleteIcon
                        cursor="pointer"
                        display="flex"
                        justifySelf="flex-end"
                        marginLeft="10px"
                        color="#C0C0C0"
                        onClick={() =>
                          handleDeleteClick(item.title, "cardContent")
                        }
                      />
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            ))
          ) : (
            <Box
            marginTop="10px"
            border="2px solid #007935"
            borderTop="none"
            borderRight="none"
            borderBottom="none"
            paddingLeft="2"
            >
              <Text color="grey">
                En esta sección, puedes añadir tus estudios realizados. No
                incluya estudios de primaria o secundaria.
              </Text>
            </Box>
          )}
        </CardBody>
      </Card>

      {/* Modal de edición Educación*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">Editar estudio realizado</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {editingCard && (
              <>
                <Text marginTop="2px" as="b">
                  Grado del estudio
                </Text>
                <Input
                  value={editingCard.title}
                  onChange={(e) =>
                    handleEditInputChange(
                      "title",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Grado del estudio"
                  size="lg"
                  marginBottom="4"
                />
                <Text marginTop="2px" as="b">
                  Institución del estudio
                </Text>
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
                <Text marginTop="2px" as="b">
                  Fecha de finalización
                </Text>
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
              onClick={handleSaveEdit}
              bgColor="#007935"
              color="white"
              _hover={{ bg: "#025024" }}
            >
              Guardar
            </Button>
            <Button
              variant="ghost"
              onClick={handleCancelEdit}
              color="#007935"
              style={{ borderColor: "#007935", borderWidth: "2px" }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">Agregar estudio realizado</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            <>
              <Text marginTop="2px" as="b">
                Grado del estudio
              </Text>
              <Input
                value={additionalFields.title || ""}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Grado del estudio"
                marginBottom="10px"
              />
              <Text marginTop="2px" as="b">
                Institución del estudio
              </Text>
              <Input
                value={additionalFields.institution || ""}
                onChange={(e) =>
                  handleFieldChange("institution", e.target.value)
                }
                placeholder="Institución del estudio"
                marginBottom="10px"
              />
              <Text marginTop="2px" as="b">
                Fecha de finalización
              </Text>
              <Input
                value={additionalFields.endDate || ""}
                onChange={(e) => handleFieldChange("endDate", e.target.value)}
                type="date"
                marginBottom="10px"
              />
            </>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddEducation}
              bgColor="#007935"
              color="white"
              _hover={{ bg: "#025024" }}
            >
              Guardar
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowAddModal(false)}
              color="#007935"
              style={{ borderColor: "#007935", borderWidth: "2px" }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal de confirmación para eliminar */}
      <Modal isOpen={showDeleteModal} onClose={handleCancelDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">Eliminar estudio realizado</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            ¿Está seguro de que desea eliminar este estudio realizado?
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
