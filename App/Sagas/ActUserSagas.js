import { take, all, call, put, select } from 'redux-saga/effects';
import { path } from 'ramda';
import _ from 'lodash';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

// 设置活动
export function setActUser(api) {
  function * worker(id, direction) {
    let response;

    const state = yield select();
    if (direction == 1) {
      response = yield call(api.setActUser, id);
    } else {
      response = yield call(api.deleteActUser, id);
    }

    if (response.ok) {
      let actusers;
      if (direction == 1) {
        actusers = _.clone(state.activity.actusers);
        actusers.push({
          act_id: state.activity.act_id,
          user_id: state.login.login.idgl_user,
          wx_username: state.login.login.wx_username,
          avatar: 'something',
        });
      } else {
        actusers = _.filter(state.activity.actusers, function(o) { return o.user_id != state.login.login.idgl_user; });
      }
      yield put(Actions.setActUserSuccess(actusers));
      // 在这里我们还需要刷新我的活动数据
      const resActivities = yield call(api.getActivitiesByUser);
      if (resActivities.ok) {
        yield put(Actions.mineSuccess(
          null,
          path(['data'], resActivities))
        );
      } else {
        yield put(Actions.mineFailure());
      }
    } else {
      yield put(Actions.setActUserFailure());
    }
  }

  function * watcher() {
    while (true) {
      const {id, direction} = yield take(Types.SET_ACT_USER_REQUEST);
      yield call(worker, id, direction);
    }
  }

  return {
    watcher,
    worker
  };
};
