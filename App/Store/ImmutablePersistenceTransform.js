// @flow

import R from 'ramda';
import Immutable from 'seamless-immutable';

// 将redux中的immutable对象转为普通js对象，以便于持久化存储
const isImmutable = R.has('asMutable');
const convertToJs = (state) => state.asMutable({deep: true});
const fromImmutable = R.when(isImmutable, convertToJs);

// 将普通js对象转为immutable不可变，以供redux使用
const toImmutable = (raw) => Immutable(raw);

export default {
  out: (state: any) => {
    // 设置深度合并
    state.mergeDeep = R.identity;
    // 从仓库中取出，进入内存时，转为immutable不可变
    return toImmutable(state);
  },
  in: (raw: any) => {
    // 进入仓库时，将immutable不可变数据转为常规数据
    return fromImmutable(raw);
  }
};
