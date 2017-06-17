import { all, takeLatest } from 'redux-saga/effects';

import API from '../Services/Api';
import DebugConfig from '../Config/DebugConfig';

import { ActivitiesTypes } from '../Redux/ActivitiesRedux';
import { NewsesTypes } from '../Redux/NewsesRedux';

import { getActivities } from './ActivitySagas';
import { getNewses } from './NewsSagas';

// 在这里统一决定是使用真实API还是使用虚拟API
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

export default function * root () {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),
    // takeLatest(LoginTypes.LOGIN_REQUEST, login),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
    takeLatest(ActivitiesTypes.ACTIVITIES_REQUEST, getActivities, api),
    takeLatest(NewsesTypes.NEWSES_REQUEST, getNewses, api),
  ]);
};
