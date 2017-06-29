// @flow

import { take, all, call, put, select } from 'redux-saga/effects';
import { path } from 'ramda';
import _ from 'lodash';

import Types from '../Actions/Types';
import Actions from '../Actions/Creators';

// 创建预约
export function setFacProj(api: any): any {
  function * worker(item_id, proj_id, start_time, end_time) {
    let response;

    response = yield call(api.insertFacProj, item_id, proj_id, start_time, end_time);

    if (response.ok) {
      yield put(Actions.setFacProjSuccess());
      // 在这里我们还需要刷新我的活动数据
      const resFacProjs = yield call(api.getFacprojsByUser);
      if (resFacProjs.ok) {
        yield put(Actions.mineSuccess(
          null,
          null,
          path(['data'], resFacProjs))
        );
      } else {
        yield put(Actions.mineFailure());
      }
    } else {
      yield put(Actions.setFacProjFailure(response.data.message));
    }
  }

  function * watcher() {
    while (true) {
      const {item_id, proj_id, start_time, end_time} = yield take(Types.SET_FAC_PROJ_REQUEST);
      yield call(worker, item_id, proj_id, start_time, end_time);
    }
  }

  return {
    watcher,
    worker
  };
};

// 删除预约
export function deleteFacProj(api: any): any {
  function * worker(id) {
    let response;

    response = yield call(api.deleteFacProj, id);

    if (response.ok) {
      yield put(Actions.setFacProjSuccess());
      // 在这里我们还需要刷新我的活动数据
      const resFacProjs = yield call(api.getFacprojsByUser);
      if (resFacProjs.ok) {
        yield put(Actions.mineSuccess(
          null,
          null,
          path(['data'], resFacProjs))
        );
      } else {
        yield put(Actions.mineFailure());
      }
    } else {
      yield put(Actions.setFacProjFailure(response.data.message));
    }
  }

  function * watcher() {
    while (true) {
      const {id} = yield take(Types.DELETE_FAC_PROJ_REQUEST);
      yield call(worker, id);
    }
  }

  return {
    watcher,
    worker
  };
};
