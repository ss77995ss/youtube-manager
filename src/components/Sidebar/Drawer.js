import { useTranslation } from 'react-i18next';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react';
import SidebarContent from './Content';

function SidebarDrawer({ isOpen, onClose }) {
  const { t } = useTranslation();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full" display="none">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>{t('videoList')}</DrawerHeader>
          <DrawerCloseButton />

          <DrawerBody>
            <SidebarContent onClose={onClose} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue">{t('save')}</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default SidebarDrawer;
