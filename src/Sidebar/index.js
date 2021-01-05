import { Box, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
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
      <List>
        {videos &&
          videos.map((video, index) => (
            <Link to={`/show/${video.id}`}>
              <ListItem key={`sidebar-item-${index}`} cursor="pointer" _hover={{ bg: 'gray.300' }}>
                {video.title}
              </ListItem>
            </Link>
          ))}
      </List>
    </Box>
  );
};

export default Sidebar;
