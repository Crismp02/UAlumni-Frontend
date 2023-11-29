// Componente EducacionCard.js
import { Box, Text } from '@chakra-ui/react';
import {
    EditIcon,
    DeleteIcon,
    AddIcon,
  } from "@chakra-ui/icons";
  import { useState } from 'react';


const EducacionCard = ({ grado, anioFinal, card, showIconsEducacion, handleEditCardEducacion, handleDeleteClick }) => {
  return (
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
        onClick={() => handleEditCardEducacion(card.id)}
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
          {grado}
        </Text>
        <Text marginRight="4" marginTop="8">
          {anioFinal}
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
  );
};

export default EducacionCard;
