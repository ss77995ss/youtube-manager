import { Text } from '@chakra-ui/react';

const InputErrorMessage = ({ message }) => {
  return (
    <Text fontSize="xs" color="red.500">
      {message}
    </Text>
  );
};

export default InputErrorMessage;
