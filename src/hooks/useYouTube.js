import { useState } from 'react';

function useYoutube() {
  const [video, setVideo] = useState('pend');
  const [videoError, setVideoError] = useState(false);

  const handleSetVideoTime = (hour, minute, second) => () => {
    video.seekTo(parseInt(hour, 10) * 3600 + parseInt(minute, 10) * 60 + parseInt(second, 10));
    window.scrollTo(0, 0);
  };
  const handleReady = (event) => setVideo(() => event.target);
  const handlePlay = () => setVideoError(false);
  const handleError = () => setVideoError(true);

  return { video, videoError, handleSetVideoTime, handleReady, handlePlay, handleError };
}

export default useYoutube;
