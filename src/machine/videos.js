import { Machine, assign } from 'xstate';
import { remove, update } from 'ramda';

export const videosMachine = Machine({
  id: 'videos',
  initial: 'ready',
  context: {
    videos: [],
    categories: [],
  },
  states: {
    ready: {},
  },
  on: {
    NEW_VIDEO: {
      actions: [
        assign({
          videos: (context, event) => {
            return context.videos.concat(event.value);
          },
        }),
        'persistVideos',
      ],
    },
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
            debugger;
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
});
