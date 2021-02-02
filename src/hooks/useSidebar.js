import { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { searchTypeSelectorMachine } from '../machine/searchTypeSelector';
import { useVideosCtx } from '../hooks/useVideos';
import { groupBy } from 'ramda';
import { v1 as uuidv1 } from 'uuid';

const lastCategoriesKey = `others-${uuidv1()}`;
const byCategory = groupBy((video) => {
  return video.category || lastCategoriesKey;
});

function useSidebar() {
  const { resolvedVideos, filterByKeyword, filterByCategory } = useVideosCtx();
  const [state, send] = useMachine(searchTypeSelectorMachine);
  const groupByVideos = useMemo(() => {
    return byCategory(resolvedVideos);
  }, [resolvedVideos]);

  const handleKeywordChange = (event) => {
    switch (true) {
      case state.matches('videos'):
        filterByKeyword(event.target.value);
        break;
      case state.matches('categories'):
        filterByCategory(event.target.value);
        break;
      default:
        throw new Error('Invalid state');
    }
  };
  const handleToggleSearchType = () => send('CHANGE_SEARCH_TYPE');

  return {
    ...state.context,
    searchType: state.value,
    groupByVideos,
    lastCategoriesKey,
    handleKeywordChange,
    handleToggleSearchType,
  };
}

export default useSidebar;
