// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../Reducers/';
import sagas from '../Sagas/';
import RehydrationServices from '../Services/RehydrationServices';
import ReduxPersist from '../Config/ReduxPersist';
import Config from '../Config/DebugConfig';

declare var console: any;

let middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

export default () => {
  let store = {};

  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore;

  if (ReduxPersist.active) {
    const enhancers = compose(
      applyMiddleware(...middleware),
      autoRehydrate()
    );

    store = createAppropriateStore(
      rootReducer,
      enhancers
    );

    RehydrationServices.updateReducers(store);
  } else {
    const enhancers = compose(
      applyMiddleware(...middleware),
    );

    store = createAppropriateStore(
      rootReducer,
      enhancers
    );
  }

  sagaMiddleware.run(sagas);

  return store;
};
