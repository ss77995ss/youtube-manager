import { Machine, assign } from 'xstate';
import { remove } from 'ramda';

export const timestampsMachine = (timestamps = []) =>
  Machine({
    id: 'timestamp',
    initial: 'view',
    context: {
      timestamps,
    },
    states: {
      view: {
        on: {
          CHANGE_MODE: 'edit',
        },
      },
      edit: {
        on: {
          CHANGE_MODE: 'view',
          ADD_TIMESTAMP: {
            actions: [assign({ timestamps: (context, event) => context.timestamps.concat(event.newTimestamp) })],
          },
          DELETE_TIMESTAMP: {
            actions: [assign({ timestamps: (context, event) => remove(event.index, 1, context.timestamps) })],
          },
        },
      },
    },
  });
