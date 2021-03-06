// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  Image,
  TouchableOpacity,
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
    const facCount = _.countBy(this.props.facprojs, 'status');

    return (
      <Container>
        <Content padder>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.props.login ? `https://img.weinnovators.com/wxavatars/${this.props.login.idgl_user}.jpg` : ''}} />
                <Body>
                  <Text>{this.props.login ? this.props.login.wx_username : ''}</Text>
                  <Text note></Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          {this.props.segSelected === 0 && (
            <View>
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyFacprojs', { status: 0 })}>
                      <View>
                        <TextNumber>{facCount['0'] ? facCount['0'] : 0}</TextNumber>
                        <TextLabel>待批准</TextLabel>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyFacprojs', { status: 1 })}>
                      <View>
                        <TextNumber>{facCount['1'] ? facCount['1'] : 0}</TextNumber>
                        <TextLabel>待参与</TextLabel>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyFacprojs', { status: 2 })}>
                      <View>
                        <TextNumber>{facCount['2'] ? facCount['2'] : 0}</TextNumber>
                        <TextLabel>被拒绝</TextLabel>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyFacprojs', { status: 99 })}>
                      <View>
                        <TextNumber>{facCount['99'] ? facCount['99'] : 0}</TextNumber>
                        <TextLabel>已完成</TextLabel>
                      </View>
                    </TouchableOpacity>
                  </Body>
                </CardItem>
              </Card>
              <Card>
                <CardItem header>
                  <Text>我的活动</Text>
                </CardItem>
                <CardItem>
                  <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyActivities', { status: 0 })}>
                      <View>
                        <TextNumber>{actCount['0'] ? actCount['0'] : 0}</TextNumber>
                        <TextLabel>待批准</TextLabel>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyActivities', { status: 1 })}>
                      <View>
                        <TextNumber>{actCount['1'] ? actCount['1'] : 0}</TextNumber>
                        <TextLabel>待参与</TextLabel>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyActivities', { status: 2 })}>
                      <View>
                        <TextNumber>{actCount['2'] ? actCount['2'] : 0}</TextNumber>
                        <TextLabel>被拒绝</TextLabel>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyActivities', { status: 99 })}>
                      <View>
                        <TextNumber>{actCount['99'] ? actCount['99'] : 0}</TextNumber>
                        <TextLabel>已完成</TextLabel>
                      </View>
                    </TouchableOpacity>
                  </Body>
                </CardItem>
              </Card>
            </View>
          )}
          {this.props.segSelected === 1 && (
            <View>
              <Card>
                <CardItem>
                  <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View>
                      <Image source={{uri: 'https://wx.weinnovators.com/images/project-logo.jpg'}} style={{ width: 45, height: 45 }}/>
                      <Text style={{textAlign: 'center'}}>项目管理</Text>
                    </View>
                    <View>
                      <Image source={{uri: 'https://wx.weinnovators.com/images/project-logo.jpg'}} style={{ width: 45, height: 45 }}/>
                      <Text style={{textAlign: 'center'}}>活动管理</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllFacprojs')}>
                      <View>
                        <Image source={{uri: 'https://wx.weinnovators.com/images/project-logo.jpg'}} style={{ width: 45, height: 45 }}/>
                        <Text style={{textAlign: 'center'}}>预约管理</Text>
                      </View>
                    </TouchableOpacity>
                  </Body>
                </CardItem>
              </Card>
            </View>
          )}
          {this.props.segSelected === 2 && (
            <View>
              <Card>
                <CardItem>
                  <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllFacItems')}>
                      <View>
                        <Image source={{uri: 'https://wx.weinnovators.com/images/project-logo.jpg'}} style={{ width: 45, height: 45 }}/>
                        <Text style={{textAlign: 'center'}}>出租管理</Text>
                      </View>
                    </TouchableOpacity>
                    <View>
                      <Image source={{uri: 'https://wx.weinnovators.com/images/project-logo.jpg'}} style={{ width: 45, height: 45 }}/>
                      <Text style={{textAlign: 'center'}}>客户管理</Text>
                    </View>
                    <View>
                      <Image source={{uri: 'https://wx.weinnovators.com/images/project-logo.jpg'}} style={{ width: 45, height: 45 }}/>
                      <Text style={{textAlign: 'center'}}>XX管理</Text>
                    </View>
                  </Body>
                </CardItem>
              </Card>
            </View>
          )}
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
    facprojs: state.mine.facprojs,
    segSelected: state.mine.segSelected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetMine: () => dispatch(Actions.mineRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(MineScreen, 'Mine'));
