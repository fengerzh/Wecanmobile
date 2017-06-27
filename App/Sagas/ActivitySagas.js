// @flow

import { take, all, call, put, select } from 'redux-saga/effects';
import { path } from 'ramda';
import _ from 'lodash';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export function getActivities(api: any) {
  function * worker(): any {
    const response = yield call(api.getActivities);

    if (typeof response === 'undefined') {
      throw new Error('`response` should be an object.');
    }
    if (response.ok) {
      const activities = path(['data'], response);
      yield put(Actions.activitiesSuccess(activities));
    } else {
      yield put(Actions.activitiesFailure());
    }
  }

  function * watcher(): Iterable<any> {
    while (true) {
      yield take(Types.ACTIVITIES_REQUEST);
      yield call(worker);
    }
  }

  return {
    watcher,
    worker
  };
};

export function getActivity(api: any) {
  function * worker(id: any): any {
    const [resAct, resActUsers] = yield all([
      call(api.getActivity, id),
      call(api.getActUsers, id),
    ]);

    const state = yield select();
    if (resAct.ok && resActUsers.ok) {
      const activity = path(['data'], resAct);
      const actusers = path(['data'], resActUsers);
      let hasme = false;
      if (state.login.login) {
        if(_.find(actusers, {user_id: state.login.login.idgl_user})) {
          hasme = true;
        }
      }
      yield put(Actions.activitySuccess(activity, actusers, hasme));
    } else {
      yield put(Actions.activityFailure());
    }
  }

  function * watcher(): any {
    while (true) {
      const { id } = yield take(Types.ACTIVITY_REQUEST);
      yield call(worker, id);
    }
  }

  return {
    watcher,
    worker
  };
};
