import { Machine, assign } from 'xstate';

export const videosMachine = Machine({
  id: 'videos',
  initial: 'ready',
  context: {
    videos: [],
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
        'persist',
      ],
    },
  },
});
