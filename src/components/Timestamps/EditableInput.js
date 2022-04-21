import { useTranslation } from 'react-i18next';
import { Flex, Input, Text, IconButton, ButtonGroup } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { useMachine } from '@xstate/react';
import { editableInputMachine } from '../../machine/editableInput';
import InputErrorMessage from '../common/InputErrorMessage';

function EditableInput({ index, initialValue, onEdit, onDelete, validator, errorMessage }) {
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useForm({ defaultValues: { edit: initialValue } });
  const [state, send] = useMachine(editableInputMachine);
  const handleOpen = () => send('OPEN_EDIT');
  const handleClose = () => send('CLOSE_EDIT');
  const handleDelete = () => onDelete(index);
  const onSubmit = ({ edit }) => {
    onEdit(edit, index);
    send('SUBMIT');
  };

  return state.value === 'view' ? (
    <Flex mb={2} height="2.5rem" justify="space-between" align="center">
      <Text>{initialValue}</Text>
      <ButtonGroup size="sm" spacing={1}>
        <IconButton icon={<EditIcon />} onClick={handleOpen} />
        <IconButton icon={<DeleteIcon />} onClick={handleDelete} />
      </ButtonGroup>
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
        <ButtonGroup size="sm" spacing={1}>
          <IconButton type="submit" icon={<CheckIcon />} onClick={handleSubmit} />
          <IconButton type="button" icon={<CloseIcon />} onClick={handleClose} />
        </ButtonGroup>
      </Flex>
      {errors.edit?.type === 'required' && <InputErrorMessage message={t('inputTimestampCategory')} />}
      {errors.edit?.type === 'validate' && <InputErrorMessage message={errorMessage} />}
    </form>
  );
}

EditableInput.defaultProps = {
  initialValue: '',
  onEdit: () => {},
  onDelete: () => {},
  validator: () => false,
  errorMessage: 'Something went wrong',
};

export default EditableInput;
