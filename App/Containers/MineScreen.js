// @flow

import React, { Component } from 'react';
import {
  AsyncStorage,
  Modal,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
// import {
//   Avatar,
//   Card,
// } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';

import LoginScreen from './LoginScreen';

class MineScreen extends Component {
  state: {
    idglUser: string,
    showModal: boolean,
  }
  static navigationOptions = {
    title: '我的',
  };
  closeModal: Function;

  constructor() {
    super();
    this.state = {
      idglUser: '',
      showModal: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  refresh() {
    this.getMine();
  }

  async getMine() {
    const idglUser = await AsyncStorage.getItem('idgl_user');
    if (idglUser === null) {
      // 如果本地没有存储用户信息，则错误，跳转到登录页面
      // this.props.navigation.navigate('Login', {
      //   onGoBack: () => this.refresh(),
      // });
      // return -3;
      // alert('good');
      // this.setModalVisible(true);
      this.setState({showModal: true});
    } else {
      this.setState({
        idglUser,
      });
    }
  }

  closeModal() {
    this.setState({showModal: false});
  }

  // <View style={{backgroundColor: '#527FE4', height: 100, padding: 10}}>
  //   <Avatar
  //     large
  //     rounded
  //     source={{uri: `https://img.weinnovators.com/wxavatars/${this.state.idglUser}.jpg`}}
  //     onPress={() => console.log("Works!")}
  //     activeOpacity={0.7}
  //   />
  // </View>
  render() {
    if (this.props.isFocused) {
      if (!this.state.showModal) {
        this.getMine();
      }
    }
    return (
      <View>
        {this.state.showModal && (<LoginScreen navigation={this.props.navigation} visible={this.state.showModal} closeme={this.closeModal} />)}
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

export default withNavigationFocus(MineScreen, 'Mine');
