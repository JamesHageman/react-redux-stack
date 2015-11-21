export const TOGGLE_TODO_COMPLETED = 'TOGGLE_TODO_COMPLETED';
export const ADD_TODO = 'ADD_TODO';

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO_COMPLETED,
    id: id
  };
}

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text: text
  };
}
