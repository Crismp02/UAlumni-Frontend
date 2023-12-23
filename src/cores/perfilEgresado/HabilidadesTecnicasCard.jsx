import React, { useState, useEffect } from "react";
import { Tag, TagCloseButton, useToast } from "@chakra-ui/react";
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
  Flex
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
    const existingTechnicalSkill = newCardData.find(
      (skill) => skill.skillName === additionalFields.name
    );
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
      // Actualizar newCardData asegurándose de que no haya duplicados
    setNewCardData(prevCardData => {
      const skillNames = prevCardData.reduce((acc, skill) => {
        acc[skill.skillName] = true;
        return acc;
      }, {});
      if (!skillNames[newData.skillName]) {
        return [...prevCardData, newData];
      }
      return prevCardData;
    });

      // Buscar el curso en el array courses
      // Buscar la habilidad en el array technicalSkills
      const skill = technicalSkills.find(
        (skill) => skill.name === additionalFields.name
      );

      // Si la habilidad no está en el array technicalSkills, agregarla
      if (!skill) {
        setTechnicalSkills((prevSkills) => [
          ...prevSkills,
          { name: additionalFields.name },
        ]);
      }
      
      // Actualizar groupedSkills
setGroupedSkills(prevGroupedSkills => {
  const newGroupedSkills = { ...prevGroupedSkills };
  if (!newGroupedSkills[additionalFields.categoryName]) {
    newGroupedSkills[additionalFields.categoryName] = [];
  }

  const skillNames = newGroupedSkills[additionalFields.categoryName].reduce((acc, skill) => {
    acc[skill.skillName] = true;
    return acc;
  }, {});

  if (!skillNames[newData.skillName]) {
    newGroupedSkills[additionalFields.categoryName].push(newData);
  }

  return newGroupedSkills;
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
        await deleteTechnicalSkill(
          cardToDelete.skillCategoryName,
          cardToDelete.skillName
        );
        const updatedCardData = cardData.filter(
          (card) => card.skillName !== cardToDelete.skillName
        );
        setNewCardData(updatedCardData);
  
        // Actualizar groupedSkills
        setGroupedSkills(prevGroupedSkills => {
          const newGroupedSkills = { ...prevGroupedSkills };
          newGroupedSkills[cardToDelete.skillCategoryName] = newGroupedSkills[cardToDelete.skillCategoryName].filter(
            (skill) => skill.skillName !== cardToDelete.skillName
          );
          return newGroupedSkills;
        });
  
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
      <Card marginTop="20px">
        <CardBody p="10px">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontWeight="bold"
              fontSize="md"
              marginLeft="2"
              marginBottom="1"
              display="flex"
              alignItems="center"
              color="#007935"
            >
              Habilidades Técnicas
            </Text>
            <AddIcon
              onClick={() => handleAddClick("Técnicas")}
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
          <Box display="flex" flexDirection="column" flexWrap="wrap">
  {Object.keys(groupedSkills).map((category, index) => (
    <Box key={index} border="2px solid #007935"
    borderTop="none"
    borderRight="none"
    borderBottom="none"
    marginTop="3"
    paddingLeft="2">
      <Text fontWeight="bold" fontSize="sm" marginBottom="3">
        {category}
      </Text>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        {groupedSkills[category].length > 0 ? (
          groupedSkills[category].map((skill, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="row"
            >
              <Box paddingLeft="2">
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
                  {skill.skillName}
                  <TagCloseButton
                    onClick={() =>
                      handleDeleteClick(skill, "cardContentHabilidades")
                    }
                  />
                </Tag>
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
          </Box>
        </CardBody>
      </Card>

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
