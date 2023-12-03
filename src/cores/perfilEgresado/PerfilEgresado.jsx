import React from "react";
import NavBarEgresados from "../../components/NavBarEgresados";
import Footer from "../../components/Footer";
import {
  Box,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import CustomSwitch from "./Switch";

function PerfilEgresado() {
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  // mostrar iconos de editar y borrar

  const [showIcons, setShowIcons] = useState(false);
  const [showIconsEducacion, setShowIconsEducacion] = useState(false);
  const [showIconsTecnicas, setShowIconsTecnicas] = useState(false);

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const [editMode, setEditMode] = useState(true);
  const [editModeEducacion, setEditModeEducacion] = useState(true);
  const [editModeTecnicas, setEditModeTecnicas] = useState(true);

  const [showAddButton, setShowAddButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  // Define el estado para el tipo de tarjeta y el estado del modal
  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Función genérica para manejar la apertura del modal para agregar tarjetas
  const handleAddClick = (cardType) => {
    setCardTypeToAdd(cardType);
    setShowAddButton(false);
    setShowAddModal(true);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModalEducacion, setShowEditModalEducacion] = useState(false);

  const [cardIdToEditExpLaboral, setcardIdToEditExpLaboral] = useState(null);
  const [cardIdToEditEducacion, setCardIdToEditEducacion] = useState(null);

  const [cardContentEducacion, setCardContentEducacion] = useState([
    {
      id: 1,
      grado: "Licenciatura",
      anioFinal: "2023",
    },
    {
      id: 2,
      grado: "Grado",
      anioFinal: "2023",
    },
  ]);
  // Estado temporal para los cambios en Educacion
  const [tempEditingCardEducacion, setTempEditingCardEducacion] = useState({
    grado: "",
    anioFinal: "",
    // Otros campos que puedas tener en la tarjeta
  });

  const [cardContent, setCardContent] = useState([
    {
      id: 1,
      empresa: "Corporación XYZ",
      posicion: "Posición",
      fechaInicio: "01/01/2020",
      fechaFinal: "01/01/2022",
      descripcion:
        "En este cargo como Jefe de Comunicaciones en la Corporación XYZ, logró aumentar el tráfico web en un 20%.",
    },
  ]);

  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleMouseEnterHabilidades = (skill) => {
    setSelectedSkill(skill);
  };

  const handleMouseLeaveHabilidades = () => {
    setSelectedSkill(null);
  };

  // para mostrar iconos de editar y borrar al seleccionar el modo edicion
  const handleEditClick = (setShowIconsFunc, setEditModeFunc) => {
    setShowIconsFunc((prevIcons) => !prevIcons);
    setEditModeFunc((prevMode) => !prevMode);
    setShowAddButton(true); // Mostrar el botón de agregar después de editar
    setShowEditButton(false); // Ocultar el botón de editar después de editar
  };

  const handleDeleteClick = (cardId) => {
    setCardToDelete(cardId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Aquí se eliminas la tarjeta utilizando el ID almacenado en cardToDelete
    console.log("Eliminar tarjeta con ID:", cardToDelete);
    // Lógica para eliminar la tarjeta... en proceso

    // Cerrar el modal y limpiar el estado
    setShowDeleteModal(false);
    setCardToDelete(null);
  };

  const handleCancelDelete = () => {
    // Cancelar la eliminación, cerrar el modal y limpiar el estado
    setShowDeleteModal(false);
    setCardToDelete(null);
  };

  const [editingCard, setEditingCard] = useState({
    empresa: "",
    posicion: "",
    // Otros campos que puedas tener en la tarjeta
  });

  const [editingCardEducacion, setEditingCardEducacion] = useState({
    grado: "",
    anioFinal: "",
    // Otros campos que puedas tener en la tarjeta
  });

  // Modal de edición Experiencial Laboral
  const handleEditInputChange = (field, value, setState) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleEditCard = (cardToEdit) => {
    setEditingCard(cardToEdit);
    setShowEditModal(true);
  };

  // Modal de edición Educación
  const handleEditCardEducacion = (card) => {
    setCardIdToEditEducacion(card.id);
    setEditingCardEducacion({
      ...card, // Actualiza el estado con los datos de la tarjeta de educación seleccionada
    });
    setShowEditModalEducacion(true);
  };

const handleSaveEdit = (editedCard, content, setContent, setShowEditModal) => {
  const updatedContent = content.map(card => {
    if (card.id === editedCard.id) {
      return { ...editedCard }; // Actualizar la tarjeta completa con los nuevos datos
    }
    return card;
  });

  setContent(updatedContent);
  setShowEditModal(false);
};



  



  const handleCancelEdit = () => {
    // Cancelar la edición, cerrar el modal y limpiar el estado
    // modal experiencia laboral
    setCardIdToEditEducacion(null); // Restablecer a null o un valor inicial
    setShowEditModalEducacion(false); // Ocultar el modal de edición
    // modal educacion
    setcardIdToEditExpLaboral(null); // Restablecer a null o un valor inicial
    setShowEditModal(false); // Ocultar el modal de edición
  };

  return (
    <div>
      <NavBarEgresados />

      <Text
        fontSize={["lg", "lg", "xl", "4xl"]}
        color="black"
        textAlign="center"
        as="b"
        paddingTop={["2px", "2px", "2px", "10px"]}
        marginTop="10px"
        marginBottom="10px"
        style={{
          textDecoration: "underline",
          textDecorationColor: "green",
          display: "flex",
          justifyContent: "center",
        }}
      >
        PERFIL
      </Text>

      <Flex justifyContent="flex-end" alignItems="center" marginBottom="5px">
        <VStack spacing={4} marginRight="20px">
          <CustomSwitch isChecked={switchValue} onChange={handleSwitchChange} />
        </VStack>
      </Flex>

      <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
        <Box
          width={{ base: "100%", md: "45%" }}
          bg="#F5F5F5"
          height="100%"
          marginRight={{ base: "0", md: "20px" }}
          marginBottom={{ base: "20px", md: "0" }}
          marginLeft={{ base: "0", md: "20px" }}
        >
          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
            textAlign="center"
          >
            Nombre del Egresado
          </Text>
          <Text
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
            textAlign="center"
          >
            Carrera
          </Text>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            <Text
              bg="#007935"
              color="white"
              padding="4"
              borderRadius="4"
              cursor="pointer"
              fontWeight="BOLD"
              _hover={{ bg: "#005e28" }}
            >
              Cantidad de Descargas CV
            </Text>
          </Box>
          <Text
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
            textAlign="left"
            fontWeight="BOLD"
          >
            PORTAFOLIO
          </Text>
          <Box
            bg="white"
            padding="4"
            border="1px solid #ccc"
            borderRadius="8px"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0)"
            position="relative"
          >
            <EditIcon
              position="absolute"
              top="15px"
              right="20px"
              color="blue.500"
              boxSize={4}
              cursor="pointer"
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="4"
            >
              <Text fontWeight="bold">Titulo del Portafolio</Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="2"
            >
              <Text marginRight="4">wwww.miportafolio.com</Text>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="4"
          >
            <Text fontWeight="bold" marginLeft="10">
              Sobre Mí
            </Text>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="2"
          >
            <Text marginLeft="10" marginRight="10" marginBottom="10">
              Soy María, una licenciada en comunicadora social con 2 años de
              experiencia. Me apasiona crear experiencias visuales que impacten
              a las personas. Creo que el diseño gráfico es una herramienta
              poderosa que puede usarse para comunicar ideas de una manera
              efectiva.
            </Text>
          </Box>
        </Box>
        {/* inicio box exp laboral */}
        <Box
          width={{ base: "100%", md: "55%" }}
          bg="#F5F5F5"
          marginBottom="20px"
          position="relative"
        >
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
                cursor="pointer"
                color="green.500"
                position="absolute"
                right="45px"
                onClick={() => handleAddClick("Experiencia Laboral")}
              />
            )}
          </Text>
          {cardContent.map((card) => (
            <Box
              key={card.id}
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
              {/* Icono de editar y borrar en la esquina superior derecha de la tarjeta */}
              <EditIcon
                position="absolute"
                right="60px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIcons ? "block" : "none"}
                onClick={() => handleEditCard(card)}
              />

              <DeleteIcon
                position="absolute"
                right="80px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIcons ? "block" : "none"}
                onClick={() => handleDeleteClick(card.id)}
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="4"
                marginTop="10"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="3"
                >
                  <Text fontWeight="bold">{card.empresa}</Text>
                </Box>
                <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
                  {card.posicion}
                </Text>
              </Box>
              <Text fontSize="md" marginBottom="2">
                {card.descripcion}
              </Text>

              <Text fontSize="md" marginBottom="2">
                {card.fechaInicio} - {card.fechaFinal}
              </Text>
            </Box>
          ))}
          {/* Cierre de box */}

          {/* Modal de edición Experiencia Laboral*/}
          <Modal isOpen={showEditModal} onClose={handleCancelEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Experiencia Laboral</ModalHeader>
              <ModalBody>
                {editingCard && (
                  <>
                    <Input
                      value={editingCard.empresa}
                      onChange={(e) =>
                        handleEditInputChange("empresa", e.target.value, setEditingCard)
                      }
                      placeholder="Editar empresa..."
                      size="lg"
                      marginBottom="4"
                    />
                    <Input
                      value={editingCard.posicion}
                      onChange={(e) =>
                        handleEditInputChange("posicion", e.target.value, setEditingCard)
                      }
                      placeholder="Editar posición..."
                      size="lg"
                      marginBottom="4"
                    />
                    <Textarea
                      value={editingCard.descripcion}
                      onChange={(e) =>
                        handleEditInputChange("descripcion", e.target.value, setEditingCard)
                      }
                      placeholder="Editar Descripción..."
                      size="lg"
                      marginBottom="4"
                    />
                    Fecha Inicio
                    <Input
                      value={editingCard.fechaInicio}
                      onChange={(e) =>
                        handleEditInputChange("fechaInicio", e.target.value, setEditingCard)
                      }
                      size="lg"
                      marginBottom="4"
                      type="date"
                    />
                    Fecha Final
                    <Input
                      value={editingCard.fechaFinal}
                      onChange={(e) =>
                        handleEditInputChange("fechaFinal", e.target.value, setEditingCard)
                      }
                      size="lg"
                      marginBottom="4"
                      type="date"

                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => handleSaveEdit(editingCard, cardContent, setCardContent, setShowEditModal)}
                >
                  Guardar
                </Button>
                <Button variant="ghost" onClick={handleCancelEdit}>
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          

          {/* Fin de la experiencia laboral */}

          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="0"
          >
            Educación
            {editModeEducacion ? (
              <EditIcon
                cursor="pointer"
                position="absolute"
                right="45px"
                color="blue.500"
                onClick={() =>
                  handleEditClick(setShowIconsEducacion, setEditModeEducacion)
                }
              />
            ) : (
              <AddIcon
                cursor="pointer"
                color="green.500"
                position="absolute"
                right="45px"
                onClick={() => handleAddClick("Educación")}
              />
            )}
          </Text>
{/* inicio de tarjeta de educacion */}
          {cardContentEducacion.map((card) => (
                    <Box
                bg="white"
                padding="4"
                border="1px solid #ccc"
                borderRadius="8px"
                marginLeft="10"
                marginRight="10"
                marginTop="5"
                marginBottom="5"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0)"
                position="relative"
              >

                {/* Iconos de edición y eliminación */}
                <EditIcon
                  position="absolute"
                  right="20px"
                  color="gray.500"
                  boxSize={4}
                  cursor="pointer"
                  display={showIconsEducacion ? 'block' : 'none'}
                  onClick={() => handleEditCardEducacion(card)}
                />

                <DeleteIcon
                  position="absolute"
                  right="40px"
                  color="gray.500"
                  boxSize={4}
                  cursor="pointer"
                  display={showIconsEducacion ? 'block' : 'none'}
                  onClick={() => handleDeleteClick(card.id)}
                />
                  
                

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom="4"
                >
                  <Text fontWeight="bold" marginTop="8">
                    {card.grado}
                  </Text>
                  <Text marginRight="4" marginTop="8">
                    {card.anioFinal}
                  </Text>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom="2"
                >
                  <Text marginRight="4">Universidad Católica Andrés Bello</Text>
                </Box>
              </Box>
              ))}
          {/* cierre de tarjeta de educacion */}

          {/* Modal de edición Educación */}
          <Modal isOpen={showEditModalEducacion} onClose={handleCancelEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Educación</ModalHeader>
              <ModalBody>
                {/* Verificar si hay una tarjeta en edición */}
                {editingCardEducacion && (
                  <>
                    <Input
                      value={editingCardEducacion.grado}
                      onChange={(e) =>
                        handleEditInputChange("grado", e.target.value, setEditingCardEducacion)
                      }
                      placeholder="Editar Grado..."
                      size="lg"
                      marginBottom="4"
                    />
                    <Input
                      type="date"
                      value={editingCardEducacion.anioFinal}
                      onChange={(e) =>
                        handleEditInputChange("anioFinal", e.target.value, setEditingCardEducacion)
                      }
                      placeholder="Editar año final..."
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
                  onClick={() => {
                    handleSaveEdit(editingCardEducacion, cardContentEducacion, setCardContentEducacion, setShowEditModalEducacion);
                  }}
                >
                  Guardar
                </Button>
                <Button variant="ghost" onClick={handleCancelEdit}>
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/*Modal agregar educacion*/}
          <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Agregar {cardTypeToAdd}</ModalHeader>
              <ModalBody>
                {/* campos correspondientes al tipo de tarjeta */}
                {cardTypeToAdd === "Educación" && (
                  <>
                    <Input placeholder="Grado" marginBottom="10px" />
                    Fecha
                    <Input
                      type="date"
                      placeholder="Fecha"
                      marginBottom="10px"
                    />
                    {/* ... Otros campos específicos de Educación ... */}
                  </>
                )}
                {cardTypeToAdd === "Experiencia Laboral" && (
                  <>
                    <Input placeholder="Nombre Empresa" marginBottom="10px" />
                    <Input placeholder="Posición" marginBottom="10px" />
                    <Textarea
                      placeholder="Descripción..."
                      marginBottom="10px"
                    />
                    Fecha Inicio
                    <Input
                      type="date"
                      placeholder="Posición"
                      marginBottom="10px"
                    />
                    Fecha Final
                    <Input
                      type="date"
                      placeholder="Posición"
                      marginBottom="10px"
                    />
                    {/* ... Otros campos específicos de Experiencia Laboral ... */}
                  </>
                )}
                {cardTypeToAdd === "Técnicas" && (
                  <>
                    <Input
                      placeholder="Habilidad Técnica"
                      marginBottom="10px"
                    />
                  </>
                )}
                {/*Mas tipos de tarjetas ... */}
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={
                    3
                  } /* Agrega lógica para guardar según el tipo de tarjeta */
                >
                  Guardar
                </Button>
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
{/* Texto Principal Habilidades */}
          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            HABILIDADES
          </Text>
          <Text
            fontSize="lg"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            TÉCNICAS
            {editModeTecnicas ? (
              <EditIcon
                cursor="pointer"
                position="absolute"
                right="45px"
                color="blue.500"
                onClick={() =>
                  handleEditClick(setShowIconsTecnicas, setEditModeTecnicas)
                }
              />
            ) : (
              <AddIcon
                cursor="pointer"
                color="green.500"
                position="absolute"
                right="45px"
                onClick={() => handleAddClick("Técnicas")}
              />
            )}
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            <Box
              position="relative"
              padding="2"
              marginBottom="2"
              marginRight="2"
              cursor="pointer"
              onMouseEnter={() => handleMouseEnterHabilidades("Habilidad 1")}
              onMouseLeave={handleMouseLeaveHabilidades}
            >
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 1
              </Text>
              {showDeleteIcon && (
                <CloseIcon
                  color="black"
                  position="absolute"
                  top="0px"
                  right="0px"
                  fontSize="16px"
                  cursor="pointer"
                  onClick={() => {
                    // Agregar lógica para eliminar la habilidad
                    console.log("Eliminar habilidad");
                  }}
                />
              )}
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 2
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 3
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 4
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 5
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 6
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 7
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 8
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 9
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 10
              </Text>
            </Box>
          </Box>
          <Text
            fontSize="lg"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            BLANDAS
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
            cursor="pointer"
            onMouseEnter={handleMouseEnterHabilidades}
            onMouseLeave={handleMouseLeaveHabilidades}
          >
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 100000
              </Text>
              {showDeleteIcon && (
                <CloseIcon
                  color="black"
                  position="absolute"
                  top="0px"
                  right="0px"
                  fontSize="16px"
                  cursor="pointer"
                  onClick={() => {
                    // Agregar lógica para eliminar la habilidad
                    console.log("Eliminar habilidad");
                  }}
                />
              )}
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 2
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 3
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 4
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 5
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 6
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 7
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 8
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 9
              </Text>
            </Box>
            <Box padding="2" marginBottom="2" marginRight="2">
              <Text bg="#3182CE" padding="2" borderRadius="4px" color="white">
                Habilidad 10
              </Text>
            </Box>
          </Box>
          <Text
            fontWeight="bold"
            fontSize="xl"
            margin="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Idiomas
          </Text>
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
            position="relative"
          >
            <EditIcon
              position="absolute"
              top="15px"
              right="20px"
              color="blue.500"
              boxSize={4}
              cursor="pointer"
            />

            <Box display="flex" alignItems="center" marginBottom="4">
              <Text fontWeight="bold">Idioma</Text>
              <Text
                bg="#FBC430"
                color="black"
                padding="2"
                borderRadius="8"
                marginLeft="5"
              >
                Nivel
              </Text>
            </Box>
          </Box>
          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Certificados
          </Text>
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
            position="relative"
          >
            <EditIcon
              position="absolute"
              top="15px"
              right="20px"
              color="blue.500"
              boxSize={4}
              cursor="pointer"
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="4"
              marginTop="10"
            >
              <Text fontWeight="bold">Título Certificado</Text>
              <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
                CIAP
              </Text>
            </Box>
            <Text fontSize="md" marginBottom="2">
              Fecha Emisión
            </Text>
          </Box>
          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            INFORMACIÓN DE CONTACTO
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            <Text
              bg="#007935"
              color="white"
              padding="4"
              borderRadius="4"
              cursor="pointer"
              _hover={{ bg: "#005e28" }}
            >
              Descargar CV
            </Text>
          </Box>
        </Box>
        {/* Modal de confirmación para eliminar */}
          <Modal isOpen={showDeleteModal} onClose={handleCancelDelete}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirmar Eliminación</ModalHeader>
              <ModalBody>
                ¿Estás seguro de que deseas eliminar?
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
                  Eliminar
                </Button>
                <Button variant="ghost" onClick={handleCancelDelete}>
                  Cancelar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      </Box>

      <Footer />
    </div>
  );
}

export default PerfilEgresado;
