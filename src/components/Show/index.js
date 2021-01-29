import { Box, Stack, Heading, Flex, Text, Tag, TagLabel } from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { useVideosCtx } from '../../hooks/useVideos';
import useYouTube from '../../hooks/useYouTube';

const opts = {
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

function Show() {
  const { id } = useParams();
  const { videos } = useVideosCtx();
  const selectedVideo = videos.find((video) => video.id === id);
  const { videoId, title, description, timestampList } = selectedVideo;
  const { handleSetVideoTime, handleReady } = useYouTube();

  return (
    <Stack>
      <Flex flexWrap={{ base: 'wrap', md: 'wrap', lg: 'nowrap' }}>
        <Box mx={{ base: 'auto', lg: 2 }} w={{ base: 324, sm: 644, lg: 484, xl: 724 }}>
          <Box position="relative" pt="56.25%" border="2px solid black" w="100%">
            <YouTube className="youtube-player" videoId={videoId} opts={opts} onReady={handleReady} />
          </Box>
        </Box>
        <Stack textAlign="left" width={{ base: '100%', lg: `calc(100% - 484px)`, xl: 'calc(100% - 724px)' }}>
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
      <Stack textAlign="left">
        <Heading as="h4" size="sm">
          時間軸
        </Heading>
        {timestampList.length > 0 && (
          <Flex flexWrap="wrap">
            {timestampList.map(({ title, hour, minute, second }, index) => (
              <Tag mr={2} mb={3} key={`${title}-${index}`}>
                <TagLabel cursor="pointer" onClick={handleSetVideoTime(hour, minute, second)}>
                  {`${title} ${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}:${`0${second}`.slice(-2)}`}
                </TagLabel>
              </Tag>
            ))}
          </Flex>
        )}
      </Stack>
    </Stack>
  );
}

export default Show;
