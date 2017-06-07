// @flow

import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
} from 'react-native';
import {
  Avatar,
  Card,
} from 'react-native-elements';

export default class Mine extends Component {
  state: {
    idglUser: string,
  }
  static navigationOptions = {
    title: '我的',
  };

  constructor() {
    super();
    this.state = {
      idglUser: ''
    };
  }

  componentWillMount() {
    this.getMine();
  }

  refresh() {
    this.getMine();
  }

  async getMine() {
    const idglUser = await AsyncStorage.getItem('idgl_user');
    if (idglUser === null) {
      // 如果本地没有存储用户信息，则错误，跳转到登录页面
      this.props.navigation.navigate('Login', {
        onGoBack: () => this.refresh(),
      });
      return -3;
    } else {
      this.setState({
        idglUser,
      });
    }
  }

  render() {
    return (
      <View>
        <View style={{backgroundColor: '#527FE4', height: 100, padding: 10}}>
          <Avatar
            large
            rounded
            source={{uri: `https://img.weinnovators.com/wxavatars/${this.state.idglUser}.jpg`}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </View>
        <View style={{backgroundColor: '#FF0000', padding: 10, marginTop: 20}}>
          <Text>
            我的项目
          </Text>
        </View>
        <View style={{backgroundColor: '#FF0000', padding: 10, marginTop: 20}}>
          <Text>
            我的预约
          </Text>
        </View>
        <View style={{backgroundColor: '#FF0000', padding: 10, marginTop: 20}}>
          <Text>
            我的活动
          </Text>
        </View>
      </View>
    );
  }
}
