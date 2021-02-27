import { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import useCategories from './useCatagories';
import useTimestampCategories from './useTimestampCategories';
import { videosMachine } from '../machine/videos';

const VideosContext = createContext([]);

function VideosProvider({ children }) {
  const [state, send] = useMachine(videosMachine);
  const categoriesState = useCategories();
  const timestampCategoriesState = useTimestampCategories();
  const addNewVideo = (newVideo) => send({ type: 'NEW_VIDEO', value: newVideo });
  const filterByKeyword = (searchKeyword) => send({ type: 'FILTER_VIDEOS_BY_KEYWORD', searchKeyword });
  const filterByCategory = (searchCategory) => send({ type: 'FILTER_VIDEOS_BY_CATEGORY', searchCategory });
  const deleteVideo = (id) => send({ type: 'DELETE_VIDEO', id });
  const updateVideo = (id, newVideo) => send({ type: 'UPDATE_VIDEO', id, newVideo });

  const context = {
    ...state.context,
    ...categoriesState,
    ...timestampCategoriesState,
    addNewVideo,
    filterByKeyword,
    filterByCategory,
    deleteVideo,
    updateVideo,
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
