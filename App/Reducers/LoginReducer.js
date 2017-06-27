// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  login: null,
  fetching: true,
  error: null,
  showLogin: false,
});

const request = (state: any) => {
  return state.merge({
    fetching: true,
  });
}

const success = (state: any, action: any) => {
  const { login } = action;
  return state.merge({
    fetching: false,
    error: null,
    login,
  });
}

const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    login: null,
  });
}

const requestLogout = (state: any) => {
  return state.merge({
    fetching: true,
  });
}

const successLogout = (state: any) => {
  return state.merge({
    fetching: false,
    error: null,
    login: null,
  });
}

const failureLogout = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    login: null,
  });
}

const ACTION_HANDLERS = {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT_REQUEST]: requestLogout,
  [Types.LOGOUT_SUCCESS]: successLogout,
  [Types.LOGOUT_FAILURE]: failureLogout,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
