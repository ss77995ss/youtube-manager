import { Box, Flex, Input, Text, IconButton } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useMachine } from '@xstate/react';
import { editableInputMachine } from '../machine/editableInput';
import InputErrorMessage from '../common/InputErrorMessage';

const EditableInput = ({ index, initialValue, onEdit, validator, errorMessage }) => {
  const { register, handleSubmit, errors } = useForm({ defaultValues: { edit: initialValue } });
  const [state, send] = useMachine(editableInputMachine);
  const handleOpen = () => send('OPEN_EDIT');
  const handleClose = () => send('CLOSE_EDIT');
  const onSubmit = ({ edit }) => {
    onEdit(edit, index);
    send('SUBMIT');
  };

  return (
    <Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        {state.value === 'view' ? (
          <Text>{initialValue}</Text>
        ) : (
          <Box>
            <Input
              ref={register({
                required: true,
                validate: validator,
              })}
              name="edit"
            />
            {errors.edit?.type === 'required' && <InputErrorMessage message="請填入影片種類名稱" />}
            {errors.edit?.type === 'validate' && <InputErrorMessage message="影片種類名稱不可以重複" />}
          </Box>
        )}
        {state.value === 'view' ? (
          <IconButton size="sm" icon={<EditIcon />} onClick={handleOpen} />
        ) : (
          <Flex>
            <IconButton type="submit" size="sm" icon={<CheckIcon />} onClick={handleSubmit} />
            <IconButton type="button" size="sm" icon={<CloseIcon />} onClick={handleClose} />
          </Flex>
        )}
      </form>
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
