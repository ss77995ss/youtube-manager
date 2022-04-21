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
} from '@chakra-ui/react';
import { useVideosCtx } from '../../hooks/useVideos';
import EditableInput from './EditableInput';
import InputErrorMessage from '../common/InputErrorMessage';

function AddCategoryForm({ categories, isOpen, onClose }) {
  const { register, handleSubmit, errors } = useForm();
  const { addNewCategory, deleteCategory, updateCategory } = useVideosCtx();
  const { t } = useTranslation();
  const validator = (value) => {
    return !categories.includes(value);
  };

  const onSubmit = ({ newCategory }) => addNewCategory(newCategory);
  const handleUpdateCategory = (newCategory, index) => updateCategory(newCategory, index);
  const handleDeleteCategory = (index) => deleteCategory(index);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('manageVideoCategories')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex>
                <Input
                  mr={2}
                  variant="flushed"
                  name="newCategory"
                  placeholder={t('inputVideoCategory')}
                  ref={register({
                    required: true,
                    validate: validator,
                  })}
                />
                <Button type="submit">{t('addNew')}</Button>
              </Flex>
              {errors.newCategory?.type === 'required' && <InputErrorMessage message={t('inputVideoCatName')} />}
              {errors.newCategory?.type === 'validate' && <InputErrorMessage message={t('catCannotBeDuplicated')} />}
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
                    errorMessage={t('catCannotBeDuplicated')}
                  />
                ))}
              </Box>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddCategoryForm;
