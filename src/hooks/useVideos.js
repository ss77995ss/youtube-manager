import { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import { videosMachine } from '../machine/videos';

const persistedVideosMachine = videosMachine.withConfig(
  {
    actions: {
      persist: (ctx) => {
        try {
          localStorage.setItem('videos', JSON.stringify(ctx.videos));
        } catch (e) {
          console.error(e);
        }
      },
    },
  },
  // initial state from localstorage
  {
    videos: (() => {
      try {
        return JSON.parse(localStorage.getItem('videos')) || [];
      } catch (e) {
        console.error(e);
        return [];
      }
    })(),
  },
);

const VideosContext = createContext([]);

const VideosProvider = ({ children }) => {
  const [state, send] = useMachine(persistedVideosMachine);
  const addNewVideo = (newVideo) => send({ type: 'NEW_VIDEO', value: newVideo });
  const context = {
    ...state.context,
    addNewVideo,
  };

  return <VideosContext.Provider value={context}>{children}</VideosContext.Provider>;
};

const useVideosCtx = () => {
  const context = useContext(VideosContext);

  if (!context) {
    throw new Error('useVideosCtx should be in the provider');
  }

  return context;
};

export { VideosProvider, useVideosCtx };
