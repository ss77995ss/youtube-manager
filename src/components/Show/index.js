import { Box, Stack, Heading, Flex, Text } from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { useVideosCtx } from '../../hooks/useVideos';
import { useYoutubeCtx } from '../../hooks/useYouTube';
import useTimestamps from '../../hooks/useTimestamps';
import TimestampList from '../common/Timestamps';
import EditButtons from './EditButtons';

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
      <Flex flexWrap={{ base: 'wrap', md: 'wrap', lg: 'nowrap' }}>
        <Box mx={{ base: 'auto', lg: 2 }} w={{ base: 324, sm: 644, lg: 484, xl: 724 }}>
          <Box position="relative" pt="56.25%" border="2px solid black" w="100%">
            <YouTube className="youtube-player" videoId={videoId} opts={opts} onReady={handleReady} />
          </Box>
        </Box>
        <Stack textAlign="left" width={{ base: '100%', lg: `calc(100% - 484px)`, xl: 'calc(100% - 724px)' }}>
          <EditButtons video={video} />
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
