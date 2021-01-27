import { Machine } from 'xstate';

export const searchTypeSelectorMachine = Machine({
  id: 'searchTypeSelectorMachine',
  initial: 'videos',
  states: {
    videos: {
      on: {
        CHANGE_SEARCH_TYPE: 'categories',
      },
    },
    categories: {
      on: {
        CHANGE_SEARCH_TYPE: 'videos',
      },
    },
  },
});
