// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  error: false,
  fetching: false,
  projects: [],
  activities: [],
  facprojs: [],
});

const request = (state: any, action: any) => {
  return state.merge({
    fetching: true,
  });
}

const success = (state: any, action: any) => {
  const {
    projects,
    activities,
    facprojs,
  } = action;
  if (projects) {
    return state.merge({
      fetching: false,
      error: false,
      projects,
      activities,
      facprojs,
    });
  } else if (activities) {
    return state.merge({
      fetching: false,
      error: false,
      activities,
    });
  } else {
    return state.merge({
      fetching: false,
      error: false,
      facprojs,
    });
  }
}

const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
  });
}

const ACTION_HANDLERS = {
  [Types.MINE_REQUEST]: request,
  [Types.MINE_SUCCESS]: success,
  [Types.MINE_FAILURE]: failure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
