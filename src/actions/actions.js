export const TOGGLE_TODO_COMPLETED = 'TOGGLE_TODO_COMPLETED';
export const ADD_TODO = 'ADD_TODO';

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
