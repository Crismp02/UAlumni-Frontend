import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Input,
  Text,
  List,
  ListItem,
  Box,
  Tag,
  TagLabel,
  Stack,
  Flex,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

function FiltrosEgresados() {
  const [isLargerThan435] = useMediaQuery("(min-width: 435px)");
  const [isHovering, setIsHovering] = useState(false);

  // Obtén la carrera de la URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const carreraFromUrl = params.get("carrera");

  // Estado para la carrera seleccionada
  const [selectedCarrera, setSelectedCarrera] = useState(carreraFromUrl);

  // Actualiza la carrera seleccionada cuando cambia la URL
  useEffect(() => {
    setSelectedCarrera(carreraFromUrl);
  }, [carreraFromUrl]);

  {
    /*Const del Drawer*/
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const placement = "left";

  {
    /*Busqueda por nombre*/
  }
  const [valueName, setValueName] = useState("");
  const handleChangeName = (event) => setValueName(event.target.value);

  {
    /*Busqueda por habilidades*/
  }
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const handleChange = (event) => setValue(event.target.value);
  const handleAdd = () => {
    setList((oldList) => [...oldList, value]);
    setValue("");
  };
  const handleRemove = (indexToRemove) => {
    setList((oldList) => oldList.filter((_, index) => index !== indexToRemove));
  };

  {
    /*Busqueda por posición de interés*/
  }
  const [valuePos, setValuePos] = useState("");
  const [listPos, setListPos] = useState([]);
  const handleChangePos = (event) => setValuePos(event.target.value);
  const handleAddPos = () => {
    setListPos((oldList) => [...oldList, valuePos]);
    setValuePos("");
  };
  const handleRemovePos = (indexToRemove) => {
    setListPos((oldList) =>
      oldList.filter((_, index) => index !== indexToRemove)
    );
  };

  {
    /*Busqueda por carrera*/
  }
  const [selectedTags, setSelectedTags] = useState({});
  const handleClick = (label) => {
    if (selectedCarrera === label) {
      setSelectedCarrera(null);
    } else {
      setSelectedTags((prev) => ({ ...prev, [label]: !prev[label] }));
    }
  };
  const labels = [
    "ADMINISTRACIÓN",
    "COMUNICACIÓN SOCIAL",
    "CONTADURÍA",
    "DERECHO",
    "EDUCACIÓN",
    "INGENIERÍA CIVIL",
    "INGENIERÍA INDUSTRIAL",
    "INGENIERÍA INFORMÁTICA",
    "RELACIONES INDUSTRIALES",
  ];

  const selectedTagsToSend = Object.keys(selectedTags).filter(
    (tag) => selectedTags[tag]
  );

  const carrersToSend = selectedCarrera
    ? [selectedCarrera, ...selectedTagsToSend]
    : selectedTagsToSend;

  {
    /*Botones de búsqueda y reset*/
  }
  const isDisabled =
    !valueName &&
    list.length === 0 &&
    listPos.length === 0 &&
    !selectedCarrera &&
    Object.keys(selectedTags).every((tag) => !selectedTags[tag]);

  const handleSubmit = () => {
    if (isDisabled) {
      return;
    }

    const data = {
      name: valueName,
      skills: list,
      positionsOfInterest: listPos,
      carrers: carrersToSend,
    };
    console.log(data);
  };

  const handleReset = () => {
    setValueName("");
    setValue("");
    setList([]);
    setValuePos("");
    setListPos([]);
    setSelectedTags({});
    setSelectedCarrera(null);
  };

  return (
    <>
      <Button
        backgroundColor="#37B4E3"
        _hover={{ bg: "#247390" }}
        onClick={onOpen}
        style={{
          borderRadius: "30px",
          marginLeft: "10px",
          width: "40px",
          height: "40px",
        }}
        marginBottom="5px"
      >
        <HamburgerIcon color="white" />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent paddingLeft="5px" paddingRight="5px">
          <DrawerHeader borderBottomWidth="1px">
            Filtros
            <IconButton icon={<CloseIcon />} onClick={onClose} float="right" />
          </DrawerHeader>

          <DrawerBody>
            {/*Busqueda por nombre*/}
            <Text marginBottom="10px" marginTop="10px">
              Nombre:
            </Text>
            {isLargerThan435 ? (
              <>
                <Input
                  value={valueName}
                  onChange={handleChangeName}
                  placeholder="Buscar egresado por nombre"
                  size="md"
                  marginBottom="30px"
                />
              </>
            ) : (
              <>
                {" "}
                <Input
                  value={valueName}
                  onChange={handleChangeName}
                  placeholder="Buscar egresado por nombre"
                  size="sm"
                  fontSize="10px"
                  marginBottom="30px"
                />
              </>
            )}

            {/*Busqueda por habilidad*/}
            <Text marginBottom="10px">Habilidades:</Text>
            <Box display="flex" flexDirection="row" alignItems="center">
              {isLargerThan435 ? (
                <>
                  <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Buscar egresado por habilidad"
                    size="md"
                  />
                  <Button
                    onClick={handleAdd}
                    mt={2}
                    marginLeft="10px"
                    marginBottom="8px"
                    backgroundColor="#007935"
                    color="white"
                    as="b"
                    _hover={{ bg: "#025024" }}
                  >
                    +
                  </Button>{" "}
                </>
              ) : (
                <>
                  <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Buscar egresado por habilidad"
                    fontSize="10px"
                    size="sm"
                  />{" "}
                  <Button
                    onClick={handleAdd}
                    mt={2}
                    marginLeft="10px"
                    marginBottom="8px"
                    backgroundColor="#007935"
                    color="white"
                    as="b"
                    size="sm"
                    _hover={{ bg: "#025024" }}
                  >
                    +
                  </Button>{" "}
                </>
              )}
            </Box>
            <List
              mt={2}
              border="1px"
              borderColor="#E2E8F0"
              minH="70px"
              marginBottom="30px"
              padding="10px"
            >
              {list.map((item, index) => (
                <ListItem key={index}>
                  {item}
                  <Button
                    onClick={() => handleRemove(index)}
                    mt={1}
                    marginLeft="20px"
                    marginBottom="8px"
                    backgroundColor="#EDF2F6"
                    color="black"
                    size="xs"
                  >
                    x
                  </Button>
                </ListItem>
              ))}
            </List>

            {/*Busqueda por posiciones de interes*/}
            <Text marginBottom="10px">Posiciones de interés:</Text>
            <Box display="flex" flexDirection="row" alignItems="center">
              {isLargerThan435 ? (
                <>
                  {" "}
                  <Input
                    value={valuePos}
                    onChange={handleChangePos}
                    placeholder="Buscar egresado por posición de interés"
                    size="md"
                  />
                  <Button
                    onClick={handleAddPos}
                    mt={2}
                    marginLeft="10px"
                    marginBottom="8px"
                    backgroundColor="#007935"
                    color="white"
                    as="b"
                    _hover={{ bg: "#025024" }}
                  >
                    +
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Input
                    value={valuePos}
                    onChange={handleChangePos}
                    placeholder="Buscar egresado por posición de interés"
                    fontSize="10px"
                    size="sm"
                  />
                  <Button
                    onClick={handleAddPos}
                    mt={2}
                    marginLeft="10px"
                    marginBottom="8px"
                    backgroundColor="#007935"
                    color="white"
                    as="b"
                    size="sm"
                    _hover={{ bg: "#025024" }}
                  >
                    +
                  </Button>
                </>
              )}
            </Box>
            <List
              mt={2}
              border="1px"
              borderColor="#E2E8F0"
              minH="70px"
              marginBottom="30px"
              padding="10px"
            >
              {listPos.map((item, index) => (
                <ListItem key={index}>
                  {item}
                  <Button
                    onClick={() => handleRemovePos(index)}
                    mt={1}
                    marginLeft="20px"
                    marginBottom="8px"
                    backgroundColor="#EDF2F6"
                    color="black"
                    size="xs"
                  >
                    x
                  </Button>
                </ListItem>
              ))}
            </List>

            {/*Busqueda por carreras:*/}
            <Text marginBottom="10px">Carreras:</Text>
            {isLargerThan435 ? (
              <Stack p={{ base: 4, md: "20 20 10 20" }}>
                <Flex direction="row" justifyContent="center" wrap="wrap">
                  {labels.map((label) => (
                    <Tag
                      key={label}
                      size="md"
                      colorScheme="blue"
                      variant={
                        selectedCarrera === label || selectedTags[label]
                          ? "solid"
                          : "outline"
                      }
                      onClick={() => handleClick(label)}
                      marginRight="10px"
                      marginBottom="10px"
                    >
                      <TagLabel>{label}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
              </Stack>
            ) : (
              <Stack p={{ base: 4, md: "20 20 10 20" }}>
                <Flex direction="row" justifyContent="center" wrap="wrap">
                  {labels.map((label) => (
                    <Tag
                      key={label}
                      size="sm"
                      fontSize="11px"
                      colorScheme="blue"
                      variant={
                        selectedCarrera === label || selectedTags[label]
                          ? "solid"
                          : "outline"
                      }
                      onClick={() => handleClick(label)}
                      marginRight="10px"
                      marginBottom="10px"
                    >
                      <TagLabel>{label}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
              </Stack>
            )}

            <Flex justifyContent="flex-end">
              {isLargerThan435 ? (
                <>
                  <Button
                    onClick={handleReset}
                    mt={2}
                    variant="outline"
                    backgroundColor="white"
                    borderWidth="2px"
                    borderColor="#007935"
                    color="#007935"
                    as="b"
                    marginRight="10px"
                  >
                    RESTAURAR FILTROS
                  </Button>
                  <Tooltip
                    label="Para buscar, complete al menos un filtro"
                    isOpen={isDisabled && isHovering}
                  >
                    <Button
                      onClick={() => {
                        handleSubmit();
                        onClose();
                      }}
                      isDisabled={isDisabled}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      mt={2}
                      backgroundColor="#007935"
                      color="white"
                      as="b"
                      _hover={{ bg: "#025024" }}
                    >
                      BUSCAR
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleReset}
                    mt={2}
                    variant="outline"
                    backgroundColor="white"
                    borderWidth="2px"
                    borderColor="#007935"
                    color="#007935"
                    as="b"
                    marginRight="10px"
                    fontSize="12px"
                    size="sm"
                  >
                    RESTAURAR FILTROS
                  </Button>
                  <Tooltip
                    label="Para buscar, complete al menos un filtro"
                    isOpen={isDisabled && isHovering}
                  >
                    <Button
                      onClick={() => {
                        handleSubmit();
                        onClose();
                      }}
                      isDisabled={isDisabled}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      mt={2}
                      backgroundColor="#007935"
                      color="white"
                      as="b"
                      _hover={{ bg: "#025024" }}
                      fontSize="12px"
                      size="sm"
                    >
                      BUSCAR
                    </Button>{" "}
                  </Tooltip>
                </>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FiltrosEgresados;