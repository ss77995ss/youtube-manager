import { useMachine } from '@xstate/react';
import { categoriesMachine } from '../machine/categories';

function useCategories() {
  const [state, send] = useMachine(categoriesMachine);
  const addNewCategory = (newCategory) => send({ type: 'NEW_CATEGORY', value: newCategory });
  const updateCategory = (newCategory, index) => send({ type: 'UPDATE_CATEGORY', value: newCategory, index });
  const deleteCategory = (index) => send({ type: 'DELETE_CATEGORY', index });

  return {
    ...state.context,
    addNewCategory,
    updateCategory,
    deleteCategory,
  };
}

export default useCategories;
