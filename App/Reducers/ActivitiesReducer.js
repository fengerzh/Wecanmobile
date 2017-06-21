// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  activities: null,
  fetching: true,
  error: null,
});

const request = (state: any) => {
  return state.merge({
    fetching: true,
  });
}

const success = (state: any, action: any) => {
  const activities = action.activities;
  return state.merge({
    fetching: false,
    error: null,
    activities,
  });
}

const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    activities: null,
  });
}

const ACTION_HANDLERS = {
  [Types.ACTIVITIES_REQUEST]: request,
  [Types.ACTIVITIES_SUCCESS]: success,
  [Types.ACTIVITIES_FAILURE]: failure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
