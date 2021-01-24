import { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { searchVideosMachine } from '../machine/searchVideos';
import { useVideosCtx } from '../hooks/useVideos';
import { groupBy } from 'ramda';
import { v1 as uuidv1 } from 'uuid';

const lastCategoriesKey = `others-${uuidv1()}`;
const byCategory = groupBy((video) => {
  return video.category || lastCategoriesKey;
});

const useSidebar = () => {
  const { videos } = useVideosCtx();
  const [state, send] = useMachine(
    searchVideosMachine.withContext({ ...searchVideosMachine.context, videos, resolvedVideos: videos }),
  );
  const groupByVideos = useMemo(() => {
    return byCategory(state.context.resolvedVideos);
  }, [state.context.resolvedVideos]);

  const handleKeywordChange = (event) => send('SEARCHING', { searchKeyword: event.target.value });
  const handleToggleSearchType = () => send('CHANGE_SEARCH_TYPE');

  return {
    ...state.context,
    searchType: state.value,
    groupByVideos,
    lastCategoriesKey,
    handleKeywordChange,
    handleToggleSearchType,
  };
};

export default useSidebar;
