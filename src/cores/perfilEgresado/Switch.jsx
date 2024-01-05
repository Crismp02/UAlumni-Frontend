import { Switch, useColorModeValue } from '@chakra-ui/react';

const CustomSwitch = ({ isChecked, onChange }) => {
  const trackColor = useColorModeValue('gray.200', 'gray.600');
  const thumbColor = useColorModeValue('green.400', 'gray.50');
  const checkedTrackColor = 'green.400'; // Cambia el color de la pista cuando el Switch está activado

  return (
    <Switch
      isChecked={isChecked}
      onChange={onChange}
      colorScheme="green" // Color general del Switch
      size="lg" 
      css={{
        '& input:checked + div': {
          backgroundColor: checkedTrackColor,
        },
      }}
    />
  );
};

export default CustomSwitch;