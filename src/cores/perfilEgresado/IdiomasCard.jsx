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
  IconButton,
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CustomSwitch from "./Switch";
import { useToast } from "@chakra-ui/react";
import { AddLanguage, DeleteLanguage, editLanguage, getLanguage, getLanguageItem} from "../../services/auth/MeProfile.services";

const IdiomasCard = ({cardData, setCardData}) => {
  const toast = useToast();

  const [newCardData, setNewCardData] = useState(cardData);

  // Define idiomas como un estado
  const [idiomas, setIdiomas] = useState([]);
  const niveles = [0, 1, 2, 3, 4, 5];

  // Usa useEffect para llamar a getLanguage cuando el componente se monta
  useEffect(() => {
    getLanguage().then(data => {
      if (Array.isArray(data)) {
        setIdiomas(data);
      }
    });
  }, []);

  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  const [editMode, setEditMode] = useState(true);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardTypeToDelete, setCardTypeToDelete] = useState("cardContentIdiomas");
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

  const handleAddLanguage = async () => {
    // Validar que los campos no estén vacíos
    if (!additionalFields.languageName || additionalFields.languageName.trim() === '' || additionalFields.masteryLevel === null || additionalFields.masteryLevel === 0){
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
  const languageExists = cardData.some(card => card.languageName === additionalFields.languageName);

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
      masteryLevel: parseInt(additionalFields.masteryLevel), 
      isVisible: true,
    };
  
    // Llamar a la función AddHigherEducationStudy con los datos preparados
    const newCard = await AddLanguage(newData);
  
    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData(prevCardData => [...prevCardData, newCard.data]);
    }
    // Mostrar un toast de éxito
  toast({
    title: "Éxito",
    description: "El idioma ha sido añadido con éxito",
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
    if (field === 'languageName') {
      // Solo guarda el nombre del idioma, no el objeto completo
      setter(prev => ({ ...prev, [field]: value }));
    } else {
      setter(prev => ({ ...prev, [field]: value }));
    }
  };

  const [content, setContent] = useState(null);
  const handleSaveEdit =  async () => {
  
    // Validar que los campos no estén vacíos
   if (!editingCard.languageName || editingCard.languageName.trim() === '' || editingCard.masteryLevel === null || editingCard.masteryLevel === 0){
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
  const languageExists = cardData.some(card => card.languageName === editingCard.languageName && card.languageName !== originalTitle);

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
      masteryLevel: parseInt(editingCard.masteryLevel), // Convertir a número entero
      isVisible: true,
    };
  
    const updatedCard = await editLanguage(originalTitle, newData);
    // Mostrar un toast de éxito
  toast({
    title: "Éxito",
    description: "El idioma ha sido editado con éxito",
    status: "success",
    duration: 3000,
    isClosable: true,
  });
  
    setContent(updatedCard);
    // Actualizar cardData con los nuevos datos
    const updatedCardData = cardData.map(card => {
      if (card.languageName === originalTitle) {
        return { ...card, languageName: newData.languageName, masteryLevel: newData.masteryLevel };
      } else {
        return card;
      }
    });
    setNewCardData(updatedCardData);
  
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
      if (cardTypeToDelete === "cardContentIdiomas") {
        await DeleteLanguage(cardToDelete);
        //setCardContentIdiomas(updatedCardContent);
        const updatedCardData = cardData.filter(card => card.languageName !== cardToDelete);
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
        console.error("Tipo de tarjeta no reconocido.");
        return;
      }

      // Cerrar el modal y limpiar el estado
      setShowDeleteModal(false);
      setCardToDelete(null);
    } else {
      console.error("ID de tarjeta o tipo de tarjeta es nulo.");
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
      <Text
        fontWeight="bold"
        fontSize="xl"
        marginLeft="10"
        marginTop="5"
        marginBottom="0"
        display="flex"
        alignItems="center"
      >
        Idiomas
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
            onClick={() => handleAddClick("Idiomas")}
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
  newCardData.map((item, index) => (
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
      {/* posicion a la derecha */}
      {showIcons && (
        <Flex justifyContent="flex-end" marginBottom="10px">
          <IconButton
            aria-label="Editar"
            icon={<EditIcon />}
            colorScheme="blue"
            marginRight="5px"
            onClick={() => handleEditCard(item.languageName)}
          />
          <IconButton
            aria-label="Eliminar"
            icon={<DeleteIcon />}
            colorScheme="red"
            marginLeft="5px"
            onClick={() => handleDeleteClick(item.languageName, "cardContentIdiomas")}
          />
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">{item.languageName}</Text>
        <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
          {item.masteryLevel}
        </Text>
      </Flex>
      <Flex alignItems="center" marginTop="5px">
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
    <Text color="gray.500">En esta sección, puedes indicar tu nivel de dominio de los idiomas que hablas.</Text>
  </Box>
)}

      {/* Modal de edición Idiomas*/}
      <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Idiomas</ModalHeader>
          <ModalBody>
            {editingCard && (
              <>
                <Select
                  value={editingCard.languageName}
                  onChange={(e) =>
                    handleEditInputChange(
                      "languageName",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar Idioma..."
                  size="lg"
                  marginBottom="4"
                >
                  {idiomas.map((idioma) => (
                    <option key={idioma.name} value={idioma.name}>
                      {idioma.name}
                    </option>
                  ))}
                </Select>

                <Select
                  value={editingCard.masteryLevel}
                  onChange={(e) =>
                    handleEditInputChange(
                      "masteryLevel",
                      e.target.value,
                      setEditingCard
                    )
                  }
                  placeholder="Editar Nivel..."
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
              onClick={
                handleSaveEdit
              }
            >
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
            {cardTypeToAdd === "Idiomas" && (
              <>
                Idioma
                <Select
                  value={additionalFields.languageName || ""}
                  onChange={(e) => handleFieldChange("languageName", e.target.value)}
                  placeholder="Agregar Idioma"
                  marginBottom="10px"
                >
                  {idiomas.map((idioma) => (
                    <option key={idioma.name} value={idioma.name}>
                      {idioma.name}
                    </option>
                  ))}
                </Select>
                Nivel
                <Select
                  value={additionalFields.masteryLevel || ""}
                  onChange={(e) => handleFieldChange("masteryLevel", e.target.value)}
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
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddLanguage}>
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
          <ModalHeader>Eliminación Idioma</ModalHeader>
          <ModalBody>¿Está seguro de que desea eliminar este Idioma?</ModalBody>
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