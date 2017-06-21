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
  user_id: 0,
  wx_username: '',
});

const request = (state: any, action: any) => {
  return state.merge({
    fetching: true,
    user_id: action.user_id,
    wx_username: action.wx_username,
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
