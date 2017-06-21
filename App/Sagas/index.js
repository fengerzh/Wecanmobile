import { fork } from 'redux-saga/effects';

import API from '../Services/Api';
import DebugConfig from '../Config/DebugConfig';

import { watchStartup } from './StartupSaga';
import {
  getActivities,
  getActivity,
} from './ActivitySagas';
import { getResources } from './ResourceSagas';
import { getNewses } from './NewsSagas';
import { setActUser } from './ActUserSagas';
import { login } from './LoginSagas';

// 在这里统一决定是使用真实API还是使用虚拟API
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

export default function * root () {
  yield fork(watchStartup);
  yield fork(login(api).watcher);
  yield fork(getActivities(api).watcher);
  yield fork(getActivity(api).watcher);
  yield fork(setActUser(api).watcher);
  yield fork(getResources(api).watcher);
  yield fork(getNewses(api).watcher);
};
