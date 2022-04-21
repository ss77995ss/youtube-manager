import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
              <FormLabel htmlFor="title">{t('videoTitle')}</FormLabel>
              <Input name="title" placeholder={t('inputVideoTitle')} ref={register({ required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="category">{t('videoCategory')}</FormLabel>
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
                {t('videoDescription')}
              </FormLabel>
              <Textarea name="description" placeholder={t('inputVideoDescription')} ref={register} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button type="submit">{t('confirm')}</Button>
              <Button onClick={onClose}>{t('cancel')}</Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default UpdateModal;
