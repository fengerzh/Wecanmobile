// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  resources: null,
  fetching: true,
  error: null,
});

const request = (state: any) => {
  return state.merge({
    fetching: true,
  });
}

const success = (state: any, action: any) => {
  const resources = action.resources;
  return state.merge({
    fetching: false,
    error: null,
    resources,
  });
}

const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    resources: null,
  });
}

const ACTION_HANDLERS = {
  [Types.RESOURCES_REQUEST]: request,
  [Types.RESOURCES_SUCCESS]: success,
  [Types.RESOURCES_FAILURE]: failure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
