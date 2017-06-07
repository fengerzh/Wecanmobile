/* global __DEV__ */
/* eslint import/no-extraneous-dependencies: 0 */

if (__DEV__) {
  const Reactotron = require('reactotron-react-native').default; // eslint-disable-line global-require
  Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
}
