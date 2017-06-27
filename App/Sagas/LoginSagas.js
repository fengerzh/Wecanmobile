import { take, all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import _ from 'lodash';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

// 登录
export function login(publicAPI, privateAPI) {
  function * worker(username, password) {
    const response = yield call(publicAPI.login, username, password);

    if (response.ok) {
      const result = path(['data'], response);
      yield all([
        put(Actions.loginSuccess(result)),
        call(privateAPI.setToken, result.id_token),
      ]);
    } else {
      yield put(Actions.loginFailure());
    }
  }

  function * watcher() {
    while (true) {
      const { username, password } = yield take(Types.LOGIN_REQUEST);
      yield call(worker, username, password);
    }
  }

  return {
    watcher,
    worker
  };
};

// 登出
export function logout(api) {
  function * worker() {
    yield put(Actions.logoutSuccess());
  }

  function * watcher() {
    while (true) {
      yield take(Types.LOGOUT_REQUEST);
      yield call(worker);
    }
  }

  return {
    watcher,
    worker
  };
};
