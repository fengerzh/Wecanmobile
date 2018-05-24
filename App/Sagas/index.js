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
import {
  getResources,
  getResource,
} from './ResourceSagas';
import { getNewses } from './NewsSagas';
import {
  login,
  wxLogin,
  logout,
} from './LoginSagas';
import {
  getMine,
} from './MineSagas';
import { setActUser } from './ActUserSagas';
import {
  setFacProj,
  deleteFacProj,
} from './FacProjSagas';
import {
  getFacItems,
} from './FacItemSagas';

// 在这里统一决定是使用真实API还是使用虚拟API
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
const publicAPI = API.publicAPI();
const privateAPI = API.privateAPI();

export default function * root (): any {
  // Sagas watcher是用来观察redux状态的，如果观察到了某request动作，则执行相关接口调用程序
  // 调用成功，则将redux转为新状态，交由reducer进行后续处理
  yield fork(watchStartup);

  // 观察持久化状态变更
  yield fork(persistChanged(privateAPI).watcher);

  // 调用公开接口
  // 这里登录接口用到了两个API，首先通过公有API进行登录，登录成功后刷新私有API的token
  yield fork(login(publicAPI, privateAPI).watcher);

  // 获取所有活动
  yield fork(getActivities(publicAPI).watcher);
  yield fork(getActivity(publicAPI).watcher);
  yield fork(getResources(publicAPI).watcher);
  yield fork(getResource(publicAPI).watcher);
  yield fork(getNewses(publicAPI).watcher);

  // 调用私密接口
  yield fork(setActUser(privateAPI).watcher);
  yield fork(setFacProj(privateAPI).watcher);
  yield fork(deleteFacProj(privateAPI).watcher);
  yield fork(getMine(privateAPI).watcher);
  yield fork(getFacItems(privateAPI).watcher);
};
