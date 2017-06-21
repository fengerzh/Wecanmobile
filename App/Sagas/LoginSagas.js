import { take, all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import _ from 'lodash';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

// 登录
export function login(api) {
  function * worker(username, password) {
    const response = yield call(api.login, username, password);

    if (response.ok) {
      yield put(Actions.loginSuccess(path(['data'], response)));
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
