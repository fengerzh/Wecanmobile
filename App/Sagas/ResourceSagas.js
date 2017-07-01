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

export function getResource(api: any) {
  function * worker(id: number): any {
    const [resResource] = yield all([
      call(api.getResource, id),
    ]);

    if (resResource.ok) {
      yield put(Actions.resourceSuccess(path(['data'], resResource)));
    } else {
      yield put(Actions.resourceFailure(JSON.stringify(resResource)));
    }
  }

  function * watcher(): any {
    while (true) {
      const { id } = yield take(Types.RESOURCE_REQUEST);
      yield call(worker, id);
    }
  }

  return {
    watcher,
    worker
  };
};
