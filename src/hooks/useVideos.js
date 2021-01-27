import { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import { videosMachine } from '../machine/videos';

const VideosContext = createContext([]);

function VideosProvider({ children }) {
  const [state, send] = useMachine(videosMachine);
  const addNewVideo = (newVideo) => send({ type: 'NEW_VIDEO', value: newVideo });
  const addNewCategories = (newCategory) => send({ type: 'NEW_CATEGORY', value: newCategory });
  const updateCategory = (newCategory, index) => send({ type: 'UPDATE_CATEGORY', value: newCategory, index });
  const deleteCategory = (index) => send({ type: 'DELETE_CATEGORY', index });
  const filterByKeyword = (searchKeyword) => send({ type: 'FILTER_VIDEOS_BY_KEYWORD', searchKeyword });
  const filterByCategory = (searchCategory) => send({ type: 'FILTER_VIDEOS_BY_CATEGORY', searchCategory });

  const context = {
    ...state.context,
    addNewVideo,
    addNewCategories,
    updateCategory,
    deleteCategory,
    filterByKeyword,
    filterByCategory,
  };

  return <VideosContext.Provider value={context}>{children}</VideosContext.Provider>;
}

function useVideosCtx() {
  const context = useContext(VideosContext);

  if (!context) {
    throw new Error('useVideosCtx should be in the provider');
  }

  return context;
}

export { VideosProvider, useVideosCtx };
