// @flow

import Types from './Types';

const loginRequest = (username: string, password: string) => ({ type: Types.LOGIN_REQUEST, username, password });
const loginSuccess = (login: any) => ({ type: Types.LOGIN_SUCCESS, login });
const loginFailure = (errorCode: any) => ({ type: Types.LOGIN_FAILURE, errorCode });

const activitiesRequest = () => ({ type: Types.ACTIVITIES_REQUEST });
const activitiesSuccess = (activities: any) => ({ type: Types.ACTIVITIES_SUCCESS, activities });
const activitiesFailure = (errorCode: any) => ({ type: Types.ACTIVITIES_FAILURE, errorCode });

const activityRequest = (id: any, user_id: number, wx_username: string) => ({ type: Types.ACTIVITY_REQUEST, id, user_id, wx_username });
const activitySuccess = (activity: any, actusers: any, hasme: boolean) => ({ type: Types.ACTIVITY_SUCCESS, activity, actusers, hasme });
const activityFailure = (errorCode: any) => ({ type: Types.ACTIVITY_FAILURE, errorCode });

const setActUserRequest = (token: string, id: any, direction: number) => ({ type: Types.SET_ACT_USER_REQUEST, token, id, direction });
const setActUserSuccess = (result: any) => ({ type: Types.SET_ACT_USER_SUCCESS, result });
const setActUserFailure = (errorCode: any) => ({ type: Types.SET_ACT_USER_FAILURE, errorCode });

const resourcesRequest = () => ({ type: Types.RESOURCES_REQUEST });
const resourcesSuccess = (resources: any) => ({ type: Types.RESOURCES_SUCCESS, resources });
const resourcesFailure = (errorCode: any) => ({ type: Types.RESOURCES_FAILURE, errorCode });

const newsesRequest = () => ({ type: Types.NEWSES_REQUEST });
const newsesSuccess = (newses: any) => ({ type: Types.NEWSES_SUCCESS, newses });
const newsesFailure = (errorCode: any) => ({ type: Types.NEWSES_FAILURE, errorCode });

const startup = () => ({ type: Types.STARTUP });

export default {
  loginRequest,
  loginSuccess,
  loginFailure,

  activitiesRequest,
  activitiesSuccess,
  activitiesFailure,

  activityRequest,
  activitySuccess,
  activityFailure,

  setActUserRequest,
  setActUserSuccess,
  setActUserFailure,

  resourcesRequest,
  resourcesSuccess,
  resourcesFailure,

  newsesRequest,
  newsesSuccess,
  newsesFailure,

  startup,
};
