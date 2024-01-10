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
import { AddIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import {
  AddCiapCourse,
  editCiapCourse,
  getCiapCourseItem,
  getCiapCourses,
} from "../../services/auth/MeProfile.services";

const CertificadosCard = ({ cardData, setCardData }) => {
  const [newCardData, setNewCardData] = useState(cardData);
  const [checkedItems, setCheckedItems] = useState([]);
  
  useEffect(() => {
    setNewCardData(cardData);
  }, [cardData]);

  useEffect(() => {
    const checkedItems = newCardData
      .filter((item) => item.isVisible)
      .map((item) => item.id);
    setCheckedItems(checkedItems);
  }, [newCardData]);

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCiapCourses().then((data) => {
      if (Array.isArray(data)) {
        setCourses(data);
      }
    });
  }, []);

  const [showAddButton, setShowAddButton] = useState(false);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [additionalFields, setAdditionalFields] = useState({}); // Estado para campos adicionales

  const toast = useToast();

  const handleCheckAll = async (e) => {
    if (e.target.checked) {
      setCheckedItems(newCardData.map((item) => item.id));
      // Update all items to be isVisible: true in the backend and local state
      const updatedData = newCardData.map((item) => ({
        ...item,
        isVisible: true,
      }));
      for (const item of updatedData) {
        await editCiapCourse(item.id, item);
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
        await editCiapCourse(item.id, item);
      }
      setNewCardData(updatedData);
    }
  };

  const handleCheck = async (e, item) => {
    const isChecked = e.target.checked;
    const updatedItem = { ...item, isVisible: isChecked };

    if (isChecked) {
      setCheckedItems([...checkedItems, item.id]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== item.id));
    }

    try {
      // Update the isVisible property in the backend
      await editCiapCourse(item.id, updatedItem);
      // Update the isVisible property in the local state
      setNewCardData((prevData) =>
        prevData.map((card) => (card.id === item.id ? updatedItem : card))
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

  const handleAddCourse = async () => {
    // Validar que los campos no estén vacíos
    if (!additionalFields.id || additionalFields.id === null) {
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
    const existingCourse = newCardData.find(
      (course) => course.id === additionalFields.id
    );
    if (existingCourse) {
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

    // Llamar a la función getCourseItem para obtener los detalles del curso
    const courseDetails = await getCiapCourseItem(additionalFields.id);

    // Preparar los datos para la solicitud POST
    const newData = {
      id: additionalFields.id,
      name: courseDetails.name, // Agregar el nombre del curso a los datos
      date: courseDetails.date, // Agregar la fecha del curso a los datos
    };

    // Llamar a la función AddCiapCourse con los datos preparados
    const newCard = await AddCiapCourse(newData);

    // Si la solicitud es exitosa, actualizar el estado cardData con los nuevos datos
    if (newCard) {
      setNewCardData((prevCardData) => [...prevCardData, newData]);

      // Buscar el curso en el array courses
      const course = courses.find(
        (course) => course.id === additionalFields.id
      );

      // Si el curso no está en el array courses, agregarlo
      if (!course) {
        setCourses((prevCourses) => [
          ...prevCourses,
          { id: additionalFields.id, name: newData.name },
        ]);
      }
      toast({
        title: "Éxito",
        description: "El certificado se ha añadido con éxito",
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

  // Función genérica para manejar la apertura del modal para agregar tarjetas
  const handleAddClick = (cardType) => {
    setCardTypeToAdd(cardType);
    setShowAddButton(false);
    setShowAddModal(true);
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
                Certificados CIAP
              </Text>
            </Flex>
            <AddIcon
              onClick={() => handleAddClick("Certificados")}
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
            newCardData.map((item, index) => {
              const date = new Date(item.date);
              const formattedDate = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
              return (
                <Flex key={index} alignItems="center" marginTop="3">
                  <Checkbox
                    colorScheme="green"
                    isChecked={checkedItems.includes(item.id)}
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
                    width="100%"
                  >
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text>{formattedDate}</Text>
                  </Box>
                </Flex>
              );
            })
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
                En esta sección, puedes añadir tus cursos de CIAP.
              </Text>
            </Box>
          )}
        </CardBody>
      </Card>

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#007935">
            Agregar certificados del CIAP
          </ModalHeader>
          <Divider orientation="horizontal" />
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            <>
              <Text marginTop="2px" as="b">
                Curso del CIAP
              </Text>
              <Select
                value={additionalFields.id || ""}
                onChange={(e) => handleFieldChange("id", e.target.value)}
                placeholder="Seleccionar curso"
                marginBottom="10px"
              >
                {courses.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.name}
                  </option>
                ))}
              </Select>
            </>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddCourse}
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
    </>
  );
};

export default CertificadosCard;
