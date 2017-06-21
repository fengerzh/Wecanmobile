import { take } from 'redux-saga/effects';

import Types from '../Actions/Types';

export function * watchStartup () {
  yield take(Types.STARTUP);
}
