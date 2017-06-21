import { take, all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export function getResources(api) {
  function * worker() {
    const response = yield call(api.getResources);

    if (response.ok) {
      yield put(Actions.resourcesSuccess(path(['data'], response)));
    } else {
      yield put(Actions.resourcesFailure());
    }
  }

  function * watcher() {
    while (true) {
      yield take(Types.RESOURCES_REQUEST);
      yield call(worker);
    }
  }

  return {
    watcher,
    worker
  };
};
