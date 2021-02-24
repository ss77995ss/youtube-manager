import { Box } from '@chakra-ui/react';
import SidebarContent from './Content';
import Drawer from './Drawer';

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <Box
        display={{ base: 'none', xl: 'block' }}
        width={280}
        height="100%"
        borderRight="1px solid #ccc"
        p={3}
        as="aside"
        position="fixed"
      >
        <SidebarContent />
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Sidebar;
