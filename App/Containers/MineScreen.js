// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  Image,
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
import _ from 'lodash';

import Actions from '../Actions/Creators';
import LoginScreen from './LoginScreen';

const TextNumber = styled.Text`
  fontSize: 24;
  textAlign: center;
`;

const TextLabel = styled.Text`
  color: #999999;
  fontSize: 12;
  textAlign: center;
`;

class MineScreen extends Component {
  componentWillMount() {
    if (this.props.login) {
      this.props.attemptGetMine();
    }
  }

  render() {
    if (this.props.isFocused) {
      if (!this.props.login) {
        return (<LoginScreen navigation={this.props.navigation} visible={true} />);
      }
    }

    // 按照活动状态统计活动个数
    const actCount = _.countBy(this.props.activities, 'status');

    return (
      <Container>
        <Content padder>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.props.login ? `https://img.weinnovators.com/wxavatars/${this.props.login.idgl_user}.jpg` : ''}} />
                <Body>
                  <Text>{this.props.login ? this.props.login.wx_username : ''}</Text>
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
              {this.props.projects.map(item =>
                <View>
                  <Image source={{uri: item.pro_logo ? `https://img.weinnovators.com/prologos/${item.pro_logo}` : 'https://wx.weinnovators.com/images/project-logo.jpg'}} style={{ width: 45, height: 45 }}/>
                  <Text style={{textAlign: 'center'}}>{item.pro_name}</Text>
                </View>
              )}
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>我的预约</Text>
            </CardItem>
            <CardItem>
              <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MyActivities', { status: 0 })}>
                  <View>
                    <TextNumber>{actCount['0'] ? actCount['0'] : 0}</TextNumber>
                    <TextLabel>待批准</TextLabel>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MyActivities', { status: 1 })}>
                  <View>
                    <TextNumber>{actCount['1'] ? actCount['1'] : 0}</TextNumber>
                    <TextLabel>待参与</TextLabel>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MyActivities', { status: 2 })}>
                  <View>
                    <TextNumber>{actCount['2'] ? actCount['2'] : 0}</TextNumber>
                    <TextLabel>被拒绝</TextLabel>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MyActivities', { status: 99 })}>
                  <View>
                    <TextNumber>{actCount['99'] ? actCount['99'] : 0}</TextNumber>
                    <TextLabel>已完成</TextLabel>
                  </View>
                </TouchableHighlight>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>我的活动</Text>
            </CardItem>
            <CardItem>
              <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MyActivities', { status: 0 })}>
                  <View>
                    <TextNumber>{actCount['0'] ? actCount['0'] : 0}</TextNumber>
                    <TextLabel>待批准</TextLabel>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MyActivities', { status: 1 })}>
                  <View>
                    <TextNumber>{actCount['1'] ? actCount['1'] : 0}</TextNumber>
                    <TextLabel>待参与</TextLabel>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MyActivities', { status: 2 })}>
                  <View>
                    <TextNumber>{actCount['2'] ? actCount['2'] : 0}</TextNumber>
                    <TextLabel>被拒绝</TextLabel>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('MyActivities', { status: 99 })}>
                  <View>
                    <TextNumber>{actCount['99'] ? actCount['99'] : 0}</TextNumber>
                    <TextLabel>已完成</TextLabel>
                  </View>
                </TouchableHighlight>
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
    projects: state.mine.projects,
    activities: state.mine.activities,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetMine: () => dispatch(Actions.mineRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(MineScreen, 'Mine'));
