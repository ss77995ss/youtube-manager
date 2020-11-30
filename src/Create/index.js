import { useState } from 'react';
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { useForm } from 'react-hook-form';
import AddTimestampForm from './AddTimestampForm';
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
  width: '400',
  height: '320',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const renderForm = (addType, setAddType, setTimestampList) => {
  switch (addType) {
    case 'timestamp':
      return <AddTimestampForm setAddType={setAddType} setTimestampList={setTimestampList} />;
    case 'category':
      return <AddCategoryForm />;
    default:
      return null;
  }
};

const Create = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [video, setVideo] = useState(undefined);
  const [videoError, setVideoError] = useState(false);
  const [addType, setAddType] = useState('');
  const [timestampList, setTimestampList] = useState([]);
  const onSubmit = (data) => console.log(data);
  const currentVideoUrl = watch('url');
  const videoId = currentVideoUrl ? getVideoId(currentVideoUrl) : '';

  const handleReady = (event) => setVideo(() => event.target);
  const handlePlay = () => setVideoError(false);
  const handleError = () => setVideoError(true);
  const handleSwitchAddType = (event) => {
    const clickType = event.target.value;
    if (clickType === addType) {
      setAddType('');
    } else {
      setAddType(clickType);
    }
  };
  const handleSetVideoTime = (hour, minute, second) => () =>
    video.seekTo(parseInt(hour, 10) * 3600 + parseInt(minute, 10) * 60 + parseInt(second, 10));

  return (
    <Box>
      <Heading>新增影片</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <YouTube videoId={videoId} opts={opts} onReady={handleReady} onPlay={handlePlay} onError={handleError} />
          <Box mx={4} width="100%">
            <FormControl>
              <FormLabel htmlFor="url">影片網址</FormLabel>
              <Input
                name="url"
                placeholder="輸入影片網址"
                ref={register({ required: true, pattern: /^https:\/\/(youtu\.be|youtube\.com|www.youtube.com)/ })}
              />
              {errors.videoUrl && <span>影片網址格式錯誤</span>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="title">影片標題</FormLabel>
              <Input name="title" placeholder="輸入影片標題" ref={register} />
            </FormControl>
            <Button value="timestamp" onClick={handleSwitchAddType}>
              新增時間軸
            </Button>
            <Button value="category" onClick={handleSwitchAddType}>
              新增類別
            </Button>
            <Button type="submit" disabled={!currentVideoUrl || videoError}>
              送出資料
            </Button>
          </Box>
        </Flex>
      </form>
      <Box>{renderForm(addType, setAddType, setTimestampList)}</Box>
      {timestampList && (
        <Flex flexWrap="wrap">
          {timestampList.map(({ title, category, hour, minute, second }) => (
            <Button onClick={handleSetVideoTime(hour, minute, second)}>{title}</Button>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Create;
