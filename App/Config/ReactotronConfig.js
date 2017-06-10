/* global __DEV__ */
/* eslint import/no-extraneous-dependencies: 0 */

import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

import Config from '../Config/DebugConfig';

if (Config.useReactotron) {
  Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(reduxPlugin({ onRestore: Immutable }))
    .use(sagaPlugin())
    .connect(); // let's connect!

  Reactotron.clear();

  console.tron = Reactotron;
}
