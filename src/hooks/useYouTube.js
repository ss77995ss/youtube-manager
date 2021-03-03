import { useState, useRef, createContext, useContext } from 'react';
import { timeToSeconds } from '../utils/common';

const YoutubeContext = createContext();

function YoutubeProvider({ children }) {
  const [video, setVideo] = useState(undefined);
  const timeoutRef = useRef(undefined);
  const [videoError, setVideoError] = useState(false);

  const handleSetVideoTime = (time, interval) => () => {
    clearTimeout(timeoutRef.current);
    video.seekTo(timeToSeconds(time));
    video.playVideo();
    if (interval) {
      timeoutRef.current = setTimeout(() => video.pauseVideo(), interval + 1000);
    }
    window.scrollTo(0, 0);
  };
  const handleReady = (event) => setVideo(() => event.target);
  const handlePlay = () => setVideoError(false);
  const handleError = () => setVideoError(true);
  const handleSetCurrentTime = () => {};

  const context = {
    video,
    videoError,
    handleSetVideoTime,
    handleReady,
    handlePlay,
    handleError,
    handleSetCurrentTime,
  };

  return <YoutubeContext.Provider value={context}>{children}</YoutubeContext.Provider>;
}

function useYoutubeCtx() {
  const context = useContext(YoutubeContext);

  if (!context) {
    throw new Error('useVideosCtx should be in the provider');
  }

  return context;
}

export { YoutubeProvider, useYoutubeCtx };
