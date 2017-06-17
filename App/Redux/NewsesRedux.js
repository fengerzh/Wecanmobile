// @flow

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  newsesRequest: null,
  newsesSuccess: ['newses'],
  newsesFailure: null,
});

export const NewsesTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  newses: null,
  fetching: null,
  error: null,
});

export const request = (state: any) => {
  return state.merge({
    fetching: true,
    activities: null,
  });
}

export const success = (state: any, action: any) => {
  const { newses } = action;
  return state.merge({
    fetching: false,
    error: null,
    newses,
  });
}

export const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    newses: null,
  });
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEWSES_REQUEST]: request,
  [Types.NEWSES_SUCCESS]: success,
  [Types.NEWSES_FAILURE]: failure
});
