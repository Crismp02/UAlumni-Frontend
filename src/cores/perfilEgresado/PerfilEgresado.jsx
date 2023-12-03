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
  Select,
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
  const [showIconsIdiomas, setShowIconsIdiomas] = useState(false);
  const [showIconsTecnicas, setShowIconsTecnicas] = useState(false);
  const [showIconsCertificados, setShowIconsCertificados] = useState(false);
  const [showIconsPortafolios, setShowIconsPortafolios] = useState(false);
  const [showIconsSobremi, setShowIconsSobremi] = useState(false);

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const [editMode, setEditMode] = useState(true);
  const [editModeEducacion, setEditModeEducacion] = useState(true);
  const [editModeTecnicas, setEditModeTecnicas] = useState(true);
  const [editModeIdiomas, setEditModeIdiomas] = useState(true);
  const [editModeCertificados, setEditModeCertificados] = useState(true);
  const [editModePortafolios, setEditModePortafolios] = useState(true);
  const [editModeSobremi, setEditModeSobremi] = useState(true);

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
  const [cardTypeToDelete, setCardTypeToDelete] = useState("cardContent");
  const [formData, setFormData] = useState([]); // Inicializando formData como un array vacío
  const [additionalFields, setAdditionalFields] = useState({}); // Estado para campos adicionales

  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModalEducacion, setShowEditModalEducacion] = useState(false);
  const [showEditModalIdiomas, setShowEditModalIdiomas] = useState(false);
  const [showEditModalCertificados, setShowEditModalCertificados] =
    useState(false);
  const [showEditModalPortafolios, setShowEditModalPortafolios] =
    useState(false);
  const [showEditModalSobremi, setShowEditModalSobremi] = useState(false);

  const [cardIdToEditExpLaboral, setcardIdToEditExpLaboral] = useState(null);
  const [cardIdToEditEducacion, setCardIdToEditEducacion] = useState(null);
  const [cardIdToEditIdiomas, setCardIdToEditIdiomas] = useState(null);
  const [cardIdToEditCertificados, setCardIdToEditCertificados] =
    useState(null);
  const [cardIdToEditPortafolios, setCardIdToEditPortafolios] = useState(null);
  const [cardIdToEditSobremi, setCardIdToEditSobremi] = useState(null);

  const [cardContentEducacion, setCardContentEducacion] = useState([
    {
      id: 1,
      grado: "Licenciatura",
      anioFinal: "2023",
    },
  ]);

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
  const [cardContentIdiomas, setCardContentIdiomas] = useState([
    {
      id: 1,
      idioma: "Inglés",
      nivel: "Intermedio",
    },
  ]);
  const idiomas = ["Inglés", "Español", "Francés"];

  const niveles = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const [cardContentCertificados, setCardContentCertificados] = useState([
    {
      id: 1,
      titulo: "Titulo Certificado",
      curso: "CIAP",
      fecha: "18/01/2020",
    },
  ]);
  const [cardContentPortafolios, setCardContentPortafolios] = useState([
    {
      id: 1,
      titulo: "Titulo Portafolio",
      url: "wwww.miportafolio.com",
    },
  ]);
  const [cardContentSobremi, setCardContentSobremi] = useState([
    {
      id: 1,
      descripcion:
        "Soy María, una licenciada en comunicadora social con 2 años de experiencia. Me apasiona crear experiencias visuales que impacten a las personas. Creo que el diseño gráfico es una herramienta poderosa que puede usarse para comunicar ideas de una manera efectiva.",
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

  const handleDeleteClick = (cardId, cardType) => {
    if (cardId) {
      setCardToDelete(cardId);
      setCardTypeToDelete(cardType);
      setShowDeleteModal(true);
    } else {
      console.error("ID de tarjeta es nulo.");
    }
  };

  const handleConfirmDelete = (cardToDelete, cardTypeToDelete) => {
    if (cardToDelete !== null && cardTypeToDelete !== null) {
      let updatedCardContent = [];
      if (cardTypeToDelete === "cardContent") {
        updatedCardContent = cardContent.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContent(updatedCardContent);
      } else if (cardTypeToDelete === "cardContentEducacion") {
        updatedCardContent = cardContentEducacion.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContentEducacion(updatedCardContent);
      } else if (cardTypeToDelete === "cardContentIdiomas") {
        updatedCardContent = cardContentIdiomas.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContentIdiomas(updatedCardContent);
      } else if (cardTypeToDelete === "cardContentCertificados") {
        updatedCardContent = cardContentCertificados.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContentCertificados(updatedCardContent);
      } else if (cardTypeToDelete === "cardContentPortafolios") {
        updatedCardContent = cardContentPortafolios.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContentPortafolios(updatedCardContent);
      } else if (cardTypeToDelete === "cardContentSobremi") {
        updatedCardContent = cardContentSobremi.filter(
          (item) => item.id !== cardToDelete
        );
        setCardContentSobremi(updatedCardContent);
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

  const handleCancelDelete = () => {
    // Cancelar la eliminación, cerrar el modal y limpiar el estado
    setShowDeleteModal(false);
    setCardToDelete(null);
  };

  // logica para agregar datos nuevos al form
  const handleGuardar = () => {
    let newCardContent = [];

    // Lógica para agregar datos según el tipo de tarjeta actual
    switch (cardTypeToAdd) {
      case "Educación":
        // Lógica para agregar datos de Educación a newCardContent
        break;
      case "Experiencia Laboral":
        newCardContent = [
          ...cardContent,
          {
            id: cardContent.length + 1, // Generar un nuevo ID
            empresa: additionalFields.empresa,
            descripcion: additionalFields.descripcion,
            posicion: additionalFields.posicion,
            fechaInicio: additionalFields.fechaInicio,
            fechaFinal: additionalFields.fechaFinal,
          },
        ];
        setCardContent(newCardContent);
        setShowIcons(false);
        setEditMode(true);
        break;
      case "Idioma":
        newCardContent = [
          ...cardContentIdiomas,
          {
            id: cardContentIdiomas.length + 1, // Generar un nuevo ID
            idioma: additionalFields.idioma,
            nivel: additionalFields.nivel,
          },
        ];
        setCardContentIdiomas(newCardContent);
        setShowIconsIdiomas(false);
        setEditModeIdiomas(true);
        break;
      case "Certificado":
        newCardContent = [
          ...cardContentCertificados,
          {
            id: cardContentCertificados.length + 1, // Generar un nuevo ID
            titulo: additionalFields.titulo,
            curso: additionalFields.curso,
            fecha: additionalFields.fecha,
          },
        ];
        setCardContentCertificados(newCardContent);
        setShowIconsCertificados(false);
        setEditModeCertificados(true);

        break;
      // Agrega lógica para otros tipos de tarjetas si es necesario
      default:
        break;
    }

    // Restablecer los campos adicionales después de guardar
    setAdditionalFields({});
    // CERRAR MODAL DE AGREGAR
    setShowAddModal(false);
  };

  const handleFieldChange = (fieldName, value) => {
    // Actualizar solo el campo correspondiente en additionalFields
    setAdditionalFields({ ...additionalFields, [fieldName]: value });
  };

  const [editingCard, setEditingCard] = useState({
    empresa: "",
    posicion: "",
  });

  const [editingCardEducacion, setEditingCardEducacion] = useState({
    grado: "",
    anioFinal: "",
  });

  const [editingCardIdiomas, setEditingCardIdiomas] = useState({
    idioma: "",
    nivel: "",
  });

  const [editingCardCertificados, setEditingCardCertificados] = useState({
    titulo: "",
    fecha: "",
    // Otros campos que puedas tener en la tarjeta
  });

  const [editingCardPortafolios, setEditingCardPortafolios] = useState({
    titulo: "",
    fecha: "",
    // Otros campos que puedas tener en la tarjeta
  });

  const [editingCardSobremi, setEditingCardSobremi] = useState({
    descripcion: "",
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

  const handleEditCardIdiomas = (card) => {
    setEditingCardIdiomas(card);
    setShowEditModalIdiomas(true);
  };

  const handleEditCardCertificados = (card) => {
    setEditingCardCertificados(card);
    setShowEditModalCertificados(true);
  };

  const handleEditCardPortafolios = (card) => {
    setEditingCardPortafolios(card);
    setShowEditModalPortafolios(true);
  };

  const handleEditCardSobremi = (card) => {
    setEditingCardSobremi(card);
    setShowEditModalSobremi(true);
  };

  const handleSaveEdit = (
    editedCard,
    content,
    setContent,
    setShowEditModal
  ) => {
    const updatedContent = content.map((card) => {
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
    setcardIdToEditExpLaboral(null);
    setShowEditModal(false);

    setCardIdToEditIdiomas(null);
    setShowEditModalIdiomas(false);

    setCardIdToEditCertificados(null);
    setShowEditModalCertificados(false);

    setCardIdToEditPortafolios(null);
    setShowEditModalPortafolios(false);

    setCardIdToEditSobremi(null);
    setShowEditModalSobremi(false);
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
          position="relative"
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
            {editModePortafolios ? (
              <EditIcon
                cursor="pointer"
                position="absolute"
                right="45px"
                color="blue.500"
                onClick={() =>
                  handleEditClick(
                    setShowIconsPortafolios,
                    setEditModePortafolios
                  )
                }
              />
            ) : (
              <AddIcon
                cursor="pointer"
                color="green.500"
                position="absolute"
                right="45px"
                onClick={() => handleAddClick("Portafolio")}
              />
            )}
          </Text>
          {cardContentPortafolios.map((card) => (
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
                display={showIconsPortafolios ? "block" : "none"}
                onClick={() => handleEditCardPortafolios(card)}
              />

              <DeleteIcon
                position="absolute"
                right="80px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIconsPortafolios ? "block" : "none"}
                onClick={() =>
                  handleDeleteClick(card.id, "cardContentPortafolios")
                }
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="4"
                marginTop="5"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="3"
                >
                  <Text fontWeight="bold">{card.titulo}</Text>
                </Box>
              </Box>
              <Text fontSize="md" marginBottom="2">
                {card.url}
              </Text>
            </Box>
          ))}
          {/* Cierre de box */}
          {/* Modal de edición Portafolio*/}
          <Modal isOpen={showEditModalPortafolios} onClose={handleCancelEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Portafolio</ModalHeader>
              <ModalBody>
                {editingCard && (
                  <>
                    <Input
                      value={editingCardPortafolios.titulo}
                      onChange={(e) =>
                        handleEditInputChange(
                          "titulo",
                          e.target.value,
                          setEditingCardPortafolios
                        )
                      }
                      placeholder="Editar Portafolio..."
                      size="lg"
                      marginBottom="4"
                    />
                    <Input
                      value={editingCardPortafolios.url}
                      onChange={(e) =>
                        handleEditInputChange(
                          "url",
                          e.target.value,
                          setEditingCardPortafolios
                        )
                      }
                      placeholder="Editar Url..."
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
                  onClick={() =>
                    handleSaveEdit(
                      editingCardPortafolios,
                      cardContentPortafolios,
                      setCardContentPortafolios,
                      setShowEditModalPortafolios
                    )
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

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="4"
          >
            <Text fontWeight="bold" marginLeft="10">
              Sobre Mí
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
                  onClick={() => handleAddClick("Acerca de Mí")}
                />
              )}
            </Text>
          </Box>
          {cardContentSobremi.map((card) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="2"
              key={card.id}
            >
              <EditIcon
                position="absolute"
                right="60px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIconsSobremi ? "block" : "none"}
                onClick={() => handleEditCardSobremi(card)}
              />

              <DeleteIcon
                position="absolute"
                right="80px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIconsSobremi ? "block" : "none"}
                onClick={() => handleDeleteClick(card.id, "cardContentSobremi")}
              />

              <Text marginLeft="10" marginRight="10" marginBottom="10">
                {card.descripcion}
              </Text>
            </Box>
          ))}
        </Box>
        {/* inicio de 2do Box */}
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
          {/* Inicio Exp Laboral */}
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
                onClick={() => handleDeleteClick(card.id, "cardContent")}
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="4"
                marginTop="7"
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
                        handleEditInputChange(
                          "empresa",
                          e.target.value,
                          setEditingCard
                        )
                      }
                      placeholder="Editar empresa..."
                      size="lg"
                      marginBottom="4"
                    />
                    <Input
                      value={editingCard.posicion}
                      onChange={(e) =>
                        handleEditInputChange(
                          "posicion",
                          e.target.value,
                          setEditingCard
                        )
                      }
                      placeholder="Editar posición..."
                      size="lg"
                      marginBottom="4"
                    />
                    <Textarea
                      value={editingCard.descripcion}
                      onChange={(e) =>
                        handleEditInputChange(
                          "descripcion",
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
                      value={editingCard.fechaInicio}
                      onChange={(e) =>
                        handleEditInputChange(
                          "fechaInicio",
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
                      value={editingCard.fechaFinal}
                      onChange={(e) =>
                        handleEditInputChange(
                          "fechaFinal",
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
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() =>
                    handleSaveEdit(
                      editingCard,
                      cardContent,
                      setCardContent,
                      setShowEditModal
                    )
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
              key={card.id}
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
                display={showIconsEducacion ? "block" : "none"}
                onClick={() => handleEditCardEducacion(card)}
              />

              <DeleteIcon
                position="absolute"
                right="40px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIconsEducacion ? "block" : "none"}
                onClick={() =>
                  handleDeleteClick(card.id, "cardContentEducacion")
                }
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
                        handleEditInputChange(
                          "grado",
                          e.target.value,
                          setEditingCardEducacion
                        )
                      }
                      placeholder="Editar Grado..."
                      size="lg"
                      marginBottom="4"
                    />
                    <Input
                      type="date"
                      value={editingCardEducacion.anioFinal}
                      onChange={(e) =>
                        handleEditInputChange(
                          "anioFinal",
                          e.target.value,
                          setEditingCardEducacion
                        )
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
                    handleSaveEdit(
                      editingCardEducacion,
                      cardContentEducacion,
                      setCardContentEducacion,
                      setShowEditModalEducacion
                    );
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
            {editModeIdiomas ? (
              <EditIcon
                cursor="pointer"
                position="absolute"
                right="45px"
                color="blue.500"
                onClick={() =>
                  handleEditClick(setShowIconsIdiomas, setEditModeIdiomas)
                }
              />
            ) : (
              <AddIcon
                cursor="pointer"
                color="green.500"
                position="absolute"
                right="45px"
                onClick={() => handleAddClick("Idioma")}
              />
            )}
          </Text>
          {/* Inicio box de Idiomas */}
          {cardContentIdiomas.map((card) => (
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
              position="relative"
            >
              {/* Iconos de edición y eliminación */}
              <EditIcon
                position="absolute"
                right="20px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIconsIdiomas ? "block" : "none"}
                onClick={() => handleEditCardIdiomas(card)}
              />

              <DeleteIcon
                position="absolute"
                right="40px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIconsIdiomas ? "block" : "none"}
                onClick={() => handleDeleteClick(card.id, "cardContentIdiomas")}
              />

              <Box display="flex" alignItems="center" marginBottom="4">
                <Text fontWeight="bold">{card.idioma}</Text>
                <Text
                  bg="#FBC430"
                  color="black"
                  padding="2"
                  borderRadius="8"
                  marginLeft="5"
                >
                  {card.nivel}
                </Text>
              </Box>
            </Box>
          ))}
          {/* Fin box de Idiomas */}
          {/* Modal de edición Idiomas */}
          <Modal isOpen={showEditModalIdiomas} onClose={handleCancelEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Idioma</ModalHeader>
              <ModalBody>
                {/* Verificar si hay una tarjeta en edición */}
                {editingCardIdiomas && (
                  <>
                    
                    <Select
                      value={editingCardIdiomas.idioma || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          "idioma",
                          e.target.value,
                          setEditingCardIdiomas
                        )
                      }
                      size="lg"
                      marginBottom="4"
                    >
                      {idiomas.map((idioma) => (
                        <option key={idioma} value={idioma}>
                          {idioma}
                        </option>
                      ))}
                    </Select>
                    <Input
                      type="text"
                      value={editingCardIdiomas.nivel}
                      onChange={(e) =>
                        handleEditInputChange(
                          "nivel",
                          e.target.value,
                          setEditingCardIdiomas
                        )
                      }
                      placeholder="Editar Idioma..."
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
                    handleSaveEdit(
                      editingCardIdiomas,
                      cardContentIdiomas,
                      setCardContentIdiomas,
                      setShowEditModalIdiomas
                    );
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

          <Text
            fontWeight="bold"
            fontSize="xl"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            marginBottom="5"
          >
            Certificados
            {editModeCertificados ? (
              <EditIcon
                cursor="pointer"
                position="absolute"
                right="45px"
                color="blue.500"
                onClick={() =>
                  handleEditClick(
                    setShowIconsCertificados,
                    setEditModeCertificados
                  )
                }
              />
            ) : (
              <AddIcon
                cursor="pointer"
                color="green.500"
                position="absolute"
                right="45px"
                onClick={() => handleAddClick("Certificado")}
              />
            )}
          </Text>
          {cardContentCertificados.map((card) => (
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
              position="relative"
            >
              {/* Iconos de edición y eliminación */}
              <EditIcon
                position="absolute"
                right="20px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIconsCertificados ? "block" : "none"}
                onClick={() => handleEditCardCertificados(card)}
              />

              <DeleteIcon
                position="absolute"
                right="40px"
                color="gray.500"
                boxSize={4}
                cursor="pointer"
                display={showIconsCertificados ? "block" : "none"}
                onClick={() =>
                  handleDeleteClick(card.id, "cardContentCertificados")
                }
              />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="4"
                marginTop="10"
              >
                <Text fontWeight="bold">{card.titulo}</Text>
                <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
                  {card.curso}
                </Text>
              </Box>
              <Text fontSize="md" marginBottom="2">
                {card.fecha}
              </Text>
            </Box>
          ))}

          {/* Modal de edición Certificados */}
          <Modal isOpen={showEditModalCertificados} onClose={handleCancelEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Certificado</ModalHeader>
              <ModalBody>
                {/* Verificar si hay una tarjeta en edición */}
                {editingCardCertificados && (
                  <>
                    <Input
                      value={editingCardCertificados.titulo}
                      onChange={(e) =>
                        handleEditInputChange(
                          "titulo",
                          e.target.value,
                          setEditingCardCertificados
                        )
                      }
                      placeholder="Editar Titulo..."
                      size="lg"
                      marginBottom="4"
                    />
                    <Input
                      value={editingCardCertificados.curso}
                      onChange={(e) =>
                        handleEditInputChange(
                          "curso",
                          e.target.value,
                          setEditingCardCertificados
                        )
                      }
                      placeholder="Editar Curso..."
                      size="lg"
                      marginBottom="4"
                    />
                    Fecha
                    <Input
                      type="date"
                      value={editingCardCertificados.fecha}
                      onChange={(e) =>
                        handleEditInputChange(
                          "fecha",
                          e.target.value,
                          setEditingCardCertificados
                        )
                      }
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
                    handleSaveEdit(
                      editingCardCertificados,
                      cardContentCertificados,
                      setCardContentCertificados,
                      setShowEditModalCertificados
                    );
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
        {/*Modal agregar campos*/}
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
                  <Input type="date" placeholder="Fecha" marginBottom="10px" />
                </>
              )}
              {cardTypeToAdd === "Experiencia Laboral" && (
                <>
                  <Input 
                  placeholder="Nombre Empresa"
                  marginBottom="10px"
                  value={additionalFields.empresa || ""}
                  onChange={(e) =>
                      handleFieldChange("empresa", e.target.value)
                    }
                  
                  />
                  <Input 
                  value={additionalFields.posicion || ""}
                  onChange={(e) =>
                    handleFieldChange("posicion", e.target.value)
                  }
                  placeholder="Posición" 
                  marginBottom="10px" />
                  <Textarea 
                  value={additionalFields.descripcion || ""}
                  onChange={(e) =>
                    handleFieldChange("descripcion", e.target.value)
                  }
                  placeholder="Descripción..." 
                  marginBottom="10px" />
                  Fecha Inicio
                  <Input
                    value={additionalFields.fechaInicio || ""}
                    onChange={(e) =>
                      handleFieldChange("fechaInicio", e.target.value)
                    }
                    type="date"
                    placeholder="Posición"
                    marginBottom="10px"
                  />
                  Fecha Final
                  <Input
                    value={additionalFields.fechaFinal || ""}
                    onChange={(e) =>
                      handleFieldChange("fechaFinal", e.target.value)
                    }
                    type="date"
                    placeholder="Posición"
                    marginBottom="10px"
                  />
                  {/* ... Otros campos específicos de Experiencia Laboral ... */}
                </>
              )}
              {cardTypeToAdd === "Idioma" && (
                <>
                  <Select
                    value={additionalFields.idioma || ""}
                    onChange={(e) =>
                      handleFieldChange("idioma", e.target.value)
                    }
                    placeholder="Selecciona un idioma"
                    marginBottom="10px"
                  >
                    {idiomas.map((idioma) => (
                      <option key={idioma} value={idioma}>
                        {idioma}
                      </option>
                    ))}
                  </Select>

                  <Select
                    value={additionalFields.nivel || ""}
                    onChange={(e) => handleFieldChange("nivel", e.target.value)}
                    placeholder="Selecciona un nivel"
                    marginBottom="10px"
                  >
                    {niveles.map((nivel) => (
                      <option key={nivel} value={nivel}>
                        {nivel}
                      </option>
                    ))}
                  </Select>
                </>
              )}
              {cardTypeToAdd === "Certificado" && (
                <>
                  <Input
                    value={additionalFields.titulo || ""}
                    onChange={(e) =>
                      handleFieldChange("titulo", e.target.value)
                    }
                    placeholder="Certificado"
                    marginBottom="10px"
                  />
                  <Input
                    onChange={(e) => handleFieldChange("curso", e.target.value)}
                    value={additionalFields.curso || ""}
                    placeholder="Curso"
                    marginBottom="10px"
                  />
                  Fecha
                  <Input
                    onChange={(e) => handleFieldChange("fecha", e.target.value)}
                    type="date"
                    placeholder="Fecha"
                    marginBottom="10px"
                  />
                </>
              )}
              {cardTypeToAdd === "Portafolio" && (
                <>
                  <Input
                    placeholder="Titulo del portafolio"
                    marginBottom="10px"
                  />
                  <Input placeholder="URL del portafolio" marginBottom="10px" />
                </>
              )}
              {cardTypeToAdd === "Técnicas" && (
                <>
                  <Input placeholder="Habilidad Técnica" marginBottom="10px" />
                </>
              )}
              {cardTypeToAdd === "Acerca de Mí" && (
                <>
                  <Textarea placeholder="Descripción" marginBottom="10px" />
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleGuardar}>
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
      </Box>

      <Footer />
    </div>
  );
}

export default PerfilEgresado;
