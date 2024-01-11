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
  Tooltip
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import {
  AddIndustryOfInterest,
  deleteIndustryOfInterest,
  editIndustryOfInterest,
  getIndustryOfInterestItem,
} from "../../services/auth/MeProfile.services";
import { InfoIcon } from '@chakra-ui/icons'

const IndustriasInteresCard = ({ cardData, setCardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);
  const [checkedItems, setCheckedItems] = useState([]);
  const [openVisibleTooltip, setOpenVisibleTooltip] = useState(false); 

  useEffect(() => {
    setNewCardData(cardData);
  }, [cardData]);

  useEffect(() => {
    const checkedItems = newCardData
      .filter((item) => item.isVisible)
      .map((item) => item.industryName);
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
      setCheckedItems(newCardData.map((item) => item.industryName));
      // Update all items to be isVisible: true in the backend and local state
      const updatedData = newCardData.map((item) => ({
        ...item,
        isVisible: true,
      }));
      for (const item of updatedData) {
        await editIndustryOfInterest(item.industryName, item);
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
        await editIndustryOfInterest(item.industryName, item);
      }
      setNewCardData(updatedData);
    }
  };

  const handleCheck = async (e, item) => {
    const isChecked = e.target.checked;
    const updatedItem = { ...item, isVisible: isChecked };

    if (isChecked) {
      setCheckedItems((prevItems) => [...prevItems, item.industryName]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((industryName) => industryName !== item.industryName)
      );
    }

    try {
      // Update the isVisible property in the backend
      await editIndustryOfInterest(item.industryName, updatedItem);
      // Update the isVisible property in the local state
      setNewCardData((prevData) =>
        prevData.map((card) =>
          card.industryName === item.industryName ? updatedItem : card
        )
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
      !additionalFields.industryName ||
      additionalFields.industryName.trim() === ""
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
      (card) => card.industryName === additionalFields.industryName
    );
    if (existingCard) {
      // Mostrar un mensaje de error en un toast
      toast({
        title: "Error",
        description: "Esa industria de interés ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud POST
    const newData = {
      industryName: additionalFields.industryName,
    };

    // Llamar a la función AddPortfolioItem con los datos preparados
    const newCard = await AddIndustryOfInterest(newData);

    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData((prevCardData) => [...prevCardData, newCard.data]);
      // Mostrar un toast de éxito
    toast({
      title: "Éxito",
      description: "La industria de interés ha sido creada con éxito",
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
    const cardToEdit = await getIndustryOfInterestItem(cardTitle);
    setEditingCard(cardToEdit);
    setOriginalTitle(cardTitle); // Guardar el título original
  };

  const [content, setContent] = useState(null);

  const handleSaveEdit = async () => {
    // Validar que los campos no estén vacíos
    if (
      editingCard.industryName.trim() === "" ||
      editingCard.industryName.trim() === null
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
      (card) => card.industryName === editingCard.industryName
    );
    if (existingCard) {
      // Mostrar un mensaje de error en un toast
      toast({
        title: "Error",
        description: "Esa industria de interés ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud PATCH
  const newData = {
    industryName: editingCard.industryName, // Ajusta esto según sea necesario
  };

  try {
    const updatedCard = await editIndustryOfInterest(originalTitle, newData);

    setContent(updatedCard);

    // Actualizar cardData con los nuevos datos
    const updatedCardData = newCardData.map((card) => {
      if (card.industryName === originalTitle) {
        return { ...card, industryName: newData.industryName };
      } else {
        return card;
      }
    });
    setNewCardData(updatedCardData);

    if(updatedCard){
    // Mostrar un toast de éxito
    toast({
      title: "Éxito",
      description: "La industria de interés ha sido editada con éxito",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    }

    setShowEditModal(false);
    // agregar cada uno de los estados de edicion
    setShowIcons(false);
    setEditMode(true);
  } catch (error) {
    // Mostrar un mensaje de error si la solicitud falla
    toast({
      title: "Error",
      description: "Hubo un error al editar la industria de interés",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
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
        await deleteIndustryOfInterest(cardToDelete);
        const updatedCardData = newCardData.filter(
          (card) => card.industryName !== cardToDelete
        );
        setNewCardData(updatedCardData);
        setShowIcons(false);
        setEditMode(true);

        toast({
          title: "Éxito",
          description: "La industria de interés ha sido eliminada con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description:
            "Ha ocurrido un problema al eliminar la industria de interés",
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
          "Ha ocurrido un problema al eliminar la industria de interés",
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
                Industrias de Interés
              </Text>
              <Tooltip label="Indica las industrias en las que te gustaría trabajar. (Ej: Medicina)" isOpen={openVisibleTooltip} fontSize={["12px", "12px", "sm", "sm"]}
                  hasArrow={true}>
                    <InfoIcon
                      cursor="pointer"
                      color="#37B4E3"
                      marginLeft="10px"
                      onClick={()=> {
                        setOpenVisibleTooltip(!openVisibleTooltip)}}
                    />
                  </Tooltip>
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
                  isChecked={checkedItems.includes(item.industryName)}
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
                        {item.industryName}
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
                        onClick={() => handleEditCard(item.industryName)}
                      />
                      <DeleteIcon
                        cursor="pointer"
                        display="flex"
                        justifySelf="flex-end"
                        marginLeft="10px"
                        color="#C0C0C0"
                        onClick={() =>
                          handleDeleteClick(
                            item.industryName,
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
                En esta sección, puedes añadir industrias de interés.
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
            Editar industria de interés
          </ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {editingCard && (
              <>
                <Text marginTop="2px" as="b">
                  Nombre de la industria de interés
                </Text>
                <Input
                  marginTop="2px"
                  value={editingCard.industryName}
                  onChange={(e) =>
                    setEditingCard((prevCard) => ({
                      ...prevCard,
                      industryName: e.target.value,
                    }))
                  }
                  placeholder="Nombre de la industria de interés..."
                  size="lg"
                  marginBottom="4"
                  maxLength={100}
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
          <ModalHeader color="#007935">
            Agregar industria de interés
          </ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            <>
              <Text marginTop="2px" as="b">
                Nombre de la industria de interés
              </Text>
              <Input
                marginTop="2px"
                value={additionalFields.industryName || ""}
                onChange={(e) =>
                  handleFieldChange("industryName", e.target.value)
                }
                placeholder="Nombre de la industria de interés"
                marginBottom="10px"
                maxLength={100}
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
            Eliminar industria de interés
          </ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            ¿Está seguro de que desea eliminar esta industria de interés?
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

export default IndustriasInteresCard;
