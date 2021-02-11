import {
  Flex,
  Button,
  IconButton,
  Input,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import { encode } from 'js-base64';

function ShareButton({ video }) {
  const encodeVideo = encode(JSON.stringify(video));
  const shareLink = `${window.location.origin}/create/?vh=${encodeVideo}`;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(shareLink);

  return (
    <>
      <IconButton icon={<LinkIcon />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>分享連結</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Flex mb={2}>
              <Input value={shareLink} isReadOnly />
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShareButton;
