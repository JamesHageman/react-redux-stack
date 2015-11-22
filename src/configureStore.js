import rootReducer from './reducers/rootReducer.js';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import fsa from 'redux-validate-fsa';

const middleware = [];

/*
Forces user-defined actions to follow the Flux-Standard-Action rules
https://github.com/acdlite/flux-standard-action
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
}

middleware.push(thunkMiddleware);

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
