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
  AddPortfolioItem,
  DeletePortfolioItem,
  EditPortfolioItem,
  getPortfolioItem,
} from "../../services/auth/MeProfile.services";
import { Link } from "react-router-dom";

const PortafoliosCard = ({ cardData, setCardData }) => {
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
      setCheckedItems(newCardData.map((item) => item.title));
      // Update all items to be isVisible: true in the backend and local state
      const updatedData = newCardData.map((item) => ({
        ...item,
        isVisible: true,
      }));
      for (const item of updatedData) {
        await EditPortfolioItem(item.title, item);
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
        await EditPortfolioItem(item.title, item);
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
      await EditPortfolioItem(item.title, updatedItem);
      // Update the isVisible property in the local state
      setNewCardData((prevData) =>
        prevData.map((card) => (card.title === item.title ? updatedItem : card))
      );
    } catch (error) {
      // Handle error
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddPortfolioItem = async () => {
    // Validar que los campos no estén vacíos
    if (
      !additionalFields.title ||
      additionalFields.title.trim() === "" ||
      !additionalFields.sourceLink ||
      additionalFields.sourceLink.trim() === ""
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
      (card) =>
        card.title === additionalFields.title &&
        card.sourceLink === additionalFields.sourceLink
    );
    if (existingCard) {
      // Mostrar un mensaje de error en un toast
      toast({
        title: "Error",
        description: "Ese portafolio ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const existingTitle = newCardData.find(
      (card) => card.title === additionalFields.title
    );
    if (existingTitle) {
      // Mostrar un mensaje de error en un toast
      toast({
        title: "Error",
        description: "Ya existe un portafolio con ese nombre",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud POST
    const newData = {
      title: additionalFields.title,
      sourceLink: additionalFields.sourceLink,
      isVisible: true,
    };

    // Llamar a la función AddPortfolioItem con los datos preparados
    const newCard = await AddPortfolioItem(newData);

    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData((prevCardData) => [...prevCardData, newCard.data]);
      // Mostrar un toast de éxito
      toast({
        title: "Éxito",
        description: "El portafolio ha sido creado con éxito",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
    const cardToEdit = await getPortfolioItem(cardTitle);
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
      editingCard.sourceLink.trim() === null ||
      editingCard.title.trim() === "" ||
      editingCard.sourceLink.trim() === null
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
      (card) =>
        card.title === editingCard.title &&
        card.sourceLink === editingCard.sourceLink &&
        card.title !== originalTitle
    );
    if (existingCard) {
      // Mostrar un mensaje de error en un toast
      toast({
        title: "Error",
        description: "Ese portafolio ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud PATCH
    const newData = {
      title: editingCard.title, // Ajusta esto según sea necesario
      sourceLink: editingCard.sourceLink,
      isVisible: true,
    };

    const updatedCard = await EditPortfolioItem(originalTitle, newData);

    setContent(updatedCard);

    // Actualizar cardData con los nuevos datos
    const updatedCardData = newCardData.map((card) => {
      if (card.title === originalTitle) {
        return {
          ...card,
          title: newData.title,
          sourceLink: newData.sourceLink,
        };
      } else {
        return card;
      }
    });
    setNewCardData(updatedCardData);

    if (updatedCard) {
      // Mostrar un toast de éxito
      toast({
        title: "Éxito",
        description: "El portafolio ha sido editado con éxito",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

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
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleConfirmDelete = async (cardToDelete, cardTypeToDelete) => {
    if (cardToDelete !== null && cardTypeToDelete !== null) {
      if (cardTypeToDelete === "cardContentPortafolios") {
        await DeletePortfolioItem(cardToDelete);
        const updatedCardData = newCardData.filter(
          (card) => card.title !== cardToDelete
        );
        setNewCardData(updatedCardData);
        setShowIcons(false);
        setEditMode(true);

        toast({
          title: "Éxito",
          description: "El portafolio ha sido eliminado con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Ha ocurrido un problema al eliminar el portafolio",
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
        description: "Ha ocurrido un problema al eliminar el portafolio",
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
            <Flex alignItems="center">
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
                Portafolios
              </Text>
            </Flex>
            <AddIcon
              onClick={() => handleAddClick("Portafolios")}
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
                  border="2px solid #007935"
                  borderTop="none"
                  borderRight="none"
                  borderBottom="none"
                  paddingLeft="2"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" fontSize="15px">
                        {item.title}
                      </Text>
                    </Flex>
                    <Box wordBreak="break-all">
                      <a
                        href={item.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text as="i" fontSize="15px" color="#37B4E3">
                          {item.sourceLink}
                        </Text>
                      </a>
                    </Box>
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
                          handleDeleteClick(
                            item.title,
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
              marginTop="10px"
              border="2px solid #007935"
              borderTop="none"
              borderRight="none"
              borderBottom="none"
              paddingLeft="2"
            >
              <Text color="grey">
                En esta sección, puedes añadir un portafolio de tus trabajos, o
                cualquier otra cosa que desees mostrar.
              </Text>
            </Box>
          )}
        </CardBody>
      </Card>

      {/* Modal de edición Portafolios*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">Editar portafolio</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {editingCard && (
              <>
                <Text marginTop="2px" as="b">
                  Título del portafolio
                </Text>
                <Input
                  marginTop="2px"
                  value={editingCard.title}
                  onChange={(e) =>
                    handleEditInputChange(
                      "title",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Titulo del portafolio"
                  size="lg"
                  marginBottom="4"
                  maxLength={100}
                />
                <Text marginTop="8px" as="b">
                  Link del portafolio
                </Text>
                <Input
                  marginTop="2px"
                  value={editingCard.sourceLink}
                  onChange={(e) =>
                    handleEditInputChange(
                      "sourceLink",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Link del Portafolio"
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
          <ModalHeader color="#007935">Agregar portafolio</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            <>
              <Text marginTop="2px" as="b">
                Título del portafolio
              </Text>
              <Input
                marginTop="2px"
                value={additionalFields.title || ""}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Título del portafolio"
                marginBottom="10px"
                maxLength={100}
              />
              <Text marginTop="8px" as="b">
                Link del portafolio
              </Text>
              <Input
                marginTop="2px"
                value={additionalFields.sourceLink || ""}
                onChange={(e) =>
                  handleFieldChange("sourceLink", e.target.value)
                }
                placeholder="Link del portafolio"
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
          <ModalHeader color="#007935">Eliminar portafolio</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            ¿Está seguro de que desea eliminar este portafolio?
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

export default PortafoliosCard;
