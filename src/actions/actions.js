import createFetchAction from '../utils/createFetchAction.js';

export const LOGIN = 'LOGIN';
export const TOGGLE_TODO_COMPLETED = 'TOGGLE_TODO_COMPLETED';
export const ADD_TODO = 'ADD_TODO';

export const login = createFetchAction(LOGIN, (/* {username, password} */) => ({
  url: 'http://www.mocky.io/v2/5654afce0f0000843160c1bf',
  params: {}
}));

export function toggleTodo({todoId}) {
  return {
    type: TOGGLE_TODO_COMPLETED,
    payload: {
      todoId: todoId
    }
  };
}

export function addTodo({todoId, text}) {
  return {
    type: ADD_TODO,
    payload: {
      text,
      todoId
    }
  };
}
