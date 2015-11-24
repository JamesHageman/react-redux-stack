import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo, toggleTodo, login} from '../../actions/actions.js';
import Immutable from 'immutable';
import TodoView from '../ui/views/TodoView.js';
import LoginView from '../ui/views/LoginView.js';
import {reset} from 'redux-form';

class App extends Component {
  static propTypes = {
    todos: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    user: React.PropTypes.instanceOf(Immutable.Map),
    loggedIn: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  handleTodoClick(id) {
    this.props.dispatch(toggleTodo({
      todoId: id
    }));
  }

  handleNewTodo(todo) {
    this.props.dispatch(addTodo({
      text: todo.text,
      todoId: Date.now()
    }));

    this.props.dispatch(reset('todo'));
  }

  handleLogin({username, password}) {
    this.props.dispatch(login({
      username,
      password
    }));
  }

  render() {
    const {todos, loggedIn} = this.props;
    return <div>
      { loggedIn ?
        <div>
          <div>Logged in as {this.props.user.get('name')}</div>
          <TodoView
            todos={todos}
            onTodoClick={this.handleTodoClick.bind(this)}
            onNewTodo={this.handleNewTodo.bind(this)}/>
        </div>
        :
        <LoginView onSubmit={this.handleLogin.bind(this)}/>
      }
    </div>;
  }
}

export default connect((state) => {
  const user = state.auth.get('user');
  return {
    todos: state.todos,
    loggedIn: !!user,
    user: user
  };
})(App);
