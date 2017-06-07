// @flow

import React, { Component } from 'react';
import { Platform } from 'react-native';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

import Navigation from '../Navigation/AppNavigation'

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? '苹方-简' : 'Roboto',
    fontWeight: '300',
    color: 'black'
  }
};

setCustomText(customTextProps);

class RootContainer extends Component {
  render () {
    return (
      <Navigation />
    )
  }
}

export default RootContainer;
