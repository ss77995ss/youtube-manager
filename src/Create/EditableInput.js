import { Flex, Input, Text, IconButton } from '@chakra-ui/react';
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

  return state.value === 'view' ? (
    <Flex mb={2} height="2.5rem" justify="space-between" align="center">
      <Text>{initialValue}</Text>
      <IconButton size="sm" icon={<EditIcon />} onClick={handleOpen} />
    </Flex>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex height="2.5rem" justify="space-between" align="center">
        <Input
          mr={2}
          ref={register({
            required: true,
            validate: validator,
          })}
          name="edit"
        />
        <Flex>
          <IconButton mr={1} type="submit" size="sm" icon={<CheckIcon />} onClick={handleSubmit} />
          <IconButton type="button" size="sm" icon={<CloseIcon />} onClick={handleClose} />
        </Flex>
      </Flex>
      {errors.edit?.type === 'required' && <InputErrorMessage message="請填入影片種類名稱" />}
      {errors.edit?.type === 'validate' && <InputErrorMessage message={errorMessage} />}
    </form>
  );
};

EditableInput.defaultProps = {
  initialValue: '',
  onEdit: () => {},
  validator: () => false,
  errorMessage: 'Something went wrong',
};

export default EditableInput;
