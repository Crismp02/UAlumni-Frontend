import React, { useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure,Input, Text, List, ListItem, Box, Tag, TagLabel, Stack, Flex, IconButton} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon} from '@chakra-ui/icons'

function FiltrosEgresados(){
    const { isOpen, onOpen, onClose } = useDisclosure()
  const placement = "left"
  const [valueName, setValueName] = useState("");
  const handleChangeName = (event) => setValueName(event.target.value);
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const handleChange = (event) => setValue(event.target.value);
  const handleAdd = () => {
      setList(oldList => [...oldList, value]);
      setValue("");
  };
  const [valuePos, setValuePos] = useState("");
  const [listPos, setListPos] = useState([]);
  const handleChangePos = (event) => setValuePos(event.target.value);
  const handleAddPos = () => {
    setListPos(oldList => [...oldList, valuePos]);
    setValuePos("");
};


const [selectedTags, setSelectedTags] = useState({});

  const handleClick = (label) => {
    setSelectedTags(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const labels = ["ADMINISTRACIÓN", "COMUNICACIÓN SOCIAL", "CONTADURÍA", "DERECHO","EDUCACIÓN","INGENIERÍA CIVIL","INGENIERÍA INDUSTRIAL", "INGENIERÍA INFORMÁTICA","RELACIONES INDUSTRIALES"];

  const handleSubmit = () => {
    const data = {
      name: valueName,
      skills: list,
      positionsOfInterest: listPos,
      selectedTags: Object.keys(selectedTags).filter(tag => selectedTags[tag])
    };
    console.log(data);
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

          <DrawerHeader borderBottomWidth="1px">Filtros<IconButton
          icon={<CloseIcon />}
          onClick={onClose}
          float="right"
          /></DrawerHeader>        

          <DrawerBody>

            {/*Busqueda por nombre*/}
            <Text marginBottom="10px" marginTop="10px">Nombre:</Text>
            <Input value={valueName} onChange={handleChangeName} placeholder='Buscar egresado por nombre' size='md' marginBottom="30px" />

            {/*Busqueda por habilidad*/}
            <Text marginBottom="10px">Habilidades:</Text>
            <Box display="flex" flexDirection="row" alignItems="center">
            <Input value={value} onChange={handleChange} placeholder='Buscar egresado por habilidad' size='md' />
            <Button onClick={handleAdd} mt={2} marginLeft="10px" marginBottom="8px" backgroundColor="#007935" color="white" as="b">+</Button>
            </Box>
            <List mt={2} border="1px" borderColor="#E2E8F0" minH="70px" marginBottom="30px" padding="10px"> 
              {list.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>

            {/*Busqueda por posiciones de interes*/}
            <Text marginBottom="10px">Posiciones de interés:</Text>
            <Box display="flex" flexDirection="row" alignItems="center">
            <Input value={valuePos} onChange={handleChangePos} placeholder='Buscar egresado por posición de interés' size='md' />
            <Button onClick={handleAddPos} mt={2} marginLeft="10px" marginBottom="8px" backgroundColor="#007935" color="white" as="b">+</Button>
            </Box>
            <List mt={2} border="1px" borderColor="#E2E8F0" minH="70px" marginBottom="30px" padding="10px">
              {listPos.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>

            {/*Busqueda por carreras:*/}
            <Text marginBottom="10px">Carreras:</Text>
            <Stack p={{ base: 4, md: "20 20 10 20" }}>
            <Flex direction="row" justifyContent="center" wrap="wrap">
            {labels.map(label => (
            <Tag
              key={label}
              size="md"
              colorScheme="blue"
              variant={selectedTags[label] ? "solid" : "outline"}
              onClick={() => handleClick(label)}
              marginRight="10px"
              marginBottom="10px"
            >
              <TagLabel>{label}</TagLabel>
            </Tag> ))}</Flex>
            </Stack>
            <Button onClick={handleSubmit} mt={2} backgroundColor="#007935" color="white" as="b" flexDirection="row" style={{float: 'right'}}>BUSCAR</Button>      
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FiltrosEgresados;
