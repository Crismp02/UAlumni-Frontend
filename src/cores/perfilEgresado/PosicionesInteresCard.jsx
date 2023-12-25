import React, { useState, useEffect } from "react";
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
  AddPositionOfInterest,
  deletePositionOfInterest,
  editPositionOfInterest,
  getPositionOfInterestItem,
} from "../../services/auth/MeProfile.services";

const PosicionesInteresCard = ({ cardData, setCardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setNewCardData(cardData);
    const checkedItems = cardData
      .filter((item) => item.isVisible)
      .map((item) => item.positionName);
    setCheckedItems(checkedItems);
  }, [cardData]);

  const toast = useToast();

  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState(
    "cardContentPortafolios"
  );
  const [showIcons, setShowIcons] = useState(false);
  const [cardIdToEdit, setcardIdToEdit] = useState(null);

  const [showAddButton, setShowAddButton] = useState(false);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const [additionalFields, setAdditionalFields] = useState({}); // Estado para campos adicionales

  const handleCheckAll = async (e) => {
    if (e.target.checked) {
      setCheckedItems(newCardData.map((item) => item.positionName));
      // Update all items to be isVisible: true in the backend and local state
      const updatedData = newCardData.map((item) => ({
        ...item,
        isVisible: true,
      }));
      for (const item of updatedData) {
        await editPositionOfInterest(item.positionName, item);
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
        await editPositionOfInterest(item.positionName, item);
      }
      setNewCardData(updatedData);
    }
  };

  const handleCheck = async (e, item) => {
    const isChecked = e.target.checked;
    const updatedItem = { ...item, isVisible: isChecked };

    if (isChecked) {
      setCheckedItems((prevItems) => [...prevItems, item.positionName]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((positionName) => positionName !== item.positionName)
      );
    }

    try {
      // Update the isVisible property in the backend
      await editPositionOfInterest(item.positionName, updatedItem);
      // Update the isVisible property in the local state
      setNewCardData((prevData) =>
        prevData.map((card) =>
          card.positionName === item.positionName ? updatedItem : card
        )
      );
    } catch (error) {
      // Handle error
      console.error("Error updating item:", error);
    }
  };

  const handleAddPortfolioItem = async () => {
    // Validar que los campos no estén vacíos
    if (
      !additionalFields.positionName ||
      additionalFields.positionName.trim() === ""
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

    // Verificar si la tarjeta ya existe en newCardData
    const existingCard = newCardData.find(
      (card) => card.positionName === additionalFields.positionName
    );
    if (existingCard) {
      // Mostrar un mensaje de error en un toast
      toast({
        title: "Error",
        description: "Esa posición de interés ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud POST
    const newData = {
      positionName: additionalFields.positionName,
      isVisible: true,
    };

    // Llamar a la función AddPortfolioItem con los datos preparados
    const newCard = await AddPositionOfInterest(newData);

    // Mostrar un toast de éxito
    toast({
      title: "Éxito",
      description: "La posición de interés ha sido creada con éxito",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData((prevCardData) => [...prevCardData, newCard.data]);
    }

    // Cerrar el modal de agregar y restablecer los campos adicionales
    setShowAddModal(false);
    setAdditionalFields({});
  };

  const handleFieldChange = (field, value) => {
    setAdditionalFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (editingCard) {
      setShowEditModal(true);
    }
  }, [editingCard]);

  const [originalTitle, setOriginalTitle] = useState(null);

  const handleEditCard = async (cardTitle) => {
    const cardToEdit = await getPositionOfInterestItem(cardTitle);
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
      editingCard.positionName.trim() === "" ||
      editingCard.positionName.trim() === null
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

    // Verificar si la tarjeta ya existe en newCardData
    const existingCard = newCardData.find(
      (card) => card.positionName === editingCard.positionName
    );
    if (existingCard) {
      // Mostrar un mensaje de error en un toast
      toast({
        title: "Error",
        description: "Esa posición de interés ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud PATCH
    const newData = {
      positionName: editingCard.positionName, // Ajusta esto según sea necesario
      isVisible: true,
    };

    const updatedCard = await editPositionOfInterest(originalTitle, newData);

    setContent(updatedCard);

    // Actualizar cardData con los nuevos datos
    const updatedCardData = newCardData.map((card) => {
      if (card.positionName === originalTitle) {
        return { ...card, positionName: newData.positionName };
      } else {
        return card;
      }
    });
    setNewCardData(updatedCardData);

    // Mostrar un toast de éxito
    toast({
      title: "Éxito",
      description: "La posición de interés ha sido editada con éxito",
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
      if (cardTypeToDelete === "cardContentPortafolios") {
        await deletePositionOfInterest(cardToDelete);
        const updatedCardData = newCardData.filter(
          (card) => card.positionName !== cardToDelete
        );
        setNewCardData(updatedCardData);
        setShowIcons(false);
        setEditMode(true);

        toast({
          title: "Éxito",
          description: "La posición de interés ha sido eliminada con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description:
            "Ha ocurrido un problema al eliminar la posición de interés",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      setShowDeleteModal(false);
      setCardToDelete(null);
    } else {
      toast({
        title: "Error",
        description:
          "Ha ocurrido un problema al eliminar la posición de interés",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancelEdit = () => {
    // Cancelar la edición, cerrar el modal y limpiar el estado
    setcardIdToEdit(null);
    setShowEditModal(false);
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
                Posiciones de interés
              </Text>
            </Flex>
            <AddIcon
              onClick={() => handleAddClick("IndustriasInteres")}
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
                  isChecked={checkedItems.includes(item.positionName)}
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
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" fontSize="15px">
                        {item.positionName}
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex justifyContent="flex-end">
                      <EditIcon
                        cursor="pointer"
                        display="flex"
                        justifySelf="flex-end"
                        color="#C0C0C0"
                        onClick={() => handleEditCard(item.positionName)}
                      />
                      <DeleteIcon
                        cursor="pointer"
                        display="flex"
                        justifySelf="flex-end"
                        marginLeft="10px"
                        color="#C0C0C0"
                        onClick={() =>
                          handleDeleteClick(
                            item.positionName,
                            "cardContentPortafolios"
                          )
                        }
                      />
                    </Flex>
                  </Box>
                </Box>
              </Flex>
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
                En esta sección, puedes añadir Posiciones de Interés.
              </Text>
            </Box>
          )}
        </CardBody>
      </Card>

      {/* Modal de edición Portafolios*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">
            Editar Posiciones de Interés
          </ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {editingCard && (
              <>
                <Text marginTop="2px" as="b">
                  Nombre de la Posición de Interés
                </Text>
                <Input
                  value={editingCard.positionName}
                  onChange={(e) =>
                    setEditingCard((prevCard) => ({
                      ...prevCard,
                      positionName: e.target.value,
                    }))
                  }
                  placeholder="Nombre de la Posición de Interés..."
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
          <ModalHeader color="#007935">Agregar Posición de Interés</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            <>
              <Text marginTop="2px" as="b">
                Nombre de la Posición de Interés
              </Text>
              <Input
                value={additionalFields.positionName || ""}
                onChange={(e) =>
                  handleFieldChange("positionName", e.target.value)
                }
                placeholder="Nombre de la Posición de Interés"
                marginBottom="10px"
              />
            </>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddPortfolioItem}
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
          <ModalHeader color="#007935">
            Eliminar Posición de Interés
          </ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            ¿Está seguro de que desea eliminar esta Posición de Interés?
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

export default PosicionesInteresCard;
