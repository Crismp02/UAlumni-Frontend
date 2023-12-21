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
import { AddSoftSkill, deleteSoftSkill, getSoftSkills } from "../../services/auth/MeProfile.services";

const HabilidadesBlandasCard = ({cardData, setCardData}) => {

    const toast = useToast();
    const [newCardData, setNewCardData] = useState(cardData);

    const [softSkills, setSoftSkills] = useState([]);
    useEffect(() => {
      getSoftSkills().then(data => {
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

  const handleAddSkill = async () => {
    // Validar que los campos no estén vacíos
    if (!additionalFields.skillName || additionalFields.skillName === null){
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
    const existingSoftSkill = newCardData.find(softSkills => softSkills.name === additionalFields.skillName);
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
      setNewCardData(prevCardData => [...prevCardData, newData]);
  
      // Buscar el curso en el array courses
      const skill = softSkills.find(skill => skill.name === additionalFields.skillName);
  
      // Si el curso no está en el array courses, agregarlo
      if (!skill) {
        setCourses(prevCourses => [...prevCourses, { name: additionalFields.skillName }]);
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
    if (editedCard.habilidad.trim() === '') {
      // Mostrar un mensaje de error o manejar la situación según lo desees
      console.error('No puede estar vacío');
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
      {/* Texto Principal Habilidades */}

      <Text fontSize="lg" marginLeft="10" marginRight="10" marginTop="5">
        Blandas
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
            onClick={() => handleAddClick("SoftSkills")}
          />
        )}
      </Text>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        marginLeft="10"
        marginRight="10"
        marginBottom="5"
      >
        {Array.isArray(newCardData) && newCardData.length > 0 ? (
          newCardData.map((item, index) => (
            <Box key={index} position="relative" padding="2" marginRight="2">
              <Box padding="2" marginBottom="2" marginRight="2">
                <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                  {item.skillName}
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
                        item.skillName,
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
              En esta sección, puedes añadir tus habilidades blandas
            </Text>
          </Box>
        )}
      </Box>

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar {cardTypeToAdd}</ModalHeader>
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            {cardTypeToAdd === "SoftSkills" && (
              <>
                Habilidades Blandas
                <Select
                  value={additionalFields.skillName || ""}
                  onChange={(e) =>
                    handleFieldChange("skillName", e.target.value)
                  }
                  placeholder="Agregar Curso"
                  marginBottom="10px"
                >
                  {softSkills.map((softSkill) => (
                    <option key={softSkill.name} value={softSkill.name}>
                      {softSkill.name}
                    </option>
                  ))}
                </Select>
              </>
            )}
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
            <Button variant="ghost" >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


export default HabilidadesBlandasCard