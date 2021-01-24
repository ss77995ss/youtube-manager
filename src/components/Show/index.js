import { Box, Heading, Flex, Text, Tag, TagLabel } from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { useVideosCtx } from '../../hooks/useVideos';
import useYouTube from '../../hooks/useYouTube';

const opts = {
  width: '348',
  height: '261',
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
    <Box>
      <Heading>{title}</Heading>
      <Flex flexWrap={['wrap', 'wrap', 'nowrap', 'nowrap']}>
        <Box border="2px solid black" w={`calc(${opts.width}px + 4px)`} h={`calc(${opts.height}px + 4px)`} mx="auto">
          <YouTube videoId={videoId} opts={opts} onReady={handleReady} />
        </Box>
        <Box
          mx={4}
          width={['100%', '100%', `calc(100% - ${opts.width}px - 4px)`, `calc(100% - ${opts.width}px - 4px)`]}
          textAlign="left"
        >
          <Heading as="h4" size="sm">
            影片敘述
          </Heading>
          <Text>{description || '無敘述'}</Text>
        </Box>
      </Flex>
      {timestampList && (
        <Box textAlign="left">
          <Heading as="h4" size="sm">
            時間軸
          </Heading>
          <Flex flexWrap="wrap">
            {timestampList.map(({ title, hour, minute, second }, index) => (
              <Tag mr={2} mb={3} key={`${title}-${index}`}>
                <TagLabel cursor="pointer" onClick={handleSetVideoTime(hour, minute, second)}>
                  {`${title} ${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}:${`0${second}`.slice(-2)}`}
                </TagLabel>
              </Tag>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default Show;
