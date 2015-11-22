import invariant from 'invariant';
import Immutable from 'immutable';
import {TOGGLE_TODO_COMPLETED, ADD_TODO} from '../actions/actions.js';

let mutableTodoId = 2;

const initialState = Immutable.fromJS({
  1: {
    text: 'Hello',
    completed: false
  }
});

export default function todos(state = initialState, action) {
  switch (action.type) {

  case TOGGLE_TODO_COMPLETED:
    invariant(action.payload.todo_id,
              'TOGGLE_TODO_COMPLETED requires `todo_id`');
    return state.map((todo, id) => {
      if (id === action.payload.todo_id) {
        return todo.set('completed', !todo.get('completed'));
      }

      return todo;
    });

  case ADD_TODO:
    invariant(action.payload.text, 'ADD_TODO requires `text`');
    return state.set(mutableTodoId++, Immutable.fromJS({
      text: action.payload.text,
      completed: false
    }));

  default:
    return state;
  }
}
