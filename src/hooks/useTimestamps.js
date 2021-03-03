import { useState, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { timestampsMachine } from '../machine/timestampsMachine';
import { groupBy } from 'ramda';
import { v1 as uuidv1 } from 'uuid';

const lastCategoriesKey = `others-${uuidv1()}`;
const byCategory = groupBy((arr) => {
  return arr.category || lastCategoriesKey;
});

function useTimestamps(defaultTimestamps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [state, send] = useMachine(timestampsMachine(defaultTimestamps));
  const resolvedTimestamps = state.context.timestamps.filter(({ title }) =>
    title.toLowerCase().includes(searchKeyword.toLowerCase()),
  );
  const groupByTimestamps = useMemo(() => {
    return byCategory(resolvedTimestamps);
  }, [resolvedTimestamps]);
  const addNewTimestamp = (newTimestamp) => send({ type: 'ADD_TIMESTAMP', newTimestamp });
  const deleteTimestamp = (id) => send({ type: 'DELETE_TIMESTAMP', id });
  const updateTimestamp = (id, newTimestamp) => send({ type: 'UPDATE_TIMESTAMP', id, newTimestamp });
  const changeMode = () => send({ type: 'CHANGE_MODE' });
  const handleChangeMode = () => changeMode();
  const handleDeleteTimeStamp = (index) => () => deleteTimestamp(index);
  const handleKeywordChange = (event) => setSearchKeyword(event.target.value);

  return {
    timestamps: state.context.timestamps,
    resolvedTimestamps,
    groupByTimestamps,
    lastCategoriesKey,
    modeStatus: state.value,
    matches: state.matches,
    addNewTimestamp,
    deleteTimestamp,
    updateTimestamp,
    changeMode,
    handleChangeMode,
    handleDeleteTimeStamp,
    handleKeywordChange,
  };
}

export default useTimestamps;
