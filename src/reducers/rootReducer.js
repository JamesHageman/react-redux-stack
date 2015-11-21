import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import todos from './todos.js';

const rootReducer = combineReducers({
  todos: todos,
  form: formReducer
});

export default rootReducer;
