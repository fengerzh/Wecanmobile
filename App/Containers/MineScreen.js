// @flow

import React, { Component } from 'react';
import {
  AsyncStorage,
  Modal,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Left,
  Text,
  Thumbnail,
} from 'native-base';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';

import LoginScreen from './LoginScreen';

class MineScreen extends Component {
  state: {
    showModal: boolean,
  }
  static navigationOptions = {
    title: '我的',
  };
  closeModal: Function;

  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  refresh() {
    this.getMine();
  }

  async getMine() {
    if (this.props.login == null) {
      // 如果本地没有存储用户信息，则错误，弹出登录页面
      this.setState({showModal: true});
    }
  }

  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    if (this.props.isFocused) {
      if (!this.state.showModal) {
        this.getMine();
      }
    }
    return (
      <Container>
        <Content padder>
          {this.state.showModal && (<LoginScreen navigation={this.props.navigation} visible={this.state.showModal} closeme={this.closeModal} />)}
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: `https://img.weinnovators.com/wxavatars/${this.props.login.idgl_user}.jpg`}} />
                <Body>
                  <Text>{this.props.login.wx_username}</Text>
                  <Text note>Other info</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>我的项目</Text>
            </CardItem>
            <CardItem>
              <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <View>
                  <Icon name="logo-apple" style={{ width: 45, height: 45, justifyContent: 'center' }} />
                  <Text>项目1</Text>
                </View>
                <View>
                  <Icon name="logo-apple" style={{ width: 45, height: 45, justifyContent: 'center' }} />
                  <Text>项目1</Text>
                </View>
                <View>
                  <Icon name="logo-apple" style={{ width: 45, height: 45, justifyContent: 'center' }} />
                  <Text>项目1</Text>
                </View>
                <View>
                  <Icon name="logo-apple" style={{ width: 45, height: 45, justifyContent: 'center' }} />
                  <Text>项目1</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>我的预约</Text>
            </CardItem>
            <CardItem>
              <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <View>
                  <Icon name="logo-apple" style={{ width: 45, height: 45, justifyContent: 'center' }} />
                  <Text>已批准预约</Text>
                </View>
                <View>
                  <Icon name="logo-apple" style={{ width: 45, height: 45, justifyContent: 'center' }} />
                  <Text>待批准预约</Text>
                </View>
                <View>
                  <Icon name="logo-apple" style={{ width: 45, height: 45, justifyContent: 'center' }} />
                  <Text>已完成预约</Text>
                </View>
                <View>
                  <Icon name="logo-apple" style={{ width: 45, height: 45, justifyContent: 'center' }} />
                  <Text>被拒绝预约</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  我的活动
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // attemptLogin: (username, password) => dispatch(Actions.loginRequest(username, password)),
  }
}

// export default withNavigationFocus(MineScreen, 'Mine');
// export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(MineScreen, 'Mine'));
