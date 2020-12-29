import { Box, List, ListItem } from '@chakra-ui/react';
import { useVideosCtx } from '../hooks/useVideos';

const Sidebar = () => {
  const { videos } = useVideosCtx();

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
