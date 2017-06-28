// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  TouchableHighlight,
} from 'react-native';
import {
  Icon,
} from 'native-base';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';

import sActivities from '../Containers/ActivitiesScreen';
import sActivity from '../Containers/ActivityScreen';
import sResources from '../Containers/ResourcesScreen';
import sResource from '../Containers/Resource';
import sNewses from '../Containers/NewsesScreen';
import sNews from '../Containers/News';

import sMine from '../Containers/MineScreen';
import sMyActivities from '../Containers/MyActivitiesScreen';
import sSettings from '../Containers/SettingsScreen';
import sAbout from '../Containers/AboutScreen';

const IconImage = styled.Image`
  width: 26;
  height: 26;
`;

// 总页签
const AppNavigation = TabNavigator(
  {
    Activities: {
      screen: StackNavigator({
        Activities: {
          screen: sActivities,
        },
        Activity: {
          screen: sActivity,
          navigationOptions: ({ navigation }) => ({
            title: '活动',
            tabBarVisible: false,
          }),
        },
      }),
      navigationOptions: ({navigation, screenProps}) => ({
          tabBarLabel: '活动',
          tabBarIcon: (tintColor) => (<IconImage source={require('../icons/activities.png')} style={tintColor} />),
      }),
    },
    Resources: {
      screen: StackNavigator({
        Resources: {
          screen: sResources,
        },
        Resource: {
          screen: sResource,
          navigationOptions: ({ navigation }) => ({
            title: '资源',
            tabBarVisible: false,
          }),
        },
      }),
      navigationOptions: {
        tabBarLabel: '资源',
        tabBarIcon: (tintColor) => (<IconImage source={require('../icons/resources.png')} style={tintColor} />),
      },
    },
    News: {
      screen: StackNavigator({
        Newses: {
          screen: sNewses,
        },
        News: {
          screen: sNews,
        },
      }),
      navigationOptions: {
        tabBarLabel: '新闻',
        tabBarIcon: (tintColor) => (<IconImage source={require('../icons/news.png')} style={tintColor} />),
      },
    },
    Mine: {
      screen: StackNavigator({
        Mine: {
          screen: sMine,
          navigationOptions: ({ navigation }) => ({
            title: '我的',
            headerLeft: (
              <TouchableHighlight onPress={() => navigation.navigate('Settings')}>
                <Icon name='settings' />
              </TouchableHighlight>
            ),
          }),
        },
        MyActivities: {
          screen: sMyActivities,
          navigationOptions: ({ navigation }) => ({
            title: '我的活动',
            tabBarVisible: false,
          }),
        },
        Settings: {
          screen: sSettings,
          navigationOptions: ({ navigation }) => ({
            title: '设置',
            tabBarVisible: false,
          }),
        },
        About: {
          screen: sAbout,
          navigationOptions: ({ navigation }) => ({
            title: '关于',
            tabBarVisible: false,
          }),
        },
      }),
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: (tintColor) => (<IconImage source={require('../icons/mine.png')} style={tintColor} />),
      },
    },
  },
  {
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#ae4928',
    },
  },
);

export default AppNavigation;
