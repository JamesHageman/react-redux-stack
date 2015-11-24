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
        .set('loggingIn', false)
        .set('loginError', action.payload)
        .set('user', null);
    }

    const {name, email} = action.payload;
    return state
      .set('user', Immutable.fromJS({
        name,
        email
      }));

  default:
    return state;
  }
}
