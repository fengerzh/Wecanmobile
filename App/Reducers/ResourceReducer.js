// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  fetching: true,
  error: null,
  resource: {
    item_cover: '',
    item_name: '',
  },
});

const request = (state: any, action: any) => {
  return state.merge({
    fetching: true,
  });
}

const success = (state: any, action: any) => {
  const { resource } = action;
  return state.merge({
    fetching: false,
    error: null,
    resource,
  });
}

const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    resource: null,
  });
}

const ACTION_HANDLERS = {
  [Types.RESOURCE_REQUEST]: request,
  [Types.RESOURCE_SUCCESS]: success,
  [Types.RESOURCE_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
