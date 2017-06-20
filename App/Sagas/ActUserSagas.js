import { all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import SetActUserActions from '../Redux/ActivityRedux';

// 设置活动
export function * setActUser (api, action) {
  let response;
  if (action.direction == 1) {
    response = yield call(api.setActUser, action.token, action.id);
  } else {
    response = yield call(api.deleteActUser, action.token, action.id);
  }

  if (response.ok) {
    yield put(SetActUserActions.setActUserSuccess());
  } else {
    yield put(SetActUserActions.setActUserFailure());
  }
};
