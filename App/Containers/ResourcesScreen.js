// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  FlatList,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Text,
} from 'native-base';
import ScrollableTabView, { ScrollableTabBar, }  from 'react-native-scrollable-tab-view';
import _ from 'lodash';

import Actions from '../Actions/Creators';

class MyFlatList extends Component {
  render() {
    return (
      <Content padder>
        <FlatList
          data={this.props.dataset}
          keyExtractor={item => item.idfac_item}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Resource', { id: item.idfac_item })}>
              <Card style={{ flex: 0 }}>
                <CardItem cardBody>
                  <Image
                    style={{ resizeMode: 'cover', width: null, height: 150, flex: 1 }}
                    source={{uri: !item.item_cover ? 'https://img.weinnovators.com/facitemcovers/1.jpg' : `https://img.weinnovators.com/facitemcovers/${item.item_cover}`}}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>{item.item_name.replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')}</Text>
                    <Text note>面积：{item.area}平方米</Text>
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

class ResourcesScreen extends Component {
  state: {
    key: number;
  };

  static navigationOptions = {
    title: '所有资源',
  };

  constructor() {
    super();
    this.state = {
      key: 0,
    };
  }

  componentWillMount() {
    this.props.attemptGetResources();
  }

  render() {
    return (
      <Container>
          <ScrollableTabView renderTabBar={() => <ScrollableTabBar />}>
            <MyFlatList navigation={this.props.navigation} tabLabel='独立办公空间' dataset={_.filter(this.props.resources, { 'fac_id': 4 })} />
            <MyFlatList navigation={this.props.navigation} tabLabel='工位' dataset={_.filter(this.props.resources, { 'fac_id': 5 })} />
            <MyFlatList navigation={this.props.navigation} tabLabel='会议室' dataset={_.filter(this.props.resources, { 'fac_id': 7 })} />
            <MyFlatList navigation={this.props.navigation} tabLabel='展台' dataset={_.filter(this.props.resources, { 'fac_id': 2 })} />
            <MyFlatList navigation={this.props.navigation} tabLabel='套件' dataset={_.filter(this.props.resources, { 'fac_id': 2 })} />
            <Text tabLabel='讲师'>project</Text>
          </ScrollableTabView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resources: state.resources.resources,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetResources: () => dispatch(Actions.resourcesRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesScreen);
