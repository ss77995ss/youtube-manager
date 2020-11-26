import { Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { useForm } from 'react-hook-form';

const getVideoId = (url) => {
  if (/^https:\/\/(youtu\.be)/.test(url)) {
    return url.split('be/')[1];
  } else if (/^https:\/\/(youtube\.com|www.youtube.com)/.test(url)) {
    return url.split('v=')[1];
  }

  return '';
};

const opts = {
  height: '200',
  width: '300',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const Create = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const currentVideoUrl = watch('url');
  const videoId = currentVideoUrl ? getVideoId(currentVideoUrl) : '';

  return (
    <Box>
      <Heading>新增影片</Heading>
      <Box>
        <YouTube videoId={videoId} opts={opts} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit">送出資料</Button>
      </form>
    </Box>
  );
};

export default Create;
