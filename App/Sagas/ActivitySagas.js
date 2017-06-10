import { call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import ActivitiesActions from '../Redux/ActivitiesRedux';

export function * getActivities (api, action) {
  const response = yield call(api.getActivities);

  if (response.ok) {
    const activities = path(['data'], response);
    yield put(ActivitiesActions.activitiesSuccess(activities));
  } else {
    yield put(ActivitiesActions.activitiesFailure());
  }
};
