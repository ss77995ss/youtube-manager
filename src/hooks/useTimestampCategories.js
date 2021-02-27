import { useMachine } from '@xstate/react';
import { timestampCategoriesMachine } from '../machine/timestampCategories';

function useTimestampCategories() {
  const [state, send] = useMachine(timestampCategoriesMachine);
  const addNewTimestampCategory = (newCategory) => send({ type: 'NEW_CATEGORY', value: newCategory });
  const updateTimestampCategory = (newCategory, index) => send({ type: 'UPDATE_CATEGORY', value: newCategory, index });
  const deleteTimestampCategory = (index) => send({ type: 'DELETE_CATEGORY', index });

  return {
    timestampCategories: state.context.categories,
    addNewTimestampCategory,
    updateTimestampCategory,
    deleteTimestampCategory,
  };
}

export default useTimestampCategories;
