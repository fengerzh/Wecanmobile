// @flow

import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {
  List,
  ListItem,
} from 'react-native-elements';
import {
  NavigationActions,
} from 'react-navigation';
// import * as WechatAPI from 'react-native-wx';
import * as WeChat from 'react-native-wechat';

export default class Activity extends Component {
  static navigationOptions = {
    title: '活动详情',
  };

  state: {
    dataset: {
      act_title: string;
      act_date: string;
      act_desc: string;
      course_name: string;
      title_pic: string;
    };
    isLoading: boolean;
  };

  constructor() {
    super();
    this.state = {
      dataset: {
        act_title: '',
        act_date: '<Text></Text>',
        act_desc: '',
        course_name: '<Text></Text>',
        title_pic: '',
      },
      isLoading: true,
    };
  }

  componentWillMount() {
    const setParamsAction = NavigationActions.setParams({
      params: { hideTabBar: true },
      key: 'Activities',
    });
    this.props.navigation.dispatch(setParamsAction);
    this.getActivity();
    // 检查微信是否已安装
    // WeChat.isWXAppInstalled().then(() => {
      // 微信登录
      // WeChat.login().then((user) => {
      //   alert(JSON.stringify(user));
      // });
      // 分享给朋友
      // WeChat.shareToSession({
      // 	type: 'text',
      // 	description: 'aaa',
      // });
    // });
  }

  componentWillUnmount() {
    const setParamsAction = NavigationActions.setParams({
      params: { hideTabBar: false },
      key: 'Activities',
    });
    this.props.navigation.dispatch(setParamsAction);
  }

  async getActivity() {
    try {
      const response = await fetch(`https://api.weinnovators.com/activities/${this.props.navigation.state.params.act_id}`);
      const responseJson = await response.json();
      this.setState({
        dataset: responseJson,
        isLoading: false,
      });
      return responseJson.movies;
    } catch (error) {
      return -1;
    }
  }

  // subtitle={
  //   <View style={styles.subtitleView}>
  //     <Image source={require('../images/rating.png')} style={styles.ratingImage}/>
  //     <Text style={styles.ratingText}>5 months ago</Text>
  //   </View>
  // }
  // avatar={require('../images/avatar1.jpg')}
  render() {
    const item = this.state.dataset;
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
             style={styles.image}
             source={{
               url: item.title_pic == undefined ? 'https://wx.weinnovators.com/images/title_pic_01.jpg' : `https://img.weinnovators.com/accimages/${item.title_pic}.jpg`,
             }}
            />
          </View>
          <View>
            <Text>{item.act_title}</Text>
          </View>
          <List style={{backgroundColor: '#FFFFFF', marginBottom: 20}}>
            <ListItem
              hideChevron={true}
              leftIcon={{name: 'schedule'}}
              title={item.act_date}
            />
            <ListItem
              leftIcon={{name: 'place'}}
              title={item.course_name}
            />
          </List>
          <View style={{backgroundColor: '#FFFFFF', padding: 8}}>
            <HTMLView value={item.act_desc} />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={{textAlign: 'center'}}>我要报名</Text>
        </View>
      </View>
    );
  }
}

Activity.propTypes = {
  navigation: React.PropTypes.shape({
    routeName: React.PropTypes.string,
    key: React.PropTypes.string,
    navigate: React.PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 150,
  },
  text: {
    backgroundColor: '#FF0000',
  },
  image: {
    flex:1,
  },
  footer: {
    backgroundColor: '#00FFFF',
    height: 40,
    padding: 10,
  }
});
