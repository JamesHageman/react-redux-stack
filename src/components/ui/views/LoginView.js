import {reduxForm} from 'redux-form';
import React, {Component} from 'react';

class LoginView extends Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.object.isRequired
  }
  render() {
    const {fields: {username, password}, handleSubmit} = this.props;
    return <div>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div>
          <input type="text" {...username}/>
        </div>
        <div>
          <input type="password" {...password}/>
        </div>
        <button>Login</button>
      </form>
    </div>;
  }
}

export default reduxForm({
  form: 'login',
  fields: ['username', 'password']
})(LoginView);
