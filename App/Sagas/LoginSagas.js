import { all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import LoginActions from '../Redux/LoginRedux';
import _ from 'lodash';

// 登录
export function * login(api, action) {
  const response = yield call(api.login, action.username, action.password);

  if (response.ok) {
    yield put(LoginActions.loginSuccess(path(['data'], response)));
  } else {
    yield put(LoginActions.loginFailure());
  }
};
