import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Input,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useVideosCtx } from '../hooks/useVideos';
import EditableInput from './EditableInput';
import InputErrorMessage from '../common/InputErrorMessage';

const AddCategoryForm = ({ categories, isOpen, onClose }) => {
  const { register, handleSubmit, errors } = useForm();
  const { addNewCategories, updateCategory } = useVideosCtx();
  const validator = (value) => categories.includes((category) => category === value);

  const onSubmit = ({ newCategory }) => addNewCategories(newCategory);
  const handleUpdateCategory = (newCategory, index) => updateCategory(newCategory, index);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>管理影片種類</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex>
                <Input
                  mr={2}
                  variant="flushed"
                  name="newCategory"
                  placeholder="輸入種類名稱"
                  ref={register({
                    required: true,
                    validate: validator,
                  })}
                />
                <Button type="submit">新增</Button>
              </Flex>
              {errors.newCategory?.type === 'required' && (
                <Text fontSize="xs" color="red.500">
                  請填入影片種類名稱
                </Text>
              )}
              {errors.newCategory?.type === 'validate' && <InputErrorMessage message="影片種類名稱不可以重複" />}
            </form>
            {categories &&
              categories.map((category, index) => (
                <EditableInput
                  index={index}
                  initialValue={category}
                  onEdit={handleUpdateCategory}
                  validator={validator}
                  errorMessage="影片種類名稱不可以重複"
                />
              ))}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryForm;
