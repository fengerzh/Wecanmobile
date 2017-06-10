import { takeLatest } from 'redux-saga/effects';

import API from '../Services/Api';
import DebugConfig from '../Config/DebugConfig';

import { ActivitiesTypes } from '../Redux/ActivitiesRedux';

import { getActivities } from './ActivitySagas';

// 在这里统一决定是使用真实API还是使用虚拟API
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

export default function * root () {
  yield [
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),
    // takeLatest(LoginTypes.LOGIN_REQUEST, login),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
    takeLatest(ActivitiesTypes.ACTIVITIES_REQUEST, getActivities, api),
  ]
};
