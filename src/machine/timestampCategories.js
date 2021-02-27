import { Machine, assign } from 'xstate';
import { remove, update } from 'ramda';

export const timestampCategoriesMachine = Machine(
  {
    id: 'timestampCategories',
    initial: 'ready',
    context: {
      categories: [],
    },
    states: {
      ready: {},
    },
    on: {
      NEW_CATEGORY: {
        actions: [
          assign({
            categories: (context, event) => {
              return context.categories.concat(event.value);
            },
          }),
          'persistTimestampCategories',
        ],
      },
      UPDATE_CATEGORY: {
        actions: [
          assign({
            categories: (context, event) => {
              return update(event.index, event.value, context.categories);
            },
          }),
          'persistTimestampCategories',
        ],
      },
      DELETE_CATEGORY: {
        actions: [
          assign({
            categories: (context, event) => {
              return remove(event.index, 1, context.categories);
            },
          }),
          'persistTimestampCategories',
        ],
      },
    },
  },
  {
    actions: {
      persistTimestampCategories: ({ categories }) => {
        try {
          localStorage.setItem('timestampCategories', JSON.stringify(categories));
        } catch (e) {
          console.error(e);
        }
      },
    },
  },
  // initial state from localstorage
  {
    categories: (() => {
      try {
        return JSON.parse(localStorage.getItem('timestampCategories')) || ['default'];
      } catch (e) {
        console.error(e);
        return ['default'];
      }
    })(),
  },
);
