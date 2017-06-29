// @flow

import React, { PureComponent } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Spinner,
  Text,
} from 'native-base';
import ScrollableTabView, { ScrollableTabBar, }  from 'react-native-scrollable-tab-view';
import _ from 'lodash';
import Formatter from 'chinese-datetime-formatter';

import Actions from '../Actions/Creators';

class MyFlatList extends PureComponent {
  render() {
    return (
      <Content padder>
        <FlatList
          data={this.props.dataset}
          keyExtractor={item => item.act_id}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Activity', { act_id: item.act_id })}>
              <Card style={{ flex: 0 }}>
                <CardItem cardBody>
                  <Image
                    style={{ resizeMode: 'cover', width: null, height: 150, flex: 1 }}
                    source={{uri: item.title_pic == undefined ? 'https://wx.weinnovators.com/images/title_pic_01.jpg' : `https://img.weinnovators.com/accimages/${item.title_pic}.jpg`}}
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
    );
  }
}

class MyActivitiesScreen extends PureComponent {
  state: {
    key: number;
    imageContainerHeight: number;
  };
  page: number;

  constructor() {
    super();
    this.state = {
      key: 0,
      imageContainerHeight: 150,
    };
    this.page = 0;
  }

  componentWillMount() {
    switch (this.props.navigation.state.params.status) {
      case 0:
        this.page = 1;
        break;

      case 1:
        this.page = 2;
        break;

      case 2:
        this.page = 3;
        break;

      case 99:
        this.page = 4;
        break;

      default:
    }
  }

  render() {
    return (
      <Container>
        <ScrollableTabView renderTabBar={() => <ScrollableTabBar />} initialPage={this.page}>
          <MyFlatList tabLabel='全部' dataset={this.props.activities} />
          <MyFlatList tabLabel='待批准' dataset={_.filter(this.props.activities, function(o) { return o.status == 0; })} />
          <MyFlatList tabLabel='待参与' dataset={_.filter(this.props.activities, { 'status': 1 })} />
          <MyFlatList tabLabel='已拒绝' dataset={_.filter(this.props.activities, { 'status': 2 })} />
          <MyFlatList tabLabel='已结束' dataset={_.filter(this.props.activities, { 'status': 99 })} />
        </ScrollableTabView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activities: state.mine.activities,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyActivitiesScreen);
