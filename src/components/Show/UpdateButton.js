import { Button, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UpdateModal from './UpdateModal';

function UpdateButton({ video }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<EditIcon />} colorScheme="blue" onClick={onOpen}>
        編輯影片
      </Button>
      <UpdateModal key={JSON.stringify(video)} video={video} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default UpdateButton;
