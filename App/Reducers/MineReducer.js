// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  error: false,
  fetching: false,
  projects: [],
  // actusers: [],
  activities: [],
});

const request = (state: any, action: any) => {
  return state.merge({
    fetching: true,
  });
}

const success = (state: any, action: any) => {
  const { projects, activities } = action;
  if (projects) {
    return state.merge({
      fetching: false,
      error: false,
      projects,
      activities,
    });
  } else {
    return state.merge({
      fetching: false,
      error: false,
      activities,
    });
  }
}

const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
  });
}

// const requestMyActivities = (state: any, action: any) => {
//   return state.merge({
//     fetching: true,
//   });
// }
//
// const successMyActivities = (state: any, action: any) => {
//   const { activities } = action;
//   return state.merge({
//     fetching: false,
//     error: false,
//     activities,
//   });
// }
//
// const failureMyActivities = (state: any) => {
//   return state.merge({
//     fetching: false,
//     error: true,
//   });
// }

const ACTION_HANDLERS = {
  [Types.MINE_REQUEST]: request,
  [Types.MINE_SUCCESS]: success,
  [Types.MINE_FAILURE]: failure,
  // [Types.MY_ACTIVITIES_REQUEST]: requestMyActivities,
  // [Types.MY_ACTIVITIES_SUCCESS]: successMyActivities,
  // [Types.MY_ACTIVITIES_FAILURE]: failureMyActivities,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
