import { Box } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Box
      display={['none', 'none', 'none', 'block']}
      width={280}
      height="100%"
      borderRight="1px solid #ccc"
      p={3}
      as="aside"
    >
      This is sidebar
    </Box>
  );
};

export default Sidebar;
