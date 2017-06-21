// @flow

import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { updateFocus } from 'react-navigation-is-focused-hoc';

import DebugConfig from './Config/DebugConfig';
import Navigation from './Navigation/AppNavigation';
import styles from './Containers/Styles/RootStyle';

declare var console: any;

export default class Root extends React.Component {
  renderApp () {
    console.disableYellowBox = DebugConfig.yellowBox;
    return (
      <Provider store={this.props.store}>
        <View style={styles.applicationView}>
          <Navigation  onNavigationStateChange={(prevState, currentState) => {
            updateFocus(currentState)
          }}
          />
        </View>
      </Provider>
    );
  }

  render () {
    return this.renderApp();
  }
}
