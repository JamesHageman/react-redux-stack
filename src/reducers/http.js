import invariant from 'invariant';
import {fromJS, Set} from 'immutable';
import {START, SUCCESS, ERROR} from '../utils/createFetchAction.js';

const increment = x => x + 1;
const decrement = x => x - 1;

/*
A utitily store for keeping track of active ajax calls

Shape:

{
  numActiveRequests: 2,
  activeRequests: [LOAD_TODOS, SAVE_PROFILE]
}

 */

const initialState = fromJS({
  numActiveRequests: 0
}).set('activeRequests', new Set()); // Sets won't contain duplicates

export default function http(state = initialState, action) {
  if (action.meta && action.meta.isFetchAction) {
    invariant(action.meta.stage, 'actions created by createFetchAction() must' +
                                 ' be dispatched with a meta.stage property');

    switch (action.meta.stage) {

    case START:
      return state.updateIn(['numActiveRequests'], increment)
                .updateIn(['activeRequests'], set => set.add(action.type));

    case SUCCESS:
    case ERROR:
      return state.updateIn(['numActiveRequests'], decrement)
                .updateIn(['activeRequests'], set => set.remove(action.type));

    default:
      return state;
    }
  }

  return state;
}
