import { useEffect } from 'react';
import { Box, Stack, Heading, Flex, Text, Textarea } from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useVideosCtx } from '../../hooks/useVideos';
import { useYoutubeCtx } from '../../hooks/useYouTube';
import useTimestamps from '../../hooks/useTimestamps';
import Timestamps from '../Timestamps';
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
  const { t } = useTranslation();
  const { videos, updateVideo } = useVideosCtx();
  const video = videos.find((video) => video.id === id);
  const { videoId, title, description, timestamps } = video;
  const { video: ytVideo, handleReady } = useYoutubeCtx();
  const timestampsState = useTimestamps(timestamps);
  const text = description || t('noDescription');

  const handleTimestamp = () => {
    if (timestampsState.matches('edit')) {
      updateVideo(id, {
        ...video,
        timestamps: timestampsState.timestamps,
      });
    }
    timestampsState.actions.changeMode();
  };

  useEffect(() => {
    timestampsState.actions.resetTimestamp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Stack px={2}>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Box mx={{ base: 'auto', lg: 4 }} mb={2} w="100%" maxWidth={1116}>
          <Box position="relative" pt="56.25%" w="100%">
            <YouTube className="youtube-player" videoId={videoId} opts={opts} onReady={handleReady} />
          </Box>
        </Box>
        <Box>
          <Stack mt={{ sm: 2, lg: 0 }} textAlign="left" w={{ base: '100%', lg: '420px' }} height="100%">
            <Buttons video={video} />
            <Heading as="h4" size="sm">
              {t('videoTitle')}
            </Heading>
            <Text>{title}</Text>
            <Heading as="h4" size="sm">
              {t('videoDescription')}
            </Heading>
            <Textarea p={0} h="100%" border="none" value={text} isReadOnly />
          </Stack>
        </Box>
      </Flex>
      <Timestamps video={ytVideo} {...timestampsState} handleChangeMode={handleTimestamp} />
    </Stack>
  );
}

export default Show;
