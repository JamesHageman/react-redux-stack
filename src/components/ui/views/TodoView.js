import React, {Component} from 'react';
import Immutable from 'immutable';
import TodoForm from './TodoForm.js';

class TodoView extends Component {
  static propTypes = {
    todos: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    onTodoClick: React.PropTypes.func.isRequired,
    onNewTodo: React.PropTypes.func.isRequired
  }

  handleTodoClick(id) {
    this.props.onTodoClick(id);
  }

  render() {
    return <div>
      <TodoForm onSubmit={this.props.onNewTodo}/>
      <ul>
        {
          this.props.todos.map((todo, id) =>
            <li key={id} onClick={this.handleTodoClick.bind(this, id)}>
              {todo.get('text')} {todo.get('completed') ? '!' : ''}
            </li>
          ).toArray()
        }
      </ul>
    </div>;
  }
}

export default TodoView;
