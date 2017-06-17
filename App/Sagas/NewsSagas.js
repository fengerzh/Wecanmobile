import { all, call, put } from 'redux-saga/effects';
import { path } from 'ramda';
import NewsesActions from '../Redux/NewsesRedux';

export function * getNewses (api, action) {
  const response = yield call(api.getNewses);

  if (response.ok) {
    const newses = path(['data'], response);
    yield put(NewsesActions.newsesSuccess(newses));
  } else {
    yield put(NewsesActions.newsesFailure());
  }
};
