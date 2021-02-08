import { useMachine } from '@xstate/react';
import { timestampsMachine } from '../machine/timestampsMachine';

function useTimestamps(defaultTimestamps) {
  const [state, send] = useMachine(timestampsMachine(defaultTimestamps));
  const addNewTimestamp = (newTimestamp) => send({ type: 'ADD_TIMESTAMP', newTimestamp });
  const deleteTimestamp = (index) => send({ type: 'DELETE_TIMESTAMP', index });
  const changeMode = () => send({ type: 'CHANGE_MODE' });
  const handleChangeMode = () => changeMode();
  const handleDeleteTimeStamp = (index) => () => deleteTimestamp(index);

  return {
    timestamps: state.context.timestamps,
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
