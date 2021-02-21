import {
  Box,
  Flex,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { v1 as uuidv1 } from 'uuid';
import { decode } from 'js-base64';
import useParams from '../../hooks/useParams';
import { useVideosCtx } from '../../hooks/useVideos';
import { useYoutubeCtx } from '../../hooks/useYouTube';
import useTimestamps from '../../hooks/useTimestamps';
import Timestamps from '../common/Timestamps';
import AddCategoryForm from './AddCategoryForm';

const getVideoId = (url) => {
  if (/^https:\/\/(youtu\.be)/.test(url)) {
    return url.split('be/')[1];
  } else if (/^https:\/\/(youtube\.com|www.youtube.com)/.test(url)) {
    return url.split('v=')[1];
  }

  return '';
};

const opts = {
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

function Create() {
  const history = useHistory();
  const query = useParams();
  const vh = query.get('vh');
  const defaultVideo = vh ? JSON.parse(decode(query.get('vh'))) : {};
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories, addNewVideo } = useVideosCtx();
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      ...defaultVideo,
    },
  });
  const { video, videoError, handleReady, handlePlay, handleError } = useYoutubeCtx();
  const timestampsState = useTimestamps(defaultVideo.timestamps || []);
  const currentVideoUrl = watch('url');
  const videoId = currentVideoUrl ? getVideoId(currentVideoUrl) : '';

  const onSubmit = (data) => {
    const newVideo = {
      ...data,
      id: uuidv1(),
      videoId,
      timestamps: timestampsState.timestamps,
    };

    addNewVideo(newVideo);
    history.push('/');
  };

  return (
    <Stack>
      <Heading>新增影片</Heading>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Box mx={{ base: 'auto', lg: 10 }} mb={2} w="100%">
          <Box position="relative" pt="56.25%" w="100%">
            <YouTube
              className="youtube-player"
              videoId={videoId}
              opts={opts}
              onReady={handleReady}
              onPlay={handlePlay}
              onError={handleError}
            />
          </Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box textAlign="left" w={{ base: '100%', lg: '420px' }} height="100%">
            <Button w="100%" type="submit" disabled={!currentVideoUrl || videoError || !video}>
              送出資料
            </Button>
            <FormControl>
              <FormLabel htmlFor="url">影片網址</FormLabel>
              <Input
                name="url"
                placeholder="輸入影片網址"
                ref={register({ required: true, pattern: /^https:\/\/(youtu\.be|youtube\.com|www.youtube.com)/ })}
              />
              {errors.videoUrl && <span>影片網址格式錯誤</span>}
            </FormControl>
            <Flex mt={2}>
              <FormControl pr={2}>
                <FormLabel htmlFor="title">影片標題*</FormLabel>
                <Input name="title" placeholder="輸入影片標題" ref={register({ required: true })} />
              </FormControl>
              <FormControl>
                <Flex>
                  <FormLabel htmlFor="category">影片種類</FormLabel>
                  <Button size="xs" fontSize={{ base: '0.65rem' }} onClick={onOpen}>
                    管理影片種類
                  </Button>
                  <AddCategoryForm categories={categories} isOpen={isOpen} onClose={onClose} />
                </Flex>
                <Select name="category" ref={register}>
                  <option value=""></option>
                  {categories &&
                    categories.map((category, index) => (
                      <option key={`${category}-${index}`} value={category}>
                        {category}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </Flex>
            <FormControl height="calc(100% - 144px - 1rem - 40px - 24px - 1rem)">
              <FormLabel mt={2} htmlFor="description">
                影片敘述
              </FormLabel>
              <Textarea height="100%" name="description" placeholder="輸入影片敘述" ref={register} />
            </FormControl>
          </Box>
        </form>
      </Flex>
      <Timestamps video={video} {...timestampsState} />
    </Stack>
  );
}

export default Create;
