// @flow

import { combineReducers } from 'redux';

import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

export default () => {
  const rootReducer = combineReducers({
    activities: require('./ActivitiesRedux').reducer,
    newses: require('./NewsesRedux').reducer,
  });

  return configureStore(rootReducer, rootSaga);
}