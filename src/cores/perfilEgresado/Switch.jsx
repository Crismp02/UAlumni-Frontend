import { Switch, useColorModeValue } from '@chakra-ui/react';

const CustomSwitch = ({ isChecked, onChange }) => {
  const trackColor = useColorModeValue('gray.200', 'gray.600');
  const thumbColor = useColorModeValue('green.400', 'gray.50');

  return (
    <Switch
      isChecked={isChecked}
      onChange={onChange}
      trackColor={{ base: trackColor, md: trackColor }}
      thumbColor={{ base: thumbColor, md: thumbColor }}
      size="lg" // Puedes ajustar el tamaño según tus necesidades
    />
  );
};

export default CustomSwitch;
