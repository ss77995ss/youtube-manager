import { Machine, assign } from 'xstate';
import { findIndex, propEq, remove, update } from 'ramda';

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
            actions: [
              assign({
                timestamps: (context, event) => {
                  const index = findIndex(propEq('id', event.id))(context.timestamps);
                  return remove(index, 1, context.timestamps);
                },
              }),
            ],
          },
          UPDATE_TIMESTAMP: {
            actions: [
              assign({
                timestamps: (context, event) => {
                  const index = findIndex(propEq('id', event.id))(context.timestamps);
                  return update(index, event.newTimestamp, context.timestamps);
                },
              }),
            ],
          },
        },
      },
    },
  });
