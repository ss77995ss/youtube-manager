import { useState, createContext, useContext } from 'react';

const YoutubeContext = createContext();

function YoutubeProvider({ children }) {
  const [video, setVideo] = useState(undefined);
  const [videoError, setVideoError] = useState(false);

  const handleSetVideoTime = (hour, minute, second) => () => {
    video.seekTo(parseInt(hour, 10) * 3600 + parseInt(minute, 10) * 60 + parseInt(second, 10));
    window.scrollTo(0, 0);
  };
  const handleReady = (event) => setVideo(() => event.target);
  const handlePlay = () => setVideoError(false);
  const handleError = () => setVideoError(true);

  const context = { video, videoError, handleSetVideoTime, handleReady, handlePlay, handleError };

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
