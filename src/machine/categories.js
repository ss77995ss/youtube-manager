import { Machine, assign } from 'xstate';
import { remove, update } from 'ramda';

export const categoriesMachine = Machine(
  {
    id: 'categories',
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
          'persistCategories',
        ],
      },
      UPDATE_CATEGORY: {
        actions: [
          assign({
            categories: (context, event) => {
              return update(event.index, event.value, context.categories);
            },
          }),
          'persistCategories',
        ],
      },
      DELETE_CATEGORY: {
        actions: [
          assign({
            categories: (context, event) => {
              return remove(event.index, 1, context.categories);
            },
          }),
          'persistCategories',
        ],
      },
    },
  },
  {
    actions: {
      persistCategories: ({ categories }) => {
        try {
          localStorage.setItem('categories', JSON.stringify(categories));
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
        return JSON.parse(localStorage.getItem('categories')) || ['default'];
      } catch (e) {
        console.error(e);
        return ['default'];
      }
    })(),
  },
);
