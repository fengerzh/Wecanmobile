import { take, all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export function getFacItems(api) {
  function * worker() {
    const response = yield call(api.getFacItems);

    if (response.ok) {
      yield put(Actions.facItemsSuccess(path(['data'], response)));
    } else {
      yield put(Actions.addError(response.data.message));
    }
  }

  function * watcher() {
    while (true) {
      yield take(Types.FACITEMS_REQUEST);
      yield call(worker);
    }
  }

  return {
    watcher,
    worker
  };
};
