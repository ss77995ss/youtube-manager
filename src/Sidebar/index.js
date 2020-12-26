import { Box, List, ListItem } from '@chakra-ui/react';
import { useLocalStorage } from 'react-use';

const Sidebar = () => {
  const [videos] = useLocalStorage('videos');

  return (
    <Box
      display={['none', 'none', 'none', 'block']}
      width={280}
      height="100%"
      borderRight="1px solid #ccc"
      p={3}
      as="aside"
    >
      <List>{videos && videos.map((video, index) => <ListItem>{video.title}</ListItem>)}</List>
    </Box>
  );
};

export default Sidebar;
