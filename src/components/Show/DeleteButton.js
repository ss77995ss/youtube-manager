import { Button, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import { useVideosCtx } from '../../hooks/useVideos';
import ConfirmModal from '../common/ConfirmModal';

function DeleteButton({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteVideo } = useVideosCtx();
  const history = useHistory();

  const handleDelete = (id) => () => {
    deleteVideo(id);
    history.push('/');
  };

  return (
    <>
      <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={onOpen}>
        刪除影片
      </Button>
      <ConfirmModal text="確定要取消此影片" isOpen={isOpen} onClose={onClose} onConfirm={handleDelete(id)} />
    </>
  );
}

export default DeleteButton;
