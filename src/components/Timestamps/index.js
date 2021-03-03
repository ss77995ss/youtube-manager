import { useRef } from 'react';
import { Box, Flex, Heading, Stack, HStack, IconButton, Text, Collapse, Input } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { sortTimestampsByStartTime } from '../../utils/common';
import TimestampForm from './TimestampForm';
import Tag from './Tag';

function Timestamps({
  resolvedTimestamps,
  groupByTimestamps,
  lastCategoriesKey,
  matches,
  addNewTimestamp,
  updateTimestamp,
  handleChangeMode,
  handleDeleteTimeStamp,
  handleKeywordChange,
}) {
  const timestampRef = useRef();

  return (
    <Stack textAlign="left">
      <HStack>
        <Heading as="h4" size="sm">
          時間軸
        </Heading>
        <IconButton ml={2} size="sm" icon={<EditIcon />} onClick={handleChangeMode} />
        <Input w="25%" placeholder="搜尋時間軸" onChange={handleKeywordChange} />
      </HStack>
      <Collapse in={matches('edit')} animateOpacity>
        <Box>{<TimestampForm addNewTimestamp={addNewTimestamp} handleChangeMode={handleChangeMode} />}</Box>
      </Collapse>
      <Box ref={timestampRef}>
        {resolvedTimestamps.length > 0 && (
          <>
            {Object.keys(groupByTimestamps).map((key, index) => (
              <>
                <Text key={`timestamp-category-${key}-${index}`} fontWeight={500}>
                  {key === lastCategoriesKey ? '無類別' : key}
                </Text>
                <Flex flexWrap="wrap">
                  {sortTimestampsByStartTime(groupByTimestamps[key]).map((timestamp, index) => (
                    <Tag
                      matches={matches}
                      timestamp={timestamp}
                      updateTimestamp={updateTimestamp}
                      key={`${timestamp.category}-${timestamp.id}-${index}`}
                      handleDeleteTimeStamp={handleDeleteTimeStamp}
                    />
                  ))}
                </Flex>
              </>
            ))}
          </>
        )}
      </Box>
    </Stack>
  );
}

export default Timestamps;
