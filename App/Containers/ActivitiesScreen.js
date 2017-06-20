// @flow

import React, { PureComponent } from 'react';
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  Image,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Card,
  CardItem,
  Container,
  Content,
  Spinner,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body
} from 'native-base';
import Formatter from 'chinese-datetime-formatter';
import ActivitiesActions from '../Redux/ActivitiesRedux';

class ActivitiesScreen extends PureComponent {
  state: {
    dsActivities: Array<any>;
    isLoading: boolean;
    key: number;
    imageContainerHeight: number;
  };
  onLayout: Function;

  static navigationOptions = {
    title: '所有活动',
  };

  constructor() {
    super();
    this.state = {
      dsActivities: [],
      isLoading: true,
      key: 0,
      imageContainerHeight: 150,
    };
    this.onLayout = this.onLayout.bind(this);
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

  onLayout(e) {
    if (Dimensions.get('window').width > Dimensions.get('window').height) {
      this.setState({
        // width: Dimensions.get('window').width,
        imageContainerHeight: 300,
      });
    } else {
      this.setState({
        // width: Dimensions.get('window').width,
        imageContainerHeight: 150,
      });
    }
  }

  render() {
    const { activities, fetching } = this.props;
    const logo = require('../Images/logo.png');

    return (
      <Container>
        <Content padder>
          {fetching && (
            <Spinner />
          )}
          <FlatList
            data={activities}
            keyExtractor={item => item.act_id}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => this.props.navigation.navigate('Activity', { act_id: item.act_id })}>
                <Card style={{ flex: 0 }}>
                  <CardItem cardBody>
                    <Image
                      style={{ resizeMode: 'cover', width: null, height: this.state.imageContainerHeight, flex: 1 }}
                      source={{uri: item.title_pic == undefined ? 'https://wx.weinnovators.com/images/title_pic_01.jpg' : `https://img.weinnovators.com/accimages/${item.title_pic}.jpg`}}
                      onLayout={this.onLayout}
                    />
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{item.act_title.replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')}</Text>
                      <Text note>{Formatter(item.act_date, 'yyyy-MM-dd')}</Text>
                      <Text note>{item.course_name}</Text>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableHighlight>
            )}
          />
        </Content>
      </Container>
    );
  }
}

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
