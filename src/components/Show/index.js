import { Box, Stack, Heading, Flex, Text } from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { useVideosCtx } from '../../hooks/useVideos';
import { useYoutubeCtx } from '../../hooks/useYouTube';
import useTimestamps from '../../hooks/useTimestamps';
import TimestampList from '../common/Timestamps';
import Buttons from './Buttons';

const opts = {
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

function Show() {
  const { id } = useParams();
  const { videos, updateVideo } = useVideosCtx();
  const video = videos.find((video) => video.id === id);
  const { videoId, title, description, timestamps } = video;
  const { video: ytVideo, handleReady } = useYoutubeCtx();
  const timestampsState = useTimestamps(timestamps);

  const handleTimestamp = () => {
    if (timestampsState.matches('edit')) {
      updateVideo(id, {
        ...video,
        timestamps: timestampsState.timestamps,
      });
    }
    timestampsState.changeMode();
  };

  return (
    <Stack>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Box mr={{ base: 'auto', lg: 2 }} mb={2} w="100%">
          <Box position="relative" pt="56.25%" w="100%">
            <YouTube className="youtube-player" videoId={videoId} opts={opts} onReady={handleReady} />
          </Box>
        </Box>
        <Stack mt={{ sm: 2, lg: 0 }} textAlign="left" w={{ base: '100%', lg: '420px' }} height="100%">
          <Buttons video={video} />
          <Heading as="h4" size="sm">
            影片標題
          </Heading>
          <Text>{title}</Text>
          <Heading as="h4" size="sm">
            影片敘述
          </Heading>
          <Text>{description || '無敘述'}</Text>
        </Stack>
      </Flex>
      <TimestampList video={ytVideo} {...timestampsState} handleChangeMode={handleTimestamp} />
    </Stack>
  );
}

export default Show;
