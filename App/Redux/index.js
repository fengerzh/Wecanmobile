// @flow

import { combineReducers } from 'redux';

import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    activities: require('./ActivitiesRedux').reducer,
  //   github: require('./GithubRedux').reducer,
  //   login: require('./LoginRedux').reducer,
  //   search: require('./SearchRedux').reducer
  });

  return configureStore(rootReducer, rootSaga);
}
