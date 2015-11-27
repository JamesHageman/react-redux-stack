import rootReducer from './reducers/rootReducer.js';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import fsa from 'redux-validate-fsa';
import Immutable from 'immutable';

const logger = createLogger({
  transformer: (state) => {
    // Print ImmutableJS objects as plain objects
    const newState = {};
    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
        newState[i].__ACTUALLY_IMMUTABLE__ = true;
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  }
});
const middleware = [];

middleware.push(thunkMiddleware);

/*
fsaMiddleware forces user-defined actions to follow the Flux-Standard-Action
rules https://github.com/acdlite/flux-standard-action
 */
const fsaMiddleware = fsa(action => {
  // Redux-Form doesn't follow FSA, but it's still awesome so we make an
  // exception
  if (action.type.search(/redux-form/) !== -1) {
    return true;
  }

  return false;
});

if (process.env.NODE_ENV !== 'production') {
  middleware.push(fsaMiddleware);
  middleware.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
