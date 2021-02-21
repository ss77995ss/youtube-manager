import { Box, Flex, Heading, Stack, IconButton, Tag, TagLabel, TagCloseButton, Collapse } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useYoutubeCtx } from '../../hooks/useYouTube';
import AddTimestampForm from './AddTimestampForm';
import { useRef } from 'react';

function Timestamps({ modeStatus, timestamps, matches, addNewTimestamp, handleChangeMode, handleDeleteTimeStamp }) {
  const { handleSetVideoTime } = useYoutubeCtx();
  const timestampRef = useRef();

  return (
    <Stack textAlign="left">
      <Heading as="h4" size="sm">
        時間軸
        <IconButton ml={2} size="sm" icon={<EditIcon />} onClick={handleChangeMode} />
      </Heading>
      <Collapse in={matches('edit')} animateOpacity>
        <Box>{<AddTimestampForm addNewTimestamp={addNewTimestamp} handleChangeMode={handleChangeMode} />}</Box>
      </Collapse>
      <Flex flexWrap="wrap" ref={timestampRef}>
        {timestamps.length > 0 &&
          timestamps.map(({ title, hour, minute, second }, index) => (
            <Tag mr={2} mb={3} key={`${title}-${index}`}>
              <TagLabel cursor="pointer" onClick={handleSetVideoTime(hour, minute, second)}>
                {`${title} ${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}:${`0${second}`.slice(-2)}`}
              </TagLabel>
              {matches('edit') && <TagCloseButton onClick={handleDeleteTimeStamp(index)} />}
            </Tag>
          ))}
      </Flex>
    </Stack>
  );
}

export default Timestamps;
