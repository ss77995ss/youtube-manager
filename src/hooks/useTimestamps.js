import { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { timestampsMachine } from '../machine/timestampsMachine';
import { groupBy } from 'ramda';
import { v1 as uuidv1 } from 'uuid';

const lastCategoriesKey = `others-${uuidv1()}`;
const byCategory = groupBy((arr) => {
  return arr.category || lastCategoriesKey;
});

function useTimestamps(defaultTimestamps) {
  const [state, send] = useMachine(timestampsMachine(defaultTimestamps));
  const groupByTimestamps = useMemo(() => {
    return byCategory(state.context.timestamps);
  }, [state.context.timestamps]);
  const addNewTimestamp = (newTimestamp) => send({ type: 'ADD_TIMESTAMP', newTimestamp });
  const deleteTimestamp = (index) => send({ type: 'DELETE_TIMESTAMP', index });
  const changeMode = () => send({ type: 'CHANGE_MODE' });
  const handleChangeMode = () => changeMode();
  const handleDeleteTimeStamp = (index) => () => deleteTimestamp(index);

  console.log(groupByTimestamps);

  return {
    timestamps: state.context.timestamps,
    groupByTimestamps,
    lastCategoriesKey,
    modeStatus: state.value,
    matches: state.matches,
    addNewTimestamp,
    deleteTimestamp,
    changeMode,
    handleChangeMode,
    handleDeleteTimeStamp,
  };
}

export default useTimestamps;
