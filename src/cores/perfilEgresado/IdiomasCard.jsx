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
  Box,
  Flex,
  Select,
  Card,
  CardBody,
  Divider,
  Checkbox,
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import {
  AddLanguage,
  DeleteLanguage,
  editLanguage,
  getLanguage,
  getLanguageItem,
} from "../../services/auth/MeProfile.services";

const IdiomasCard = ({ cardData, setCardData }) => {
  const toast = useToast();

  const [newCardData, setNewCardData] = useState(cardData);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setNewCardData(cardData);
  }, [cardData]);

  useEffect(() => {
    const checkedItems = newCardData
      .filter((item) => item.isVisible)
      .map((item) => item.languageName);
    setCheckedItems(checkedItems);
  }, [newCardData]);

  // Define idiomas como un estado
  const [idiomas, setIdiomas] = useState([]);
  const niveles = ['A1','A2','B1','B2','C1','C2'];

  // Usa useEffect para llamar a getLanguage cuando el componente se monta
  useEffect(() => {
    getLanguage().then((data) => {
      if (Array.isArray(data)) {
        setIdiomas(data);
      }
    });
  }, []);

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

  const handleCheckAll = async (e) => {
    if (e.target.checked) {
      setCheckedItems(newCardData.map((item) => item.languageName));
      // Update all items to be isVisible: true in the backend and local state
      const updatedData = newCardData.map((item) => ({
        ...item,
        isVisible: true,
      }));
      for (const item of updatedData) {
        await editLanguage(item.languageName, item);
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
        await editLanguage(item.languageName, item);
      }
      setNewCardData(updatedData);
    }
  };

  const handleCheck = async (e, item) => {
    const isChecked = e.target.checked;
    const updatedItem = { ...item, isVisible: isChecked };

    if (isChecked) {
      setCheckedItems((prevItems) => [...prevItems, item.languageName]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((languageName) => languageName !== item.languageName)
      );
    }

    try {
      // Update the isVisible property in the backend
      await editLanguage(item.languageName, updatedItem);
      // Update the isVisible property in the local state
      setNewCardData((prevData) =>
        prevData.map((card) =>
          card.languageName === item.languageName ? updatedItem : card
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

  const handleAddLanguage = async () => {
    // Validar que los campos no estén vacíos
    if (
      !additionalFields.languageName ||
      additionalFields.languageName.trim() === "" ||
      additionalFields.masteryLevel === null ||
      additionalFields.masteryLevel === 0
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

    // Verificar si el idioma ya existe
    const languageExists = cardData.some(
      (card) => card.languageName === additionalFields.languageName
    );

    if (languageExists) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "El idioma ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud POST
    const newData = {
      languageName: additionalFields.languageName,
      masteryLevel: additionalFields.masteryLevel,
      isVisible: true,
    };

    // Llamar a la función AddHigherEducationStudy con los datos preparados
    const newCard = await AddLanguage(newData);

    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData((prevCardData) => [...prevCardData, newCard.data]);
      // Mostrar un toast de éxito
    toast({
      title: "Éxito",
      description: "El idioma ha sido añadido con éxito",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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
    const cardToEdit = await getLanguageItem(cardTitle);

    setEditingCard({
      ...cardToEdit,
      languageName: cardToEdit.languageName,
    });
    setOriginalTitle(cardTitle); // Guardar el título original
  };

  // Modal de edición Idiomas
  const handleEditInputChange = (field, value, setter) => {
    if (field === "languageName") {
      // Solo guarda el nombre del idioma, no el objeto completo
      setter((prev) => ({ ...prev, [field]: value }));
    } else {
      setter((prev) => ({ ...prev, [field]: value }));
    }
  };

  const [content, setContent] = useState(null);
  const handleSaveEdit = async () => {
    // Validar que los campos no estén vacíos
    if (
      !editingCard.languageName ||
      editingCard.languageName.trim() === "" ||
      editingCard.masteryLevel === null ||
      editingCard.masteryLevel === 0
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

    // Verificar si el idioma ya existe
    const languageExists = cardData.some(
      (card) =>
        card.languageName === editingCard.languageName &&
        card.languageName !== originalTitle
    );

    if (languageExists) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "El idioma ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newData = {
      languageName: editingCard.languageName,
      masteryLevel: editingCard.masteryLevel, 
      isVisible: true,
    };

    try{
    const updatedCard = await editLanguage(originalTitle, newData);

    setContent(updatedCard);

    // Actualizar cardData con los nuevos datos
    const updatedCardData = cardData.map((card) => {
      if (card.languageName === originalTitle) {
        return {
          ...card,
          languageName: newData.languageName,
          masteryLevel: newData.masteryLevel,
        };
      } else {
        return card;
      }
    });
    if(updatedCard){
      // Mostrar un toast de éxito
    toast({
      title: "Éxito",
      description: "El idioma ha sido editado con éxito",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    }
    setNewCardData(updatedCardData);

    setShowEditModal(false);
    // agregar cada uno de los estados de edicion
    setShowIcons(false);
    setEditMode(true);
  } catch (error) {
      // Mostrar un mensaje de error si la solicitud falla
      toast({
        title: "Error",
        description: "Hubo un error al editar el idioma",
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
      if (cardTypeToDelete === "cardContentIdiomas") {
        await DeleteLanguage(cardToDelete);
        //setCardContentIdiomas(updatedCardContent);
        const updatedCardData = cardData.filter(
          (card) => card.languageName !== cardToDelete
        );
        setNewCardData(updatedCardData);
        // agregar cada uno de los estados de edicion
        setShowIcons(false);
        setEditMode(true);
        // Mostrar un toast de éxito
        toast({
          title: "Éxito",
          description: "El idioma ha sido eliminado con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Ha ocurrido un error inesperado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Cerrar el modal y limpiar el estado
      setShowDeleteModal(false);
      setCardToDelete(null);
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

  const handleCancelEdit = () => {
    // Cancelar la edición, cerrar el modal y limpiar el estado
    setcardIdToEdit(null);
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
                Idiomas
              </Text>
            </Flex>
            <AddIcon
              onClick={() => handleAddClick("Idiomas")}
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
                  isChecked={checkedItems.includes(item.languageName)}
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
                  <Box display="flex" flexDirection="row">
                    <Text marginRight="10px">{item.languageName}</Text>
                    <Text
                      bg="#FBC430"
                      color="black"
                      padding="1"
                      borderRadius="8"
                      fontSize="12px"
                    >
                      {item.masteryLevel}
                    </Text>
                  </Box>
                  <Box>
                    <Flex justifyContent="flex-end">
                      <EditIcon
                        cursor="pointer"
                        display="flex"
                        justifySelf="flex-end"
                        color="#C0C0C0"
                        onClick={() => handleEditCard(item.languageName)}
                      />
                      <DeleteIcon
                        cursor="pointer"
                        display="flex"
                        justifySelf="flex-end"
                        marginLeft="10px"
                        color="#C0C0C0"
                        onClick={() =>
                          handleDeleteClick(
                            item.languageName,
                            "cardContentIdiomas"
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
              <Text color="gray.500">
                En esta sección, puedes indicar tu nivel de dominio de los
                idiomas que hablas.
              </Text>
            </Box>
          )}
        </CardBody>
      </Card>

      {/* Modal de edición Idiomas*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">Editar idioma</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {editingCard && (
              <>
                <Text marginTop="2px" as="b">
                  Nombre del idioma
                </Text>
                <Select
                  value={editingCard.languageName}
                  onChange={(e) =>
                    handleEditInputChange(
                      "languageName",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Nombre del idioma"
                  size="lg"
                  marginBottom="4"
                >
                  {idiomas.map((idioma) => (
                    <option key={idioma.name} value={idioma.name}>
                      {idioma.name}
                    </option>
                  ))}
                </Select>
                <Text marginTop="2px" as="b">
                  Nivel de experiencia
                </Text>
                <Select
                  value={editingCard.masteryLevel}
                  onChange={(e) =>
                    handleEditInputChange(
                      "masteryLevel",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Nivel de experiencia"
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
          <ModalHeader color="#007935">Agregar idioma</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            <>
              <Text marginTop="2px" as="b">
                Nombre del idioma
              </Text>
              <Select
                value={additionalFields.languageName || ""}
                onChange={(e) =>
                  handleFieldChange("languageName", e.target.value)
                }
                placeholder="Agregar Idioma"
                marginBottom="10px"
              >
                {idiomas.map((idioma) => (
                  <option key={idioma.name} value={idioma.name}>
                    {idioma.name}
                  </option>
                ))}
              </Select>
              <Text marginTop="2px" as="b">
                Nivel de experiencia
              </Text>
              <Select
                value={additionalFields.masteryLevel || ""}
                onChange={(e) =>
                  handleFieldChange("masteryLevel", e.target.value)
                }
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
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddLanguage}
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
            Eliminar idioma
          </ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>¿Está seguro de que desea eliminar este idioma?</ModalBody>
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
