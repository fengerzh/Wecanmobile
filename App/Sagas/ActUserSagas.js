import { take, all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

// 设置活动
export function setActUser(api) {
  function * worker(token, id, direction) {
    let response;
    if (direction == 1) {
      response = yield call(api.setActUser, token, id);
    } else {
      response = yield call(api.deleteActUser, token, id);
    }

    if (response.ok) {
      yield put(Actions.setActUserSuccess());
    } else {
      yield put(Actions.setActUserFailure());
    }
  }

  function * watcher() {
    while (true) {
      const {token, id, direction} = yield take(Types.SET_ACT_USER_REQUEST);
      yield call(worker, token, id, direction);
    }
  }

  return {
    watcher,
    worker
  };
};
