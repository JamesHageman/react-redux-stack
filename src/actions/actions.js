export const LOGIN = 'LOGIN';
export const TOGGLE_TODO_COMPLETED = 'TOGGLE_TODO_COMPLETED';
export const ADD_TODO = 'ADD_TODO';

export function login({/* username, password */}) {
  return {
    type: LOGIN,
    payload: fetch('http://www.mocky.io/v2/5654afce0f0000843160c1bf', {
      method: 'get'
    }).then(res => res.json())
  };
}

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
