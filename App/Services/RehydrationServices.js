// @flow

import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

import ReduxPersist from '../Config/ReduxPersist';

const updateReducers = (store: any) => {
  const reducerVersion = ReduxPersist.reducerVersion;
  const config = ReduxPersist.storeConfig;

  // 按照配置要求自动持久化reducer
  persistStore(store, config);

  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    // 从本地存储取出reducer版本并比较
    if (localVersion !== reducerVersion) {
      // 如果本地存储中的reducer版本与配置文件中的reducer版本不同，则需要清理持久化数据
      persistStore(store, config, () => {
        persistStore(store, config);
      }).purge([]);
      // 清理成功，将本地存储中的reducer版本设为配置文件中的reducer版本
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    }
  }).catch(() => AsyncStorage.setItem('reducerVersion', reducerVersion));
}

export default {updateReducers};
