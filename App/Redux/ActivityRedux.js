// @flow

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

const { Types, Creators } = createActions({
  activityRequest: ['id', 'user_id', 'wx_username'],
  activitySuccess: [
    'activity',
    'actusers',
    'hasme',
  ],
  activityFailure: null,
  setActUserRequest: ['token', 'id', 'direction'],
  setActUserSuccess: null,
  setActUserFailure: null,
});

export const ActivityTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  activity: {
    act_id: 0,
    act_title: '',
    act_date: '',
    course_name: '',
    title_pic: '',
    act_desc: '',
  },
  fetching: true,
  error: null,
  actusers: null,
  hasme: false,
  user_id: 0,
  wx_username: '',
});

export const request = (state: any, action: any) => {
  return state.merge({
    fetching: true,
    user_id: action.user_id,
    wx_username: action.wx_username,
  });
}

export const success = (state: any, action: any) => {
  const { activity, actusers, hasme } = action;
  return state.merge({
    fetching: false,
    error: null,
    activity,
    actusers,
    hasme,
  });
}

export const failure = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
  });
}

export const requestSetActUser = (state: any) => {
  return state.merge({
    fetching: true,
  });
}

export const successSetActUser = (state: any, action: any) => {
  let actusers;
  if (state.hasme) {
    // 从用户列表中删除我自己
    // alert(state.user_id);
    actusers = _.filter(state.actusers, function(o) { return o.user_id != state.user_id; });
  } else {
    // 把我自己添加到用户列表中
    actusers = _.clone(state.actusers);
    actusers.push({
      act_id: state.activity.act_id,
      user_id: state.user_id,
      wx_username: state.wx_username,
      avatar: 'something',
    });
  }
  return state.merge({
    hasme: !state.hasme,
    actusers,
  });
}

export const failureSetActUser = (state: any) => {
  return state.merge({
    fetching: false,
    error: true,
  });
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTIVITY_REQUEST]: request,
  [Types.ACTIVITY_SUCCESS]: success,
  [Types.ACTIVITY_FAILURE]: failure,
  [Types.SET_ACT_USER_REQUEST]: requestSetActUser,
  [Types.SET_ACT_USER_SUCCESS]: successSetActUser,
  [Types.SET_ACT_USER_FAILURE]: failureSetActUser,
});
