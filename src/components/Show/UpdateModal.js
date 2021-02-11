import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useVideosCtx } from '../../hooks/useVideos';

function UpdateModal({ video, isOpen, onClose }) {
  const { id, title, category, description } = video;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title,
      category,
      description,
    },
  });
  const { categories, updateVideo } = useVideosCtx();

  const onSubmit = (data) => {
    const newVideo = {
      ...video,
      ...data,
    };

    updateVideo(id, newVideo);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl pr={2}>
              <FormLabel htmlFor="title">影片標題*</FormLabel>
              <Input name="title" placeholder="輸入影片標題" ref={register({ required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="category">影片種類</FormLabel>
              <Select name="category" ref={register}>
                <option value=""></option>
                {categories &&
                  categories.map((category, index) => (
                    <option key={`${category}-${index}`} value={category}>
                      {category}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel mt={2} htmlFor="description">
                影片敘述
              </FormLabel>
              <Textarea name="description" placeholder="輸入影片敘述" ref={register} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button type="submit">確認</Button>
              <Button onClick={onClose}>取消</Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default UpdateModal;
