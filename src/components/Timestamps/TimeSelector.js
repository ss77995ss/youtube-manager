import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

function TimeSelector({ type, register }) {
  const { t } = useTranslation();
  const [time, setTimestamp] = useState({
    [`${type}Hour`]: 0,
    [`${type}Minute`]: 0,
    [`${type}Second`]: 0,
  });
  const { video } = useYoutubeCtx();
  const handleSetCurrentVideoTime = () => {
    if (!video) return;
    const preciseTime = getPreciseTime(parseInt(video.getCurrentTime(), 10));

    setTimestamp({
      [`${type}Hour`]: preciseTime.hour,
      [`${type}Minute`]: preciseTime.minute,
      [`${type}Second`]: preciseTime.second,
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

  const text = type === 'start' ? t('startTime') : t('endTime');

  return (
    <Box w={{ base: '100%', lg: '50%' }}>
      <Stack my={2} direction="row">
        <Text align="left" fontWeight={500}>
          {text}
        </Text>
        <Button size="xs" fontSize={{ base: '0.65rem' }} onClick={handleSetCurrentVideoTime}>
          {t('currentTime')}
        </Button>
      </Stack>
      <Stack direction="row" align="center">
        <FormItem>
          <Select ref={register} name={`${type}Hour`} value={time[`${type}Hour`]} onChange={handleChangeTimestamp}>
            {[...Array(24).keys()].map((number) => (
              <option key={`hour-${number}`} value={number}>
                {`0${number}`.slice(-2)}
              </option>
            ))}
          </Select>
        </FormItem>
        <Text textAlign="center">：</Text>
        <FormItem mx={4}>
          <Select ref={register} name={`${type}Minute`} value={time[`${type}Minute`]} onChange={handleChangeTimestamp}>
            {[...Array(60).keys()].map((number) => (
              <option key={`minute-${number}`} value={number}>
                {`0${number}`.slice(-2)}
              </option>
            ))}
          </Select>
        </FormItem>
        <Text textAlign="center">：</Text>
        <FormItem>
          <Select ref={register} name={`${type}Second`} value={time[`${type}Second`]} onChange={handleChangeTimestamp}>
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
