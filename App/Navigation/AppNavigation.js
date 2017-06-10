// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  Image,
  StyleSheet,
} from 'react-native';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';

import sActivities from '../Containers/ActivitiesScreen';
import sActivity from '../Containers/Activity';
import sResources from '../Containers/Resources';
import sResource from '../Containers/Resource';
import sNewses from '../Containers/Newses';
import sNews from '../Containers/News';
import sMine from '../Containers/Mine';
import sLogin from '../Containers/Login';
import iconActivities from '../icons/activities.png';
import iconResources from '../icons/resources.png';
import iconNews from '../icons/news.png';
import iconMine from '../icons/mine.png';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

// 活动页签
function tabBarIcon1({ tintColor }) {
  return (<Image
    source={iconActivities}
    style={[styles.icon, { tintColor }]}
  />);
}

tabBarIcon1.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

// 资源页签
function tabBarIcon2({ tintColor }) {
  return (<Image
    source={iconResources}
    style={[styles.icon, { tintColor }]}
  />);
}

tabBarIcon2.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

// 新闻页签
function tabBarIcon3({ tintColor }) {
  return (<Image
    source={iconNews}
    style={[styles.icon, { tintColor }]}
  />);
}

tabBarIcon3.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

// 我的页签
function tabBarIcon4({ tintColor }) {
  return (<Image
    source={iconMine}
    style={[styles.icon, { tintColor }]}
  />);
}

tabBarIcon4.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

// static navigationOptions = ({navigation, screenProps}) => ({
//   tabBarLabel: '活动',
//   tabBarIcon: tabBarIcon1,
//   // tabBarVisible: navigation.state.params.hideTabBar != null ?  !navigation.state.params.hideTarBar: true,
// });

// 总页签
const MainTabNavigator = TabNavigator(
  {
    Activities: {
      screen: StackNavigator({
        Activities: {
          screen: sActivities,
        },
        Activity: {
          screen: sActivity,
        },
      }),
      navigationOptions: ({navigation, screenProps}) => ({
          tabBarLabel: '活动',
          tabBarIcon: tabBarIcon1,
          tabBarVisible: navigation.state.params != undefined && navigation.state.params.hideTabBar != undefined ? !navigation.state.params.hideTabBar : true,
      }),
    },
    Resources: {
      screen: StackNavigator({
        Resources: {
          screen: sResources,
        },
        Resource: {
          screen: sResource,
        },
      }),
      navigationOptions: {
        tabBarLabel: '资源',
        tabBarIcon: tabBarIcon2,
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
        tabBarIcon: tabBarIcon3,
      },
    },
    Mine: {
      screen: StackNavigator({
        Mine: {
          screen: sMine,
        },
      }),
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: tabBarIcon4,
      },
    },
  },
  {
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
  },
);

const AppNavigation = StackNavigator({
  MainTabNavigator: { screen: MainTabNavigator },
  Login: { screen: sLogin },
}, {
  headerMode: 'none',
  mode: 'modal',
});

export default AppNavigation;
