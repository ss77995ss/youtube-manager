import { Box, Input, Text, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useSidebar from '../hooks/useSidebar';

const Sidebar = () => {
  const { searchType, searchKeyword, groupByVideos, lastCategoriesKey, handleKeywordChange } = useSidebar();

  return (
    <Box
      display={['none', 'none', 'none', 'block']}
      width={280}
      height="100%"
      borderRight="1px solid #ccc"
      p={3}
      as="aside"
    >
      <Input mb={2} value={searchKeyword} placeholder="搜尋影片" onChange={handleKeywordChange} />
      {searchType === 'categories' && Object.keys(groupByVideos).length > 0 && (
        <List>
          {Object.keys(groupByVideos).map((key, index) =>
            key === lastCategoriesKey ? (
              <>
                <Text key={`category-${key}-${index}`} fontWeight={500}>
                  無類別
                </Text>
                {groupByVideos[key].length > 0 &&
                  groupByVideos[key].map((video, index) => (
                    <Link to={`/show/${video.id}`}>
                      <ListItem
                        key={`sidebar-category-${key}-item-${index}`}
                        cursor="pointer"
                        _hover={{ bg: 'gray.300' }}
                      >
                        {video.title}
                      </ListItem>
                    </Link>
                  ))}
              </>
            ) : (
              <>
                <Text key={`category-${key}-${index}`} fontWeight={500}>
                  {key}
                </Text>
                {groupByVideos[key].length > 0 &&
                  groupByVideos[key].map((video, index) => (
                    <Link to={`/show/${video.id}`}>
                      <ListItem
                        key={`sidebar-category-${key}-item-${index}`}
                        cursor="pointer"
                        _hover={{ bg: 'gray.300' }}
                      >
                        {video.title}
                      </ListItem>
                    </Link>
                  ))}
              </>
            ),
          )}
        </List>
      )}
    </Box>
  );
};

export default Sidebar;
