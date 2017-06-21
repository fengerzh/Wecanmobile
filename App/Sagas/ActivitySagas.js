import { take, all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import _ from 'lodash';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

export function getActivities(api) {
  function * worker() {
    const response = yield call(api.getActivities);

    if (response.ok) {
      const activities = path(['data'], response);
      yield put(Actions.activitiesSuccess(activities));
    } else {
      yield put(Actions.activitiesFailure());
    }
  }

  function * watcher() {
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

export function getActivity(api) {
  function * worker(id, user_id, wx_username) {
    const [resAct, resActUsers] = yield all([
      call(api.getActivity, id),
      call(api.getActUsers, id),
    ]);

    if (resAct.ok && resActUsers.ok) {
      const activity = path(['data'], resAct);
      const actusers = path(['data'], resActUsers);
      let hasme = false;
      if(_.find(actusers, {user_id})) {
        hasme = true;
      }
      yield put(Actions.activitySuccess(activity, actusers, hasme));
    } else {
      yield put(Actions.activityFailure());
    }
  }

  function * watcher() {
    while (true) {
      const { id, user_id, wx_username } = yield take(Types.ACTIVITY_REQUEST);
      yield call(worker, id, user_id, wx_username);
    }
  }

  return {
    watcher,
    worker
  };
};
