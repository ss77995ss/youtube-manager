import { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import { videosMachine } from '../machine/videos';

const persistedVideosMachine = videosMachine.withConfig(
  {
    actions: {
      persistVideos: ({ videos }) => {
        try {
          localStorage.setItem('videos', JSON.stringify(videos));
        } catch (e) {
          console.error(e);
        }
      },
      persistCategories: ({ categories }) => {
        try {
          localStorage.setItem('categories', JSON.stringify(categories));
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
    categories: (() => {
      try {
        return JSON.parse(localStorage.getItem('categories')) || ['default'];
      } catch (e) {
        console.error(e);
        return ['default'];
      }
    })(),
  },
);

const VideosContext = createContext([]);

const VideosProvider = ({ children }) => {
  const [state, send] = useMachine(persistedVideosMachine);
  const addNewVideo = (newVideo) => send({ type: 'NEW_VIDEO', value: newVideo });
  const addNewCategories = (newCategory) => send({ type: 'NEW_CATEGORY', value: newCategory });
  const updateCategory = (newCategory, index) => send({ type: 'UPDATE_CATEGORY', value: newCategory, index });
  const deleteCategory = (index) => send({ type: 'DELETE_CATEGORY', index });

  const context = {
    ...state.context,
    addNewVideo,
    addNewCategories,
    updateCategory,
    deleteCategory,
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
