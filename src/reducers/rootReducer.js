import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import todos from './todos.js';
import auth from './auth.js';

const rootReducer = combineReducers({
  auth: auth,
  todos: todos,
  form: formReducer
});

export default rootReducer;
