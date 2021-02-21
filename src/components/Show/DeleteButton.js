import { IconButton, useDisclosure } from '@chakra-ui/react';
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
      <IconButton w="100%" icon={<DeleteIcon />} onClick={onOpen} />
      <ConfirmModal text="確定要取消此影片" isOpen={isOpen} onClose={onClose} onConfirm={handleDelete(id)} />
    </>
  );
}

export default DeleteButton;
