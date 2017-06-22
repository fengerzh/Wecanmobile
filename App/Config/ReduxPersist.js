// @flow

import { AsyncStorage } from 'react-native';

import immutablePersistenceTransform from '../Store/ImmutablePersistenceTransform';
import { persistentStoreBlacklist } from '../Reducers/';

const REDUX_PERSIST = {
  active: true, // 是否采用持久化策略
  reducerVersion: '2',  // reducer版本，如果版本不一致，将刷新整个持久化仓库
  storeConfig: {
    storage: AsyncStorage,  // 采用本地异步存储，react-native必须
    blacklist: persistentStoreBlacklist,  // 从根reducer获取黑名单，黑名单中的reducer不进行持久化保存
    transforms: [immutablePersistenceTransform],  // 重要，因为redux是immutable不可变的，此处必须将常规数据做变形，否则会失败
  }
};

export default REDUX_PERSIST;
