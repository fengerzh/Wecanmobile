// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  error: null,
});

const addError = (state: any, action: any) => {
  alert(action.error);
  return state.merge({
    error: action.error,
  });
}

const removeError = (state: any) => {
  return state.merge({
    error: null,
  });
}

const ACTION_HANDLERS = {
  [Types.ADD_ERROR]: addError,
  [Types.REMOVE_ERROR]: removeError,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
