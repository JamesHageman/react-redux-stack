import Immutable from 'immutable';
import {LOGIN} from '../actions/actions.js';

const initialState = Immutable.fromJS({
  loggingIn: false,
  loginError: null,
  user: null
});

export default function auth(state = initialState, action) {
  switch (action.type) {

  case LOGIN:
    if (action.error) {
      return state
        .merge({
          loggingIn: false,
          loginError: action.error,
          user: null
        });
    }

    if (action.payload.res) {
      const {name, email} = action.payload.res;
      return state
        .merge({
          user: {
            name,
            email
          },
          loggingIn: false
        });
    }

    return state
      .set('loggingIn', true);

  default:
    return state;
  }
}
