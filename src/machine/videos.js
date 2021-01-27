import { Machine, assign } from 'xstate';
import { remove, update } from 'ramda';

export const videosMachine = Machine(
  {
    id: 'videos',
    initial: 'ready',
    context: {
      videos: [],
      resovledVideos: [],
      categories: [],
    },
    states: {
      ready: {
        entry: ['resetResolvedVideos'],
      },
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
          'resetResolvedVideos',
        ],
      },
      FILTER_VIDEOS_BY_KEYWORD: {
        actions: [
          assign({
            resolvedVideos: (context, event) => {
              return context.videos.filter(({ title }) =>
                title.toLowerCase().includes(event.searchKeyword.toLowerCase()),
              );
            },
          }),
        ],
      },
      FILTER_VIDEOS_BY_CATEGORY: {
        actions: [
          assign({
            resolvedVideos: (context, event) => {
              return context.videos.filter(({ category }) =>
                category.toLowerCase().includes(event.searchCategory.toLowerCase()),
              );
            },
          }),
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
      persistVideos: ({ videos }) => {
        try {
          localStorage.setItem('videos', JSON.stringify(videos));
        } catch (e) {
          console.error(e);
        }
      },
      persistCategories: ({ categories }) => {
        try {
          localStorage.setItem('categories', JSON.stringify(categories));
        } catch (e) {
          console.error(e);
        }
      },
      resetResolvedVideos: assign({
        resolvedVideos: (context) => {
          return context.videos;
        },
      }),
    },
  },
  // initial state from localstorage
  {
    videos: (() => {
      try {
        return JSON.parse(localStorage.getItem('videos')) || [];
      } catch (e) {
        console.error(e);
        return [];
      }
    })(),
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
