import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const encodeVideo = encode(JSON.stringify(video), true);
  const shareLink = `${window.location.origin}/create/?vh=${encodeVideo}`;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(shareLink);

  return (
    <>
      <IconButton w="100%" icon={<LinkIcon />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>{t('shareLink')}</Text>
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
