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
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { v1 as uuidv1 } from 'uuid';
import { decode } from 'js-base64';
import useParams from '../../hooks/useParams';
import { useVideosCtx } from '../../hooks/useVideos';
import { useYoutubeCtx } from '../../hooks/useYouTube';
import useTimestamps from '../../hooks/useTimestamps';
import Timestamps from '../Timestamps';
import CategoryForm from './CategoryForm';

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
  const { t } = useTranslation();
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
    const newTimestamps = timestampsState.timestamps.map((timestamp) => {
      return {
        ...timestamp,
        id: uuidv1(),
      };
    });
    const newVideo = {
      ...data,
      id: uuidv1(),
      videoId,
      timestamps: newTimestamps,
    };

    addNewVideo(newVideo);
    history.push('/');
  };

  return (
    <Stack px={2}>
      <Heading size="md">{t('addNewVideo')}</Heading>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <Box mx={{ base: 'auto', lg: 10, '2xl': 20 }} mb={2} w="100%">
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
          <Box textAlign="left" w={{ base: '100%', lg: '420px', '2xl': '540px' }} height="100%">
            <Button w="100%" type="submit" disabled={!currentVideoUrl || videoError || !video}>
              {t('submitData')}
            </Button>
            <FormControl>
              <FormLabel htmlFor="url">{t('videoUrl')}</FormLabel>
              <Input
                name="url"
                placeholder={t('')}
                ref={register({ required: true, pattern: /^https:\/\/(youtu\.be|youtube\.com|www.youtube.com)/ })}
              />
              {errors.videoUrl && <span>{t('invalidUrl')}</span>}
            </FormControl>
            <Flex mt={2}>
              <FormControl pr={2}>
                <FormLabel htmlFor="title">{t('videoTitle')}</FormLabel>
                <Input name="title" placeholder={t('inputVideoTitle')} ref={register({ required: true })} />
              </FormControl>
              <FormControl>
                <Flex>
                  <FormLabel htmlFor="category">{t('videoCategory')}</FormLabel>
                  <Button size="xs" fontSize={{ base: '0.65rem' }} onClick={onOpen}>
                    {t('')}
                  </Button>
                  <CategoryForm categories={categories} isOpen={isOpen} onClose={onClose} />
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
                {t('videoDescription')}
              </FormLabel>
              <Textarea height="100%" name="description" placeholder={t('inputVideoDescription')} ref={register} />
            </FormControl>
          </Box>
        </form>
      </Flex>
      <Timestamps video={video} {...timestampsState} />
    </Stack>
  );
}

export default Create;
