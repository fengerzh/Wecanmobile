// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  FlatList,
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import {
  ListItem,
} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class Newses extends Component {
  state: {
    dataset: Array<any>;
    isLoading: boolean;
    key: number;
  };

  static navigationOptions = {
    title: '所有新闻',
  };

  constructor() {
    super();
    // const dataset = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataset: [],
      isLoading: true,
      key: 0,
    };
  }

  componentWillMount() {
    this.getNewses();
  }

  async getNewses() {
    // await AsyncStorage.removeItem('id_token');
    try {
      const response = await fetch('https://api.weinnovators.com/news/index');
      let result = 0;
      const responseJson = await response.json();
      // alert(JSON.stringify(responseJson)); return;
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

  // removeClippedSubviews={false}
  render() {
    return (
      <View style={styles.container} key={this.state.key}>
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
        <FlatList
          data={this.state.dataset}
          keyExtractor={item => item.idnews}
          renderItem={({ item }) => (
            <ListItem
              title={item.news_title}
              subtitle={item.news_time}
              avatar={{ uri: item.news_pic }}
              onPress={() => this.props.navigation.navigate('News', { id: item.idnews })}
            />
          )}
        />
      </View>
    );
  }
}

Newses.propTypes = {
  navigation: PropTypes.shape({
    routeName: PropTypes.string,
    key: PropTypes.string,
    navigate: PropTypes.func,
  }).isRequired,
};
