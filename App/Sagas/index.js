import { all, takeLatest } from 'redux-saga/effects';

import API from '../Services/Api';
import DebugConfig from '../Config/DebugConfig';

import { LoginTypes } from '../Redux/LoginRedux';
import { ActivitiesTypes } from '../Redux/ActivitiesRedux';
import { ActivityTypes } from '../Redux/ActivityRedux';
import { NewsesTypes } from '../Redux/NewsesRedux';

import {
  getActivities,
  getActivity,
} from './ActivitySagas';
import { getNewses } from './NewsSagas';
import { setActUser } from './ActUserSagas';
import { login } from './LoginSagas';

// 在这里统一决定是使用真实API还是使用虚拟API
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

export default function * root () {
  yield all([
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(ActivitiesTypes.ACTIVITIES_REQUEST, getActivities, api),
    takeLatest(ActivityTypes.ACTIVITY_REQUEST, getActivity, api),
    takeLatest(ActivityTypes.SET_ACT_USER_REQUEST, setActUser, api),
    takeLatest(NewsesTypes.NEWSES_REQUEST, getNewses, api),
  ]);
};
