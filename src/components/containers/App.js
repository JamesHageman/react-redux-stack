import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo, toggleTodo} from '../../actions/actions.js';
import Immutable from 'immutable';
import TodoView from '../ui/views/TodoView.js';
import {reset} from 'redux-form';

class App extends Component {
  static propTypes = {
    todos: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  handleTodoClick(id) {
    this.props.dispatch(toggleTodo(id));
  }

  handleNewTodo(todo) {
    this.props.dispatch(addTodo(todo.text));
    this.props.dispatch(reset('todo'));
  }

  render() {
    const {todos} = this.props;
    return <div>
      <TodoView
        todos={todos}
        onTodoClick={this.handleTodoClick.bind(this)}
        onNewTodo={this.handleNewTodo.bind(this)}/>
    </div>;
  }
}

export default connect((state) => {
  return {
    todos: state.todos
  };
})(App);
