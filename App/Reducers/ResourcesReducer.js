// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  resources: null,
  fetching: false,
  setting: false,
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

const requestSetFacProj = (state: any) => {
  return state.merge({
    error: null,
    setting: true,
  });
}

const requestDeleteFacProj = (state: any) => {
  return state.merge({
    error: null,
    setting: true,
  });
}

const successSetFacProj = (state: any, action: any) => {
  return state.merge({
    setting: false,
    error: null,
  });
}

const failureSetFacProj = (state: any, action: any) => {
  const {error} = action;
  return state.merge({
    setting: false,
    error,
  });
}

const ACTION_HANDLERS = {
  [Types.RESOURCES_REQUEST]: request,
  [Types.RESOURCES_SUCCESS]: success,
  [Types.RESOURCES_FAILURE]: failure,
  [Types.SET_FAC_PROJ_REQUEST]: requestSetFacProj,
  [Types.DELETE_FAC_PROJ_REQUEST]: requestDeleteFacProj,
  [Types.SET_FAC_PROJ_SUCCESS]: successSetFacProj,
  [Types.SET_FAC_PROJ_FAILURE]: failureSetFacProj,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
