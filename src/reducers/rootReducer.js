import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import todos from './todos.js';
import auth from './auth.js';
import http from './http.js';

const rootReducer = combineReducers({
  auth: auth,
  todos: todos,
  http: http,
  form: formReducer
});

export default rootReducer;
