import { take, all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import _ from 'lodash';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

// 登录
export function login(publicAPI, privateAPI) {
  function * worker(username, password, method = 'password') {
    let response;
    if (method == 'weixin') {
      // 如果是用微信登录，则把code值作为密码传给服务器
      response = yield call(publicAPI.wxLogin, password);
    } else {
      response = yield call(publicAPI.login, username, password);
    }

    if (response.ok) {
      const result = path(['data'], response);
      yield all([
        // 切换成功状态
        put(Actions.loginSuccess(result)),
        // 同时设置私有API的token值
        call(privateAPI.setToken, result.id_token),
      ]);
      // 在这里我们还需要刷新我的数据
      const [resProjects, resActivities] = yield all([
        call(privateAPI.getProjectsByUser),
        call(privateAPI.getActivitiesByUser),
      ]);
      if (resProjects.ok && resActivities.ok) {
        yield put(Actions.mineSuccess(
          path(['data'], resProjects),
          path(['data'], resActivities)
        ));
      } else {
        yield put(Actions.mineFailure());
      }
    } else {
      yield put(Actions.loginFailure());
    }
  }

  function * watcher() {
    while (true) {
      const { username, password, method } = yield take(Types.LOGIN_REQUEST);
      yield call(worker, username, password, method);
    }
  }

  return {
    watcher,
    worker
  };
};
