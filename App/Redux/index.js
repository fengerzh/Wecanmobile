// @flow

import { combineReducers } from 'redux';

import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

export default () => {
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    activities: require('./ActivitiesRedux').reducer,
    activity: require('./ActivityRedux').reducer,
    newses: require('./NewsesRedux').reducer,
  });

  return configureStore(rootReducer, rootSaga);
}
