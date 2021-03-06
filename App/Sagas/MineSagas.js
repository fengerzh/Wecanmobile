// @flow

import { take, all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export function getMine(api: any): any {
  function * worker() {
    const [
      resProjects,
      resActivities,
      resFacProjs,
    ] = yield all([
      call(api.getProjectsByUser),
      call(api.getActivitiesByUser),
      call(api.getFacprojsByUser),
    ]);

    if (resProjects.ok && resActivities.ok && resFacProjs.ok) {
      yield put(Actions.mineSuccess(
        path(['data'], resProjects),
        path(['data'], resActivities),
        path(['data'], resFacProjs)
      ));
    } else {
      yield put(Actions.mineFailure());
    }
  }

  function * watcher() {
    while (true) {
      yield take(Types.MINE_REQUEST);
      yield call(worker);
    }
  }

  return {
    watcher,
    worker
  };
};
