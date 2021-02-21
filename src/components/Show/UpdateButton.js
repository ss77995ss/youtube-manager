import { IconButton, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UpdateModal from './UpdateModal';

function UpdateButton({ video }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton w="100%" icon={<EditIcon />} onClick={onOpen} />
      <UpdateModal key={JSON.stringify(video)} video={video} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default UpdateButton;
