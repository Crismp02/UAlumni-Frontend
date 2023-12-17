import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
} from "@chakra-ui/react"; 
import { AddIcon, EditIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import CustomSwitch from "./Switch";
import { AddTechnicalSkills, DeleteTechnicaltSkills, editTechnicalSkill, getTechnicalSkills} from "../../services/auth/MeProfile.services";

const HabilidadesTecnicasCard = ({ cardData, setCardData }) => {
  const [groupedSkills, setGroupedSkills] = useState({});

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
  const [cardIdToEditTechnicalSkill, setcardIdToEditTechnicalSkill] = useState(null);

  const [showAddButton, setShowAddButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const [additionalFields, setAdditionalFields] = useState({});

  const handleAddTechnicalSkill = async () => {
    // Validar que los campos no estén vacíos
    if (
      (!additionalFields.skillName || additionalFields.skillName.trim() === '') 
    )  {
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
      skillName: additionalFields.skillName,
      isVisible: true,
    };

    // Verificar si la tarjeta ya existe
  const cardExists = newCardData.some(card => 
    card.skillName === newData.skillName 
  );

  if (cardExists) {
    // Mostrar un mensaje de error o manejar la situación según lo desees
    toast({
      title: "Error",
      description: "Esa habilidad ya existe",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return;
  }
  
    const newCard = await AddTechnicalSkills(newData);
  
    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData(prevCardData => [...prevCardData, newCard.data]);
    }
     // Mostrar un toast de éxito
  toast({
    title: "Éxito",
    description: "La habilidad se ha añadido con éxito",
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
    setShowIcons(true);
  };

  useEffect(() => {
    if (editingCard) {
      setShowEditModal(true);
    }
  }, [editingCard]);

const [originalSkillName, setOriginalSkillName] = useState(null);

const handleEditCard = async (cardTitle) => {
  const cardToEdit = await getTechnicalSkills(cardTitle);

  setEditingCard(cardToEdit);
  setOriginalSkillName(cardTitle); // Guardar el título original
}

const handleEditInputChange = (field, value, setState) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const [content, setContent] = useState(null);

  const handleSaveEdit = async () => {

    // Validar que los campos no estén vacíos
    if (editingCard.skillName.trim() === '') {
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
    skillName: editingCard.skillName, // Ajusta esto según sea necesario
    isVisible: true,
  };

  // Verificar si la tarjeta ya existe
  const cardExists = cardData.some(card => 
    card.skillName === newData.skillName && 
    card.skillName !== originalSkillName // Excluir la tarjeta original que se está editando
  );

  if (cardExists) {
    // Mostrar un mensaje de error o manejar la situación según lo desees
    toast({
      title: "Error",
      description: "Esta habilidad ya existe",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return;
  }

  const updatedCard = await editTechnicalSkill(originalSkillName, newData);

  setContent(updatedCard);

  // Actualizar cardData con los nuevos datos
  const updatedCardData = cardData.map(card => {
    if (card.skillName === originalSkillName) {
      return { ...card, skillName: newData.skillName};
    } else {
      return card;
    }
  });


  setNewCardData(updatedCardData);
  // Mostrar un toast de éxito
  toast({
    title: "Éxito",
    description: "La habilidad ha sido editada con éxito",
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
    setOriginalSkillName(cardTitle); 
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
        await DeleteTechnicalSkills(cardToDelete);
        const updatedCardData = cardData.filter(card => card.title !== cardToDelete);
        setNewCardData(updatedCardData);
        setShowIcons(false);
        setEditMode(true);
        toast({
          title: "Éxito",
          description: "La habilidad ha sido eliminada con éxito",
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
    setcardIdToEditTechnicalSkill(null);
    setShowEditModal(false);
    setShowIcons(false);
    setEditMode(true);
  };

  useEffect(() => {
    const groups = cardData.reduce((acc, skill) => {
      const { skillCategoryName } = skill;
      if (!acc[skillCategoryName]) {
        acc[skillCategoryName] = [];
      }
      acc[skillCategoryName].push(skill);
      return acc;
    }, {});
    setGroupedSkills(groups);
  }, [cardData]);

 
  return (
    <>
    <Text
  fontSize="lg"
  marginLeft="10"
  marginRight="10"
  marginTop="2"
>
  Técnicas
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
      cursor="pointer"
      color="white"
      position="absolute"
      right="45px"
      bg="#007935"
      borderRadius="10px"
      width="42px"
      height="33px"
      padding="8px"
      onClick={() => handleAddClick('skillName')}
    />
  )}
</Text>
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <Box key={category}>
          <Text fontWeight="bold" fontSize="xl" marginLeft="10" marginTop="5" marginBottom="0">
            {category}
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            marginLeft="10"
            marginRight="10"
            marginBottom="5"
          >
            {skills.map((skill, index) => (
              <Box
                key={index}
                position="relative"
                padding="2"
                marginRight="2"
              >
                <Box padding="2" marginBottom="2" marginRight="2">
                  <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                    {skill.skillName}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )
        )}

     {/*Modal agregar campos*/}
     <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Habilidades {cardTypeToAdd}</ModalHeader>
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            {cardTypeToAdd === 'TechnicalSkill' && (
              <>
                <Input
                  value={additionalFields.habilidad || ""}
                  onChange={(e) =>
                    handleFieldChange("habilidad", e.target.value)
                  }
                  placeholder="Habilidad"
                  marginBottom="10px"
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddTechnicalSkill}>
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

export default HabilidadesTecnicasCard;