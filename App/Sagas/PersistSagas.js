import { take, call, select } from 'redux-saga/effects';
import { path } from 'ramda';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export function persistChanged(api) {
  function * worker() {
    const state = yield select();
    if (state.login.login) {
      yield call(api.setToken, state.login.login.id_token);
    }
  }

  function * watcher() {
    while (true) {
      yield take('persist/REHYDRATE');
      yield call(worker);
    }
  }

  return {
    watcher,
    worker
  };
};
