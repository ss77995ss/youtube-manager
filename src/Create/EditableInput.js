import { Box, Flex, Input, Text, IconButton } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useMachine } from '@xstate/react';
import { editableInputMachine } from '../machine/editableInput';
import InputErrorMessage from '../common/InputErrorMessage';

const EditableInput = ({ index, initialValue, onEdit, validator, errorMessage }) => {
  const [state, send] = useMachine(editableInputMachine.withContext({ initialValue, inputValue: initialValue }));
  const handleChange = (event) => send('EDITING', { value: event.target.value });
  const handleOpen = () => send('OPEN_EDIT');
  const handleClose = () => send('CLOSE_EDIT', { value: initialValue });
  const handleSubmit = () => {
    if (state.context.inputValue === initialValue) {
      send('CLOSE_EDIT', { value: initialValue });
    } else if (validator(state.context.inputValue)) {
      send('ERROR');
    } else {
      onEdit(state.context.inputValue, index);
      send('SUBMIT');
    }
  };

  return (
    <Flex>
      {state.value === 'view' ? (
        <Text>{state.context.inputValue}</Text>
      ) : (
        <Box>
          <Input name="edit" value={state.context.inputValue} onChange={handleChange} />
          {state.value === 'error' && <InputErrorMessage message={errorMessage} />}
        </Box>
      )}
      {state.value === 'view' ? (
        <IconButton size="sm" icon={<EditIcon />} onClick={handleOpen} />
      ) : (
        <Flex>
          <IconButton size="sm" icon={<CheckIcon />} onClick={handleSubmit} />
          <IconButton size="sm" icon={<CloseIcon />} onClick={handleClose} />
        </Flex>
      )}
    </Flex>
  );
};

EditableInput.defaultProps = {
  initialValue: '',
  onEdit: () => {},
  validator: () => false,
  errorMessage: 'Something went wrong',
};

export default EditableInput;
