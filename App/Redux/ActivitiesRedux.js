// @flow

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  activitiesRequest: null,
  activitiesSuccess: ['activities'],
  activitiesFailure: null,
});

export const ActivitiesTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  activities: null,
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
  const { activities } = action;
  // alert(JSON.stringify(activities));
  return state.merge({
    fetching: false,
    error: null,
    activities,
  });
}

export const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    activities: null,
  });
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTIVITIES_REQUEST]: request,
  [Types.ACTIVITIES_SUCCESS]: success,
  [Types.ACTIVITIES_FAILURE]: failure
});
