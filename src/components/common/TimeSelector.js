import { useState } from 'react';
import { Box, Stack, Text, Button, Select, FormControl } from '@chakra-ui/react';
import { useYoutubeCtx } from '../../hooks/useYouTube';

// Ref: https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
function getPreciseTime(seconds) {
  const timeStr = new Date(seconds * 1000).toISOString().substr(11, 8);
  const timeArr = timeStr.split(':');
  return {
    hour: parseInt(timeArr[0], 10),
    minute: parseInt(timeArr[1], 10),
    second: parseInt(timeArr[2], 10),
  };
}

const FormItem = ({ children }) => <FormControl w="33%">{children}</FormControl>;

function TimeSelector({ register }) {
  const [{ hour, minute, second }, setTimestamp] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const { video } = useYoutubeCtx();
  const handleSetCurrentVideoTime = () => {
    if (!video) return;
    const current = video.getCurrentTime();
    setTimestamp((prev) => {
      return { ...getPreciseTime(parseInt(current, 10)) };
    });
  };
  const handleChangeTimestamp = (event) => {
    setTimestamp((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <Box>
      <Stack my={2} direction="row">
        <Text align="left" fontWeight={500}>
          時間
        </Text>
        <Button size="xs" fontSize={{ base: '0.65rem' }} onClick={handleSetCurrentVideoTime}>
          現在影片時間
        </Button>
      </Stack>
      <Stack direction="row" align="center">
        <FormItem>
          <Select ref={register} name="hour" value={hour} onChange={handleChangeTimestamp}>
            {[...Array(24).keys()].map((number) => (
              <option key={`hour-${number}`} value={number}>
                {`0${number}`.slice(-2)}
              </option>
            ))}
          </Select>
        </FormItem>
        <Text textAlign="center">：</Text>
        <FormItem mx={4}>
          <Select ref={register} name="minute" value={minute} onChange={handleChangeTimestamp}>
            {[...Array(60).keys()].map((number) => (
              <option key={`minute-${number}`} value={number}>
                {`0${number}`.slice(-2)}
              </option>
            ))}
          </Select>
        </FormItem>
        <Text textAlign="center">：</Text>
        <FormItem>
          <Select ref={register} name="second" value={second} onChange={handleChangeTimestamp}>
            {[...Array(60).keys()].map((number) => (
              <option key={`second-${number}`} value={number}>
                {`0${number}`.slice(-2)}
              </option>
            ))}
          </Select>
        </FormItem>
      </Stack>
    </Box>
  );
}

export default TimeSelector;
