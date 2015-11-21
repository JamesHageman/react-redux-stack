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
    return state.map((todo, id) => {
      if (id === action.id) {
        return todo.set('completed', !todo.get('completed'));
      }

      return todo;
    });

  case ADD_TODO:
    return state.set(mutableTodoId++, Immutable.fromJS({
      text: action.text,
      completed: false
    }));

  default:
    return state;
  }
}
