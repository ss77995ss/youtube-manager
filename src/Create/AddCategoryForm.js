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

const AddCategoryForm = ({ categories, isOpen, onClose }) => {
  const { register, handleSubmit, errors } = useForm();
  const { addNewCategories } = useVideosCtx();

  const onSubmit = ({ newCategory }) => addNewCategories(newCategory);
  console.log(errors);
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
                    validate: (value) => categories.find((category) => category === value),
                  })}
                />
                <Button type="submit">新增</Button>
              </Flex>
              {errors.newCategory?.type === 'required' && (
                <Text fontSize="xs" color="red.500">
                  請填入影片種類名稱
                </Text>
              )}
              {errors.newCategory?.type === 'validate' && (
                <Text fontSize="xs" color="red.500">
                  影片種類名稱不可以重複
                </Text>
              )}
            </form>
            {categories && categories.map((category, index) => <Text mt={2}>{category}</Text>)}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryForm;
