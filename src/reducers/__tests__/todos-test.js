jest.autoMockOff();
const {addTodo, toggleTodo} = require('../../actions/actions.js');


describe('todos', () => {
  const todos = require('../todos').default;

  it('adds a todo', () => {
    const state = todos(undefined, addTodo({
      text: 'foo',
      todoId: 1
    }));

    expect(state.toJS()).toEqual({
      1: {
        text: 'foo',
        completed: false
      }
    });
  });

  it('toggles a todo', () => {
    let state = todos(undefined, addTodo({
      text: 'foo',
      todoId: 1
    }));

    state = todos(state, toggleTodo({
      todoId: 1
    }));

    // The inserted todo is the first in state.toArray()
    expect(state.get(1).toJS()).toEqual({
      text: 'foo',
      completed: true
    });
  });

  it('throws when passed a bad todoId', () => {
    const state = todos(undefined, addTodo({
      text: 'foo',
      todoId: 1
    }));

    expect(() => {
      todos(state, addTodo({
        text: 'bar',
        todoId: 1
      }));
    }).toThrow();

    expect(() => {
      todos(state, toggleTodo({
        todoId: 2
      }));
    }).toThrow();

  });
});
