import { take, all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export function getNewses(api) {
  function * worker() {
    const response = yield call(api.getNewses);

    if (response.ok) {
      yield put(Actions.newsesSuccess(path(['data'], response)));
    } else {
      yield put(Actions.newsesFailure());
    }
  }

  function * watcher() {
    while (true) {
      yield take(Types.NEWSES_REQUEST);
      yield call(worker);
    }
  }

  return {
    watcher,
    worker
  };
};
