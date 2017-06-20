// @flow

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['login'],
  loginFailure: null,
});

export const LoginTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  login: null,
  fetching: true,
  error: null,
});

export const request = (state: any) => {
  return state.merge({
    fetching: true,
  });
}

export const success = (state: any, action: any) => {
  const { login } = action;
  return state.merge({
    fetching: false,
    error: null,
    login,
  });
}

export const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    login: null,
  });
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure
});
