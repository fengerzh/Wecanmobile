// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  newses: null,
  fetching: true,
  error: null,
});

const request = (state: any) => {
  return state.merge({
    fetching: true,
  });
}

const success = (state: any, action: any) => {
  const newses = action.newses;
  return state.merge({
    fetching: false,
    error: null,
    newses,
  });
}

const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    newses: null,
  });
}

const ACTION_HANDLERS = {
  [Types.NEWSES_REQUEST]: request,
  [Types.NEWSES_SUCCESS]: success,
  [Types.NEWSES_FAILURE]: failure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
