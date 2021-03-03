import { useForm } from 'react-hook-form';
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
        管理時間軸種類
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>管理時間軸種類</ModalHeader>
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
                {errors.newCategory?.type === 'required' && <InputErrorMessage message="請填入時間軸種類名稱" />}
                {errors.newCategory?.type === 'validate' && <InputErrorMessage message="時間軸種類名稱不可以重複" />}
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
                      errorMessage="時間軸種類名稱不可以重複"
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
