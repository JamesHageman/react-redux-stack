import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

function validate(model) {
  const errors = {};
  if (!model.text) {
    errors.text = 'Must specify a todo';
  } else if (model.text.length < 3) {
    errors.text = 'Must be at least 3 characters';
  }

  return errors;
}

class TodoForm extends Component {
  static propTypes = {
    // from redux-form
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }

  render() {
    const {fields: {text}, handleSubmit} = this.props;
    return <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="text" {...text}/>
        {text.touched && text.error && <div>{text.error}</div>}
      </div>
    </form>;
  }
}

export default reduxForm({
  form: 'todo',
  fields: ['text'],
  validate: validate
})(TodoForm);
