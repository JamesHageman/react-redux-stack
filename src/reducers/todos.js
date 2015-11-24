import invariant from 'invariant';
import Immutable from 'immutable';
import {TOGGLE_TODO_COMPLETED, ADD_TODO} from '../actions/actions.js';

const initialState = Immutable.fromJS({});

export default function todos(state = initialState, action) {
  switch (action.type) {

  case TOGGLE_TODO_COMPLETED:
    invariant(action.payload.todoId,
              'TOGGLE_TODO_COMPLETED requires `todoId`');
    invariant(state.has(action.payload.todoId),
              'Trying to toggle a todo that does not exist');
    return state.map((todo, id) => {
      if (id === action.payload.todoId) {
        return todo.set('completed', !todo.get('completed'));
      }

      return todo;
    });

  case ADD_TODO:
    invariant(action.payload.text, 'ADD_TODO requires `text`');
    invariant(action.payload.todoId, 'ADD_TODO requires `todoId`');

    const {text, todoId} = action.payload;

    invariant(!state.has(todoId), 'Todo #' + todoId + ' already exists');

    return state.set(todoId, Immutable.fromJS({
      text: text,
      completed: false
    }));

  default:
    return state;
  }
}
