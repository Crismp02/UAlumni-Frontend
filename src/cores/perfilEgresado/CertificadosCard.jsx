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
} from "@chakra-ui/react"; // Ajusta la importación según tu librería de componentes
import { AddIcon} from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import CustomSwitch from "./Switch";
import { AddCiapCourse, getCiapCourseItem, getCiapCourses } from "../../services/auth/MeProfile.services";

const CertificadosCard = ({cardData, setCardData}) => {

  const [newCardData, setNewCardData] = useState(cardData);

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCiapCourses().then(data => {
      if (Array.isArray(data)) {
        setCourses(data);
      }
    });
  }, []);

  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  const [showAddButton, setShowAddButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  const [cardTypeToAdd, setCardTypeToAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [additionalFields, setAdditionalFields] = useState({}); // Estado para campos adicionales

  const toast = useToast();

  const handleAddCourse = async () => {
    // Validar que los campos no estén vacíos
    if (!additionalFields.id || additionalFields.id === null){
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
    const existingCourse = newCardData.find(course => course.id === additionalFields.id);
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
      setNewCardData(prevCardData => [...prevCardData, newData]);
  
      // Buscar el curso en el array courses
      const course = courses.find(course => course.id === additionalFields.id);
  
      // Si el curso no está en el array courses, agregarlo
      if (!course) {
        setCourses(prevCourses => [...prevCourses, { id: additionalFields.id, name: newData.name }]);
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

  // Función genérica para manejar la apertura del modal para agregar tarjetas
  const handleAddClick = (cardType) => {
    setCardTypeToAdd(cardType);
    setShowAddButton(false);
    setShowAddModal(true);
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
        Certificados
          <AddIcon
            onClick={() => handleAddClick("Certificados")}
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
      </Text>

      {Array.isArray(newCardData) && newCardData.length > 0 ? (
  newCardData.map((item, index) => {
    // Convertir la fecha a un objeto Date y agregar un día
    const date = new Date(item.date);
    date.setDate(date.getDate() + 1);

    // Obtener solo el año de la fecha
    const year = date.getFullYear().toString();

    // Buscar el nombre del curso en el array courses
    const course = courses.find(course => course.id === item.id);
    const courseName = course?.name || 'Curso no encontrado';

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
        <Flex justifyContent="space-between">
          <Text fontWeight="bold">{courseName}</Text>
          <Text bg="#FBC430" color="black" padding="2" borderRadius="8">
            CIAP
          </Text>
        </Flex>
        <Text>{year}</Text>
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
    <Text color="gray.500">En esta sección, puedes añadir tus certificados del CIAP.</Text>
  </Box>
)}

      {/*Modal agregar campos*/}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar {cardTypeToAdd}</ModalHeader>
          <ModalBody>
            {/* campos correspondientes al tipo de tarjeta */}
            {cardTypeToAdd === "Certificados" && (
              <>
                Curso
                <Select
  value={additionalFields.id || ""}
  onChange={(e) => handleFieldChange("id", e.target.value)}
  placeholder="Agregar Curso"
  marginBottom="10px"
>
  {courses.map((curso) => (
    <option key={curso.id} value={curso.id}>
      {curso.name}
    </option>
  ))}
</Select>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddCourse}>
              Guardar
            </Button>
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CertificadosCard;