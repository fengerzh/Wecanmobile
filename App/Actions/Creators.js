// @flow

import Types from './Types';

const loginRequest = (username: string, password: string, method: string) => ({ type: Types.LOGIN_REQUEST, username, password, method });
const loginSuccess = (login: any) => ({ type: Types.LOGIN_SUCCESS, login });
const loginFailure = (errorCode: any) => ({ type: Types.LOGIN_FAILURE, errorCode });

const logoutRequest = () => ({ type: Types.LOGOUT_REQUEST });

const activitiesRequest = () => ({ type: Types.ACTIVITIES_REQUEST });
const activitiesSuccess = (activities: any) => ({ type: Types.ACTIVITIES_SUCCESS, activities });
const activitiesFailure = (errorCode: any) => ({ type: Types.ACTIVITIES_FAILURE, errorCode });

const activityRequest = (id: any) => ({ type: Types.ACTIVITY_REQUEST, id });
const activitySuccess = (activity: any, actusers: any, hasme: boolean) => ({ type: Types.ACTIVITY_SUCCESS, activity, actusers, hasme });
const activityFailure = (errorCode: any) => ({ type: Types.ACTIVITY_FAILURE, errorCode });

const setActUserRequest = (id: any, direction: number) => ({ type: Types.SET_ACT_USER_REQUEST, id, direction });
const setActUserSuccess = (actusers: any) => ({ type: Types.SET_ACT_USER_SUCCESS, actusers });
const setActUserFailure = (errorCode: any) => ({ type: Types.SET_ACT_USER_FAILURE, errorCode });

const resourcesRequest = () => ({ type: Types.RESOURCES_REQUEST });
const resourcesSuccess = (resources: any) => ({ type: Types.RESOURCES_SUCCESS, resources });
const resourcesFailure = (errorCode: any) => ({ type: Types.RESOURCES_FAILURE, errorCode });

const setFacProjRequest = (item_id: number, proj_id: number, start_time: string, end_time: string) => ({ type: Types.SET_FAC_PROJ_REQUEST, item_id, proj_id, start_time, end_time });
const deleteFacProjRequest = (id: number) => ({ type: Types.DELETE_FAC_PROJ_REQUEST, id });
const setFacProjSuccess = () => ({ type: Types.SET_FAC_PROJ_SUCCESS });
const setFacProjFailure = (error: string) => ({ type: Types.SET_FAC_PROJ_FAILURE, error });

const newsesRequest = () => ({ type: Types.NEWSES_REQUEST });
const newsesSuccess = (newses: any) => ({ type: Types.NEWSES_SUCCESS, newses });
const newsesFailure = (errorCode: any) => ({ type: Types.NEWSES_FAILURE, errorCode });

const mineRequest = () => ({ type: Types.MINE_REQUEST });
const mineSuccess = (projects: any, activities: any, facprojs: any) => ({ type: Types.MINE_SUCCESS, projects, activities, facprojs });
const mineFailure = (errorCode: any) => ({ type: Types.MINE_FAILURE, errorCode });

const startup = () => ({ type: Types.STARTUP });

export default {
  loginRequest,
  loginSuccess,
  loginFailure,

  logoutRequest,

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

  setFacProjRequest,
  deleteFacProjRequest,
  setFacProjSuccess,
  setFacProjFailure,

  newsesRequest,
  newsesSuccess,
  newsesFailure,

  mineRequest,
  mineSuccess,
  mineFailure,

  startup,
};
