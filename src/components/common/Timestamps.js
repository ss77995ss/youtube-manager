import { Box, Flex, Heading, Stack, IconButton, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import useYoutube from '../../hooks/useYouTube';
import AddTimestampForm from './AddTimestampForm';

function Timestamps({ timestamps, matches, addNewTimestamp, handleChangeMode, handleDeleteTimeStamp }) {
  const { handleSetVideoTime } = useYoutube();

  return (
    <Stack textAlign="left">
      <Heading as="h4" size="sm">
        時間軸
        <IconButton ml={2} size="sm" icon={<EditIcon />} onClick={handleChangeMode} />
      </Heading>
      {matches('edit') && <Box>{<AddTimestampForm addNewTimestamp={addNewTimestamp} />}</Box>}
      {timestamps.length > 0 && (
        <Flex flexWrap="wrap">
          {timestamps.map(({ title, hour, minute, second }, index) => (
            <Tag mr={2} mb={3} key={`${title}-${index}`}>
              <TagLabel cursor="pointer" onClick={handleSetVideoTime(hour, minute, second)}>
                {`${title} ${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}:${`0${second}`.slice(-2)}`}
              </TagLabel>
              {matches('edit') && <TagCloseButton onClick={handleDeleteTimeStamp(index)} />}
            </Tag>
          ))}
        </Flex>
      )}
    </Stack>
  );
}

export default Timestamps;
