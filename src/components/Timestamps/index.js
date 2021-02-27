import { Box, Flex, Heading, Stack, IconButton, Tag, TagLabel, TagCloseButton, Collapse } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useYoutubeCtx } from '../../hooks/useYouTube';
import TimestampForm from './TimestampForm';
import { useRef } from 'react';

function Timestamps({ timestamps, matches, addNewTimestamp, handleChangeMode, handleDeleteTimeStamp }) {
  const { handleSetVideoTime } = useYoutubeCtx();
  const timestampRef = useRef();

  return (
    <Stack textAlign="left">
      <Heading as="h4" size="sm">
        時間軸
        <IconButton ml={2} size="sm" icon={<EditIcon />} onClick={handleChangeMode} />
      </Heading>
      <Collapse in={matches('edit')} animateOpacity>
        <Box>{<TimestampForm addNewTimestamp={addNewTimestamp} handleChangeMode={handleChangeMode} />}</Box>
      </Collapse>
      <Flex flexWrap="wrap" ref={timestampRef}>
        {timestamps.length > 0 &&
          timestamps.map(({ title, startTime, endTime, interval }, index) => (
            <Tag mr={2} mb={3} key={`${title}-${index}`}>
              <TagLabel cursor="pointer" onClick={handleSetVideoTime(startTime, interval)}>
                {interval === 0
                  ? `${title} ${`0${startTime.hour}`.slice(-2)}:${`0${startTime.minute}`.slice(
                      -2,
                    )}:${`0${startTime.second}`.slice(-2)}`
                  : `${title} ${`0${startTime.hour}`.slice(-2)}:${`0${startTime.minute}`.slice(
                      -2,
                    )}:${`0${startTime.second}`.slice(-2)} ~ ${`0${endTime.hour}`.slice(
                      -2,
                    )}:${`0${endTime.minute}`.slice(-2)}:${`0${endTime.second}`.slice(-2)}`}
              </TagLabel>
              {matches('edit') && <TagCloseButton onClick={handleDeleteTimeStamp(index)} />}
            </Tag>
          ))}
      </Flex>
    </Stack>
  );
}

export default Timestamps;
