import { Machine, assign } from 'xstate';

export const videosMachine = Machine({
  id: 'videos',
  initial: 'ready',
  context: {
    videos: [],
    categories: ['Default'],
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
  },
});
