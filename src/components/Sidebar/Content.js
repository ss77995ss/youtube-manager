import { useTranslation } from 'react-i18next';
import { Input, Text, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useSidebar from '../../hooks/useSidebar';
import SearchSelector from './SearchSelector';

function Content({ onClose }) {
  const { t } = useTranslation();
  const { searchType, groupByVideos, lastCategoriesKey, handleKeywordChange, handleToggleSearchType } = useSidebar();

  return (
    <>
      <SearchSelector value={searchType} onChange={handleToggleSearchType} />
      <Input mb={2} placeholder={t('searchVideo')} onChange={handleKeywordChange} />
      {Object.keys(groupByVideos).length > 0 && (
        <List>
          {Object.keys(groupByVideos).map((key, index) => {
            const text = key === lastCategoriesKey ? t('noCategory') : key;
            return (
              <>
                <Text key={`category-${key}-${index}`} fontWeight={500}>
                  {text}
                </Text>
                {groupByVideos[key].length > 0 &&
                  groupByVideos[key].map((video, index) => (
                    <Link key={`-${video.id}-${index}`} to={`/show/${video.id}`}>
                      <ListItem
                        key={`sidebar-category-${key}-item-${index}`}
                        cursor="pointer"
                        onClick={onClose}
                        _hover={{ bg: 'gray.300' }}
                      >
                        {video.title}
                      </ListItem>
                    </Link>
                  ))}
              </>
            );
          })}
        </List>
      )}
    </>
  );
}

export default Content;
