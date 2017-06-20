import { all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import ActivitiesActions from '../Redux/ActivitiesRedux';
import ActivityActions from '../Redux/ActivityRedux';
import _ from 'lodash';

// 获取活动列表
export function * getActivities (api, action) {
  const response = yield call(api.getActivities);

  if (response.ok) {
    const activities = path(['data'], response);
    yield put(ActivitiesActions.activitiesSuccess(activities));
  } else {
    yield put(ActivitiesActions.activitiesFailure());
  }
};

// 获取单个活动
export function * getActivity (api, action) {
  const {id, user_id} = action;
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
    yield put(ActivityActions.activitySuccess(activity, actusers, hasme));
  } else {
    yield put(ActivityActions.activityFailure());
  }
};
