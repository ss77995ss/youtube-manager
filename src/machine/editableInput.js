import { Machine, assign } from 'xstate';

export const editableInputMachine = Machine({
  id: 'editableInput',
  initial: 'view',
  states: {
    view: {
      on: { OPEN_EDIT: 'edit' },
    },
    edit: {
      on: {
        EDITING: {
          actions: [
            assign({
              inputValue: (_context, event) => {
                return event.value;
              },
            }),
          ],
        },
        SUBMIT: 'view',
        CLOSE_EDIT: 'view',
      },
    },
  },
});
