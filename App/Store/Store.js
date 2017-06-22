// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../Reducers/';
import sagas from '../Sagas/';
import RehydrationServices from '../Services/RehydrationServices';
import ReduxPersist from '../Config/ReduxPersist';
import Config from '../Config/DebugConfig';

// 屏蔽flow误报警
declare var console: any;

// 添加saga中间件
let middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

export default () => {
  let store = {};

  // 根据配置要求采用Reactotron或者原生store
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore;

  if (ReduxPersist.active) {
    // 如果配置中要求采用持久化
    const enhancers = compose(
      applyMiddleware(...middleware),
      autoRehydrate()
    );

    store = createAppropriateStore(
      rootReducer,
      enhancers
    );

    // 启动持久化
    RehydrationServices.updateReducers(store);
  } else {
    // 如果配置中不要求采用持久化
    const enhancers = compose(
      applyMiddleware(...middleware),
    );

    store = createAppropriateStore(
      rootReducer,
      enhancers
    );
  }

  // 运行saga
  sagaMiddleware.run(sagas);

  return store;
};
