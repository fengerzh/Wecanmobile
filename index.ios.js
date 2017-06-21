// @flow

import React from 'react';
import { AppRegistry } from 'react-native'

import './App/Config/ReactotronConfig';
import Root from './App/Root';
import configureStore from './App/Store/Store';

const store = configureStore();
class App extends React.Component {
  render () {
    return <Root {...this.props} store={store} />
  }
}

AppRegistry.registerComponent('Wecanmobile', () => App);
