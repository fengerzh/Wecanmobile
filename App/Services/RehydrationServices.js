// @flow

import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

import ReduxPersist from '../Config/ReduxPersist';

const updateReducers = (store: any) => {
  const reducerVersion = ReduxPersist.reducerVersion;
  const config = ReduxPersist.storeConfig;

  persistStore(store, config);

  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      persistStore(store, config, () => {
        persistStore(store, config);
      }).purge([]);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    }
  }).catch(() => AsyncStorage.setItem('reducerVersion', reducerVersion));
}

export default {updateReducers};
