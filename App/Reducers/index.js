// @flow

import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import ActivitiesReducer from './ActivitiesReducer';
import ActivityReducer from './ActivityReducer';
import ResourcesReducer from './ResourcesReducer';
import NewsesReducer from './NewsesReducer';

export default combineReducers({
  login: LoginReducer,
  activities: ActivitiesReducer,
  activity: ActivityReducer,
  resources: ResourcesReducer,
  newses: NewsesReducer,
});

export const persistentStoreBlacklist = ['activities', 'activity', 'resources', 'newses'];
