import { Tag, TagLabel, TagRightIcon, TagCloseButton, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useYoutubeCtx } from '../../hooks/useYouTube';
import UpdateModal from './UpdateModal';

function TimestampTag({ timestamp, updateTimestamp, matches, handleDeleteTimeStamp }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSetVideoTime } = useYoutubeCtx();
  const { title, startTime, endTime, interval } = timestamp;
  return (
    <Tag mr={2} mb={3}>
      <TagLabel cursor="pointer" onClick={handleSetVideoTime(startTime, interval)}>
        {interval === 0
          ? `${title} ${`0${startTime.hour}`.slice(-2)}:${`0${startTime.minute}`.slice(
              -2,
            )}:${`0${startTime.second}`.slice(-2)}`
          : `${title} ${`0${startTime.hour}`.slice(-2)}:${`0${startTime.minute}`.slice(
              -2,
            )}:${`0${startTime.second}`.slice(-2)} ~ ${`0${endTime.hour}`.slice(-2)}:${`0${endTime.minute}`.slice(
              -2,
            )}:${`0${endTime.second}`.slice(-2)}`}
      </TagLabel>
      {matches('edit') && (
        <>
          <TagRightIcon as={EditIcon} onClick={onOpen} />
          <UpdateModal
            key={`${timestamp.id}-${JSON.stringify(timestamp)}`}
            timestamp={timestamp}
            updateTimestamp={updateTimestamp}
            isOpen={isOpen}
            onClose={onClose}
          />
          <TagCloseButton onClick={handleDeleteTimeStamp(timestamp.id)} />
        </>
      )}
    </Tag>
  );
}

export default TimestampTag;
