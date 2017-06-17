// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  FlatList,
  View,
  ListView,
  StyleSheet,
  Text,
} from 'react-native';
// import {
//   ListItem,
// } from 'react-native-elements';
import ScrollableTabView, { ScrollableTabBar, }  from 'react-native-scrollable-tab-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class Resources extends Component {
  state: {
    dataset: Array<any>;
    isLoading: boolean;
    key: number;
  };

  static navigationOptions = {
    title: '所有资源',
  };

  constructor() {
    super();
    this.state = {
      dataset: [],
      isLoading: true,
      key: 0,
    };
  }

  componentWillMount() {
    this.getResources();
  }

  async getResources() {
    try {
      const response = await fetch('https://api.weinnovators.com/facilities');
      let result = 0;
      const responseJson = await response.json();
      this.setState({
        dataset: responseJson,
        isLoading: false,
      });
      result = 1;
      return result;
    } catch (error) {
      return -1;
    }
  }

  // <FlatList
  //   data={this.state.dataset}
  //   keyExtractor={item => item.idfacility}
  //   renderItem={({ item }) => (
  //     <ListItem
  //       title={item.fac_name}
  //       subtitle={item.amount}
  //       onPress={() => this.props.navigation.navigate('Resource', { id: item.idfacility })}
  //     />
  //   )}
  // />
  render() {
    return (
      <ScrollableTabView renderTabBar={() => <ScrollableTabBar />}>
        <View style={styles.container} key={this.state.key} tabLabel='独立办公空间'>
          {this.state.isLoading && (
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
        </View>
        <Text tabLabel='工位'>favorite</Text>
        <Text tabLabel='会议室'>project</Text>
        <Text tabLabel='展台'>project</Text>
        <Text tabLabel='套件'>project</Text>
        <Text tabLabel='讲师'>project</Text>
      </ScrollableTabView>
    );
  }
}
