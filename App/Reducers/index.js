// @flow

import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import ActivitiesReducer from './ActivitiesReducer';
import ActivityReducer from './ActivityReducer';
import ResourcesReducer from './ResourcesReducer';
import ResourceReducer from './ResourceReducer';
import NewsesReducer from './NewsesReducer';
import MineReducer from './MineReducer';
import FacItemsReducer from './FacItemsReducer';
import ErrorReducer from './ErrorReducer';

export default combineReducers({
  login: LoginReducer,
  activities: ActivitiesReducer,
  activity: ActivityReducer,
  resources: ResourcesReducer,
  resource: ResourceReducer,
  newses: NewsesReducer,
  mine: MineReducer,
  facItems: FacItemsReducer,
  error: ErrorReducer,
});

// 添加persist黑名单，以下这些reducer不需要持久化
export const persistentStoreBlacklist = [
  'activities',
  'activity',
  'resources',
  'resource',
  'newses',
  'facItems',
  'error',
];
