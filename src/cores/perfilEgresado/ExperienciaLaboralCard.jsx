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
  Textarea,
  Box,
  Flex,
  IconButton,
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon, CalendarIcon } from "@chakra-ui/icons";
import CustomSwitch from "./Switch";
import { useToast } from "@chakra-ui/react";
import {
  AddWorkExperience,
  DeleteWorkExperience,
  editWorkExperience,
  getWorkExperienceItem,
} from "../../services/auth/MeProfile.services";

const ExperienciaLaboralCard = ({ cardData, setCardData }) => {
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
  const [cardIdToEditExpLaboral, setcardIdToEditExpLaboral] = useState(null);

  const [showAddButton, setShowAddButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const [additionalFields, setAdditionalFields] = useState({}); // Estado para campos adicionales

  const handleAddWorkExperience = async () => {
    // Validar que los campos no estén vacíos
    if (
      !additionalFields.companyName ||
      additionalFields.companyName.trim() === "" ||
      !additionalFields.position ||
      additionalFields.position.trim() === "" ||
      !additionalFields.description ||
      additionalFields.description.trim() === "" ||
      !additionalFields.startDate ||
      additionalFields.startDate.trim() === "" ||
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
      companyName: additionalFields.companyName,
      position: additionalFields.position,
      description: additionalFields.description,
      startDate: additionalFields.startDate,
      endDate: additionalFields.endDate,
      isVisible: true,
    };

    // Verificar si la tarjeta ya existe
    const cardExists = newCardData.some(
      (card) =>
        card.companyName === newData.companyName &&
        card.position === newData.position &&
        card.description === newData.description &&
        card.startDate === newData.startDate &&
        card.endDate === newData.endDate
    );

    if (cardExists) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "Esa experiencia laboral ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Llamar a la función AddWorkExperience para hacer la solicitud POST
    const newCard = await AddWorkExperience(newData);

    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData((prevCardData) => [...prevCardData, newCard.data]);
    }
    // Mostrar un toast de éxito
    toast({
      title: "Éxito",
      description: "La experiencia laboral se ha añadido con éxito",
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

  const handleEditCard = async (workExperienceNumber) => {
    const cardToEdit = await getWorkExperienceItem(workExperienceNumber);

    // Formatear la fecha y agregar un día
    const dateS = new Date(cardToEdit.startDate);
    const dateSPlusOneDay = addDays(dateS, 1);
    const formattedDateS = format(dateSPlusOneDay, "yyyy-MM-dd");
    cardToEdit.startDate = formattedDateS;

    // Formatear la fecha y agregar un día
    const dateE = new Date(cardToEdit.endDate);
    const dateEPlusOneDay = addDays(dateE, 1);
    const formattedDateE = format(dateEPlusOneDay, "yyyy-MM-dd");
    cardToEdit.endDate = formattedDateE;

    setEditingCard(cardToEdit);
    setOriginalTitle(workExperienceNumber); // Guardar el título original
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
      editingCard.companyName.trim() === "" ||
      editingCard.position.trim() === "" ||
      editingCard.description.trim() === "" ||
      editingCard.startDate.trim() === "" ||
      editingCard.endDate.trim() === "" ||
      editingCard.companyName.trim() === null ||
      editingCard.position.trim() === null ||
      editingCard.description.trim() === null ||
      editingCard.startDate.trim() === null ||
      editingCard.endDate.trim() === null
    ) {
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
      companyName: editingCard.companyName,
      position: editingCard.position,
      description: editingCard.description,
      startDate: editingCard.startDate,
      endDate: editingCard.endDate,
      isVisible: true,
    };

    // Verificar si la tarjeta ya existe
    const cardExists = cardData.some(
      (card) =>
        card.companyName === newData.companyName &&
        card.position === newData.position &&
        card.description === newData.description &&
        card.startDate === newData.startDate &&
        card.endDate === newData.endDate &&
        card.companyName !== originalTitle // Excluir la tarjeta original que se está editando
    );

    if (cardExists) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "Esa experiencia laboral ya existe",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedCard = await editWorkExperience(originalTitle, newData);

    setContent(updatedCard);

    // Actualizar cardData con los nuevos datos
    const updatedCardData = newCardData.map((card) => {
      if (card.number === originalTitle) {
        return {
          ...card,
          companyName: newData.companyName,
          position: newData.position,
          description: newData.description,
          startDate: newData.startDate,
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
      description: "La experiencia laboral se ha editado con éxito",
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

  const handleDeleteClick = (workExperienceNumber, cardType) => {
    setOriginalTitle(workExperienceNumber);
    if (workExperienceNumber) {
      setCardToDelete(workExperienceNumber);
      setCardTypeToDelete(cardType);
      setShowDeleteModal(true);
    } else {
      console.error("ID de tarjeta es nulo.");
    }
  };

  const handleConfirmDelete = async (cardToDelete, cardTypeToDelete) => {
    if (cardToDelete !== null && cardTypeToDelete !== null) {
      if (cardTypeToDelete === "cardContent") {
        await DeleteWorkExperience(cardToDelete);
        const updatedCardData = cardData.filter(
          (card) => card.number !== cardToDelete
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
    setcardIdToEditExpLaboral(null);
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
        Experiencia Laboral
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
            onClick={() => handleAddClick("Experiencia Laboral")}
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

      {Array.isArray(newCardData) && newCardData.length > 0 ? (
        newCardData.map((item, index) => {
          const dateS = new Date(item.startDate);
          const formattedDateS = `${dateS.getDate()}/${
            dateS.getMonth() + 1
          }/${dateS.getFullYear()}`;
          const dateE = new Date(item.endDate);
          const formattedDateE = `${dateE.getDate()}/${
            dateE.getMonth() + 1
          }/${dateE.getFullYear()}`;
          return (
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
              {showIcons && (
                <Flex justifyContent="flex-end" marginBottom="10px">
                  <IconButton
                    aria-label="Editar"
                    icon={<EditIcon />}
                    colorScheme="blue"
                    marginRight="5px"
                    onClick={() => handleEditCard(item.number)}
                  />
                  <IconButton
                    aria-label="Eliminar"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    marginLeft="5px"
                    onClick={() =>
                      handleDeleteClick(item.number, "cardContent")
                    }
                  />
                </Flex>
              )}
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">{item.companyName}</Text>
                <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
                  {item.position}
                </Text>
              </Flex>

              <Flex
                justifyContent="space-between"
                alignItems="center"
                marginTop="5px"
              >
                <Text>{item.description}</Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                marginTop="5px"
              >
                <Text>
                  {formattedDateS} - {formattedDateE}
                </Text>
              </Flex>

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
          );
        })
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

      {/* Modal de edición Experiencia Laboral*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Experiencia Laboral</ModalHeader>
          <ModalBody>
            {editingCard && (
              <>
                <Input
                  value={editingCard.companyName}
                  onChange={(e) =>
                    handleEditInputChange(
                      "companyName",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar nombre empresa..."
                  size="lg"
                  marginBottom="4"
                />
                <Input
                  value={editingCard.position}
                  onChange={(e) =>
                    handleEditInputChange(
                      "position",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar posición..."
                  size="lg"
                  marginBottom="4"
                />
                <Textarea
                  value={editingCard.description}
                  onChange={(e) =>
                    handleEditInputChange(
                      "description",
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
                  value={editingCard.startDate}
                  onChange={(e) =>
                    handleEditInputChange(
                      "startDate",
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
            {cardTypeToAdd === "Experiencia Laboral" && (
              <>
                Nombre de la compañía
                <Input
                  value={additionalFields.companyName || ""}
                  onChange={(e) =>
                    handleFieldChange("companyName", e.target.value)
                  }
                  placeholder="Nombre de la compañía"
                  marginBottom="10px"
                />
                Posición
                <Input
                  value={additionalFields.position || ""}
                  onChange={(e) =>
                    handleFieldChange("position", e.target.value)
                  }
                  placeholder="Posición"
                  marginBottom="10px"
                />
                Descripción
                <Textarea
                  placeholder="Descripción"
                  marginBottom="10px"
                  value={additionalFields.description || ""}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                />
                Fecha Inicio
                <Input
                  value={additionalFields.startDate || ""}
                  onChange={(e) =>
                    handleFieldChange("startDate", e.target.value)
                  }
                  type="date"
                  placeholder="Fecha inicio"
                  marginBottom="10px"
                />
                Fecha Fin
                <Input
                  value={additionalFields.endDate || ""}
                  onChange={(e) => handleFieldChange("endDate", e.target.value)}
                  type="date"
                  placeholder="Fecha fin"
                  marginBottom="10px"
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddWorkExperience}>
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
