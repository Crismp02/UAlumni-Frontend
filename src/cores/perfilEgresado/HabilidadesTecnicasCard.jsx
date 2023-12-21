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
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import {
  AddTechnicalSkill,
  deleteTechnicalSkill,
  getSkillCategory,
  getTechnicalSkills,
} from "../../services/auth/MeProfile.services";

const HabilidadesTecnicasCard = ({ cardData, setCardData }) => {
  const toast = useToast();
  const [newCardData, setNewCardData] = useState(cardData);

  const [groupedSkills, setGroupedSkills] = useState({});

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


  const [category, setCategory] = useState([]);
  useEffect(() => {
    getSkillCategory().then((data) => {
      if (Array.isArray(data)) {
        setCategory(data);
      }
    });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      getTechnicalSkills(selectedCategory).then((data) => {
        if (Array.isArray(data)) {
          setTechnicalSkills(data);
        }
      });
    }
  }, [selectedCategory]);

  const [technicalSkills, setTechnicalSkills] = useState([]);
  useEffect(() => {
    getTechnicalSkills(selectedCategory).then((data) => {
      if (Array.isArray(data)) {
        setTechnicalSkills(data);
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

  const handleAddSkill = async () => {
    // Validar que los campos no estén vacíos
    if (
      !additionalFields.categoryName ||
      additionalFields.categoryName === null ||
      !additionalFields.name ||
      additionalFields.name === null
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

    // Verificar si el curso ya existe en newCardData
    const existingTechnicalSkill = newCardData.find(skill => skill.skillName === additionalFields.name);
    if (existingTechnicalSkill) {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      toast({
        title: "Error",
        description: "La habilidad técnica ya ha sido agregada",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preparar los datos para la solicitud POST
    const newData = {
      skillCategoryName: additionalFields.categoryName,
      skillName: additionalFields.name,
    };

    // Llamar a la función AddCiapCourse con los datos preparados
    const newCard = await AddTechnicalSkill(newData);

    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
        // Asegúrate de que el objeto newData tenga las propiedades skillCategory y skillName
    newData.skillCategoryName = additionalFields.categoryName;
    newData.skillName = additionalFields.name;
      setNewCardData((prevCardData) => [...prevCardData, newData]);

      // Buscar el curso en el array courses
     // Buscar la habilidad en el array technicalSkills
const skill = technicalSkills.find(skill => skill.name === additionalFields.name);

// Si la habilidad no está en el array technicalSkills, agregarla
if (!skill) {
  setTechnicalSkills(prevSkills => [...prevSkills, { name: additionalFields.name }]);
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

  const handleDeleteClick = (skill, cardTypeToDelete) => {
    setCardToDelete(skill);
    setCardTypeToDelete(cardTypeToDelete);
    setShowDeleteModal(true);
  };
  
  const handleConfirmDelete = async (cardToDelete, cardTypeToDelete) => {
    if (cardToDelete !== null && cardTypeToDelete !== null) {
      if (cardTypeToDelete === "cardContentHabilidades") {
        // Pasa los parámetros skillCategory y skillName a deleteTechnicalSkill
        await deleteTechnicalSkill(cardToDelete.skillCategoryName, cardToDelete.skillName);
        const updatedCardData = cardData.filter(
          (card) => card.skillName !== cardToDelete.skillName
        );
        setNewCardData(updatedCardData);
        setShowIcons(false);
        setEditMode(true);
        toast({
          title: "Éxito",
          description: "La habilidad técnica ha sido eliminada con éxito",
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
      {/* Texto Principal Habilidades */}
      <Text fontSize="lg" marginLeft="10" marginRight="10" marginTop="5">
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
      onClick={() => handleAddClick("Técnicas")}
    />
  )}
</Text>
{Object.keys(groupedSkills).map((category, index) => (
  <Box key={index}>
    <Text fontSize="lg" marginLeft="10" marginRight="10" marginTop="5">
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
      {groupedSkills[category].length > 0 ? (
        groupedSkills[category].map((skill, index) => (
          <Box key={index} position="relative" padding="2" marginRight="2">
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                {skill.skillName}
              </Text>
              {showIcons && (
                <CloseIcon
                  color="black"
                  position="absolute"
                  top="9px"
                  right="17px"
                  fontSize="16px"
                  cursor="pointer"
                  display={showIcons ? "block" : "none"}
                  onClick={() =>
                    handleDeleteClick(
                      skill,
                      "cardContentHabilidades"
                    )
                  }
                />
              )}
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
            En esta sección, puedes añadir tus habilidades técnicas
          </Text>
        </Box>
      )}
    </Box>
  </Box>
))}

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Habilidades Técnicas</ModalHeader>
          <ModalBody>
            Categorías
            <Select
              value={additionalFields.categoryName || ""}
              onChange={(e) => {
                handleFieldChange("categoryName", e.target.value);
                setSelectedCategory(e.target.value);
              }}
              placeholder="Selecciona una categoría"
              marginBottom="10px"
            >
              {category.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
            Habilidades
            <Select
              value={additionalFields.name || ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              placeholder="Selecciona una habilidad"
              marginBottom="10px"
              isDisabled={!selectedCategory} // Deshabilitar si selectedCategory es null
            >
              {technicalSkills.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddSkill}>
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
            <Button variant="ghost">Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HabilidadesTecnicasCard;
