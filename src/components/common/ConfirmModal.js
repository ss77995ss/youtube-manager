import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ButtonGroup,
  Text,
} from '@chakra-ui/react';

function ConfirmModal({ text, isOpen, onClose, onConfirm }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent>
        <ModalBody>
          <Text>{text}</Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={handleConfirm}>確認</Button>
            <Button onClick={onClose}>取消</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmModal;
