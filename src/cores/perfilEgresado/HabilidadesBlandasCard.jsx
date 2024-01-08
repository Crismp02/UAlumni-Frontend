import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
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
  Select,
  Card,
  CardBody,
  Divider,
  Flex,
  Tag,
  TagCloseButton,
  Checkbox,
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  AddSoftSkill,
  deleteSoftSkill,
  editSoftSkill,
  getSoftSkills,
} from "../../services/auth/MeProfile.services";

const HabilidadesBlandasCard = ({ cardData, setCardData }) => {
  const toast = useToast();
  const [newCardData, setNewCardData] = useState(cardData);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setNewCardData(cardData);
  }, [cardData]);

  useEffect(() => {
    const checkedItems = newCardData
      .filter((item) => item.isVisible)
      .map((item) => item.skillName);
    setCheckedItems(checkedItems);
  }, [newCardData]);

  const [softSkills, setSoftSkills] = useState([]);
  useEffect(() => {
    getSoftSkills().then((data) => {
      if (Array.isArray(data)) {
        setSoftSkills(data);
      }
    });
  }, []);

  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState(
    "cardContentHabilidades"
  );
  const [showIcons, setShowIcons] = useState(false);

  const [showAddButton, setShowAddButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [additionalFields, setAdditionalFields] = useState({}); // Estado para campos adicionales

  const handleCheckAll = async (e) => {
    if (e.target.checked) {
      setCheckedItems(newCardData.map((item) => item.skillName));
      // Update all items to be isVisible: true in the backend and local state
      const updatedData = newCardData.map((item) => ({
        ...item,
        isVisible: true,
      }));
      for (const item of updatedData) {
        await editSoftSkill(item.skillName, item);
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
        await editSoftSkill(item.skillName, item);
      }
      setNewCardData(updatedData);
    }
  };

  const handleAddSkill = async () => {
    // Validar que los campos no estén vacíos
    if (!additionalFields.skillName || additionalFields.skillName === null) {
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

    // Verificar si el curso ya existe en newCardData
    const existingSoftSkill = newCardData.find(
      (softSkills) => softSkills.name === additionalFields.skillName
    );
    if (existingSoftSkill) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "El curso ya ha sido agregado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud POST
    const newData = {
      skillName: additionalFields.skillName,
    };

    // Llamar a la función AddCiapCourse con los datos preparados
    const newCard = await AddSoftSkill(newData);

    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData((prevCardData) => [...prevCardData, newData]);

      // Buscar el curso en el array courses
      const skill = softSkills.find(
        (skill) => skill.name === additionalFields.skillName
      );

      // Si el curso no está en el array courses, agregarlo
      if (!skill) {
        setCourses((prevCourses) => [
          ...prevCourses,
          { name: additionalFields.skillName },
        ]);
      }
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
    setShowIcons(true);
  };

  const handleSaveEdit = (
    editedCard,
    content,
    setContent,
    setShowEditModal
  ) => {
    // Validar que los campos no estén vacíos
    if (editedCard.habilidad.trim() === "") {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      console.error("No puede estar vacío");
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

  const handleConfirmDelete = async (cardToDelete, cardTypeToDelete) => {
    if (cardToDelete !== null && cardTypeToDelete !== null) {
      if (cardTypeToDelete === "cardContentHabilidades") {
        await deleteSoftSkill(cardToDelete);
        const updatedCardData = cardData.filter(
          (card) => card.skillName !== cardToDelete
        );
        setNewCardData(updatedCardData);
        setShowIcons(false);
        setEditMode(true);
        toast({
          title: "Éxito",
          description: "La habilidad blanda ha sido eliminada con éxito",
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
                Habilidades Blandas
              </Text>
            </Flex>
            {/*<EditIcon
            cursor="pointer"
            position="absolute"
            right="45px"
            color="#C0C0C0"
            onClick={() => handleEditClick(setShowIcons, setEditMode)}
          />*/}
            <AddIcon
              onClick={() => handleAddClick("SoftSkills")}
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
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            {Array.isArray(newCardData) && newCardData.length > 0 ? (
              newCardData.map((item, index) => (
                <Box
                  key={index}
                  marginTop="3"
                  paddingLeft="2"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Box display="flex" flexDirection="row">
                    <Tag
                      bg="#37B4E3"
                      fontSize="12px"
                      paddingLeft="2"
                      paddingTop="1px"
                      paddingBottom="1px"
                      paddingRight="8px"
                      borderRadius="4px"
                      color="white"
                    >
                      {item.skillName}
                      <TagCloseButton
                        onClick={() =>
                          handleDeleteClick(
                            item.skillName,
                            "cardContentHabilidades"
                          )
                        }
                      />
                    </Tag>
                  </Box>
                  <Box></Box>
                </Box>
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
                  En esta sección, puedes añadir tus habilidades blandas
                </Text>
              </Box>
            )}
          </Box>
        </CardBody>
      </Card>

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">Agregar habilidad blanda</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            <>
              <Text marginTop="2px" as="b">
                Habilidad blanda
              </Text>
              <Select
                value={additionalFields.skillName || ""}
                onChange={(e) => handleFieldChange("skillName", e.target.value)}
                placeholder="Agregar habilidad blanda"
                marginBottom="10px"
              >
                {softSkills.map((softSkill) => (
                  <option key={softSkill.name} value={softSkill.name}>
                    {softSkill.name}
                  </option>
                ))}
              </Select>
            </>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddSkill}
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
          <ModalHeader color="#007935">Eliminar habilidad blanda</ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            ¿Está seguro de que desea eliminar esta habilidad blanda?
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

export default HabilidadesBlandasCard;
