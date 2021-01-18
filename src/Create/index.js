import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  Tag,
  TagLabel,
  TagCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { v1 as uuidv1 } from 'uuid';
import { remove } from 'ramda';
import { useVideosCtx } from '../hooks/useVideos';
import useYoutube from '../hooks/useYouTube';
import AddCategoryForm from './AddCategoryForm';
import AddTimestampForm from './AddTimestampForm';

const getVideoId = (url) => {
  if (/^https:\/\/(youtu\.be)/.test(url)) {
    return url.split('be/')[1];
  } else if (/^https:\/\/(youtube\.com|www.youtube.com)/.test(url)) {
    return url.split('v=')[1];
  }

  return '';
};

const opts = {
  width: '348',
  height: '261',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const renderForm = (addType, setAddType, setTimestampList) => {
  switch (addType) {
    case 'timestamp':
      return <AddTimestampForm setAddType={setAddType} setTimestampList={setTimestampList} />;
    // case 'category':
    //   return <AddCategoryForm />;
    default:
      return null;
  }
};

const Create = () => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories, addNewVideo } = useVideosCtx();
  const { register, handleSubmit, watch, errors } = useForm();
  const { video, videoError, handleSetVideoTime, handleReady, handlePlay, handleError } = useYoutube();
  const [addType, setAddType] = useState('');
  const [timestampList, setTimestampList] = useState([]);
  const currentVideoUrl = watch('url');
  const videoId = currentVideoUrl ? getVideoId(currentVideoUrl) : '';

  const onSubmit = (data) => {
    const newVideo = {
      ...data,
      id: uuidv1(),
      videoId,
      timestampList,
    };

    addNewVideo(newVideo);
    history.push('/');
  };

  const handleSwitchAddType = (event) => {
    const clickType = event.target.value;
    if (clickType === addType) {
      setAddType('');
    } else {
      setAddType(clickType);
    }
  };

  const handleDeleteTimeStamp = (index) => () => setTimestampList((prev) => remove(index, 1, prev));

  return (
    <Box>
      <Heading>新增影片</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexWrap={['wrap', 'wrap', 'nowrap', 'nowrap']}>
          <Box
            mt={2}
            border="2px solid black"
            w={`calc(${opts.width}px + 4px)`}
            h={`calc(${opts.height}px + 4px)`}
            mx="auto"
          >
            <YouTube videoId={videoId} opts={opts} onReady={handleReady} onPlay={handlePlay} onError={handleError} />
          </Box>
          <Box
            mx={4}
            width={['100%', '100%', `calc(100% - ${opts.width}px - 4px)`, `calc(100% - ${opts.width}px - 4px)`]}
          >
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
            <FormControl>
              <FormLabel mt={2} htmlFor="description">
                影片敘述
              </FormLabel>
              <Textarea name="description" placeholder="輸入影片敘述" ref={register} />
            </FormControl>
          </Box>
        </Flex>
        <Button
          mr={2}
          value="timestamp"
          onClick={handleSwitchAddType}
          disabled={!currentVideoUrl || videoError || !video}
        >
          新增時間軸
        </Button>
        <Button type="submit" disabled={!currentVideoUrl || videoError || !video}>
          送出資料
        </Button>
      </form>
      <Box>{renderForm(addType, setAddType, setTimestampList)}</Box>
      {timestampList && (
        <Flex flexWrap="wrap">
          {timestampList.map(({ title, hour, minute, second }, index) => (
            <Tag mr={2} mb={3} key={`${title}-${index}`}>
              <TagLabel cursor="pointer" onClick={handleSetVideoTime(hour, minute, second)}>
                {`${title} ${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}:${`0${second}`.slice(-2)}`}
              </TagLabel>
              <TagCloseButton onClick={handleDeleteTimeStamp(index)} />
            </Tag>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Create;
