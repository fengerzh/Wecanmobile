// @flow

import { fork } from 'redux-saga/effects';

import API from '../Services/Api';
import DebugConfig from '../Config/DebugConfig';

import { persistChanged } from './PersistSagas';
import { watchStartup } from './StartupSaga';
import {
  getActivities,
  getActivity,
} from './ActivitySagas';
import { getResources } from './ResourceSagas';
import { getNewses } from './NewsSagas';
import {
  login,
  logout,
} from './LoginSagas';
import {
  getMine,
  // getMyActivities,
} from './MineSagas';
import { setActUser } from './ActUserSagas';

// 在这里统一决定是使用真实API还是使用虚拟API
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
const publicAPI = API.publicAPI();
const privateAPI = API.privateAPI();

export default function * root (): any {
  yield fork(watchStartup);

  // 观察持久化状态变更
  yield fork(persistChanged(privateAPI).watcher);

  // 调用公开接口
  yield fork(login(publicAPI, privateAPI).watcher);
  yield fork(logout(publicAPI).watcher);
  yield fork(getActivities(publicAPI).watcher);
  yield fork(getActivity(publicAPI).watcher);
  yield fork(getResources(publicAPI).watcher);
  yield fork(getNewses(publicAPI).watcher);

  // 调用私密接口
  yield fork(setActUser(privateAPI).watcher);
  yield fork(getMine(privateAPI).watcher);
};
