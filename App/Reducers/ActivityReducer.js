// @flow

import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import _ from 'lodash';

import Types from '../Actions/Types';

export const INITIAL_STATE = Immutable({
  activity: {
    act_id: 0,
    act_title: '',
    act_date: '',
    course_name: '',
    title_pic: '',
    act_desc: '',
  },
  actusers: null,
  fetching: true,
  error: null,
  hasme: false,
});

const request = (state: any, action: any) => {
  return state.merge({
    fetching: true,
  });
}

const success = (state: any, action: any) => {
  const { activity, actusers, hasme } = action;
  return state.merge({
    fetching: false,
    error: null,
    activity,
    actusers,
    hasme,
  });
}

const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
    activities: null,
  });
}

const requestSetActUser = (state: any) => {
  return state.merge({
    fetching: true,
  });
}

const successSetActUser = (state: any, action: any) => {
  return state.merge({
    hasme: !state.hasme,
    actusers: action.actusers,
  });
}

const failureSetActUser = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
  });
}

const ACTION_HANDLERS = {
  [Types.ACTIVITY_REQUEST]: request,
  [Types.ACTIVITY_SUCCESS]: success,
  [Types.ACTIVITY_FAILURE]: failure,
  [Types.SET_ACT_USER_REQUEST]: requestSetActUser,
  [Types.SET_ACT_USER_SUCCESS]: successSetActUser,
  [Types.SET_ACT_USER_FAILURE]: failureSetActUser,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
