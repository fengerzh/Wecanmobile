// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  ListItem,
} from 'react-native-elements';
import Formatter from 'chinese-datetime-formatter';
import ActivitiesActions from '../Redux/ActivitiesRedux';

import styles from './Styles/ActivitiesScreenStyles';

class ActivitiesScreen extends PureComponent {
  state: {
    dsActivities: Array<any>;
    isLoading: boolean;
    key: number;
  };

  static navigationOptions = {
    title: '所有活动',
  };

  constructor() {
    super();
    this.state = {
      dsActivities: [],
      isLoading: true,
      key: 0,
    };
  }

  componentWillMount() {
    this.props.attemptGetActivities();
  }

  async getActivities() {
    // 调用公开接口获取数据
    const response = await fetch('https://api.weinnovators.com/activities?corpid=wxd9ed6139adfa53ce');
    const responseJson = await response.json();
    this.setState({
      dsActivities: responseJson,
      isLoading: false,
    });
    return 1;

    // 调用私密接口
    // await AsyncStorage.removeItem('id_token');
    // try {
    //   const DEMO_TOKEN = await AsyncStorage.getItem('id_token');
    //   if (DEMO_TOKEN === null) {
    //     // 如果本地没有存储用户信息，则错误，跳转到登录页面
    //     this.props.navigation.navigate('Login', {
    //       onGoBack: () => this.refresh(),
    //     });
    //     return -3;
    //   }
    //   const response = await fetch('https://api.weinnovators.com/jwtactivity/index?corp_id=wxd9ed6139adfa53ce&start=0', {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${DEMO_TOKEN}`,
    //     },
    //   });
    //   let result = 0;
    //   if (response.status === 401) {
    //     // 返回状态401说明未登录
    //     this.setState({
    //       dsActivities: [{ act_title: '未登录' }],
    //       isLoading: false,
    //     });
    //     result = -2;
    //   } else {
    //     const responseJson = await response.json();
    //     this.setState({
    //       dsActivities: responseJson,
    //       isLoading: false,
    //     });
    //     result = 1;
    //     await AsyncStorage.setItem('activities', JSON.stringify(responseJson));
    //   }
    //   return result;
    // } catch (error) {
    //   return -1;
    // }
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  refresh() {
    this.getActivities();
  }

  render() {
    const { activities, fetching } = this.props;

    return (
      <View style={styles.container} key={this.state.key}>
        {fetching && (
          <ActivityIndicator
            style={[
              styles.centering,
              {
                height: 80,
              },
            ]}
            size="large"
          />
        )}
        <FlatList
          data={activities}
          keyExtractor={item => item.act_id}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Activity', { act_id: item.act_id })}>
              <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{uri: item.title_pic == undefined ? 'https://wx.weinnovators.com/images/title_pic_01.jpg' : `https://img.weinnovators.com/accimages/${item.title_pic}.jpg`}} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.act_title.replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')}</Text>
                  <Text style={{fontSize: 10, color: '#999999'}}>{Formatter(item.act_date, 'yyyy-mm-dd')}</Text>
                  <Text style={{fontSize: 10, color: '#999999'}}>{item.course_name}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}
// ItemSeparatorComponent={this.renderSeparator}

ActivitiesScreen.propTypes = {
  navigation: PropTypes.shape({
    routeName: PropTypes.string,
    key: PropTypes.string,
    navigate: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    activities: state.activities.activities,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetActivities: () => dispatch(ActivitiesActions.activitiesRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesScreen);
