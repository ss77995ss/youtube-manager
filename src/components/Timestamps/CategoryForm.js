import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Input,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useVideosCtx } from '../../hooks/useVideos';
import EditableInput from './EditableInput';
import InputErrorMessage from '../common/InputErrorMessage';

function CategoryForm({ categories }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, errors } = useForm();
  const { addNewTimestampCategory, updateTimestampCategory, deleteTimestampCategory } = useVideosCtx();
  const validator = (value) => {
    return !categories.includes(value);
  };

  const onSubmit = ({ newCategory }) => addNewTimestampCategory(newCategory);
  const handleUpdateCategory = (newCategory, index) => updateTimestampCategory(newCategory, index);
  const handleDeleteCategory = (index) => deleteTimestampCategory(index);

  return (
    <>
      <Button size="xs" fontSize={{ base: '0.65rem' }} onClick={onOpen}>
        {t('manageTimestamp')}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('manageTimestamp')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex>
                  <Input
                    mr={2}
                    variant="flushed"
                    name="newCategory"
                    placeholder={t('inputTimestampCategory')}
                    ref={register({
                      required: true,
                      validate: validator,
                    })}
                  />
                  <Button type="submit">{t('addNew')}</Button>
                </Flex>
                {errors.newCategory?.type === 'required' && <InputErrorMessage message={t('inputTimestampCategory')} />}
                {errors.newCategory?.type === 'validate' && (
                  <InputErrorMessage message={t('tsCatCannotBeDuplicated')} />
                )}
              </form>
              {categories && (
                <Box mt={2}>
                  {categories.map((category, index) => (
                    <EditableInput
                      index={index}
                      initialValue={category}
                      onEdit={handleUpdateCategory}
                      onDelete={handleDeleteCategory}
                      validator={validator}
                      errorMessage={t('tsCatCannotBeDuplicated')}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CategoryForm;
