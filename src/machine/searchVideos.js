import { Machine, assign } from 'xstate';

export const searchVideosMachine = Machine(
  {
    id: 'searchSelectorMachine',
    initial: 'videos',
    context: {
      videos: [],
      resolvedVideos: [],
      searchKeyword: '',
    },
    states: {
      videos: {
        entry: ['resetResolvedVideos'],
        on: {
          CHANGE_SEARCH_TYPE: 'categories',
          SEARCHING: {
            actions: ['getSearchKeyword', 'filterVideosByKeyword'],
          },
        },
      },
      categories: {
        entry: ['resetResolvedVideos'],
        on: {
          CHANGE_SEARCH_TYPE: 'videos',
          SEARCHING: {
            actions: ['getSearchKeyword', 'filterVideosByCategory'],
          },
        },
      },
    },
  },
  {
    actions: {
      getSearchKeyword: assign({ searchKeyword: (_, event) => event.searchKeyword }),
      resetResolvedVideos: assign({
        resolvedVideos: (context) => {
          return context.videos;
        },
      }),
      filterVideosByKeyword: assign({
        resolvedVideos: (context) => {
          return context.videos.filter(({ title }) =>
            title.toLowerCase().includes(context.searchKeyword.toLowerCase()),
          );
        },
      }),
      filterVideosByCategory: assign({
        resolvedVideos: (context) => {
          return context.videos.filter(({ category }) =>
            category.toLowerCase().includes(context.searchKeyword.toLowerCase()),
          );
        },
      }),
    },
  },
);
