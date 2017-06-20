// @flow

import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Card,
  CardItem,
  Container,
  Content,
  ListItem,
  Spinner,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from 'native-base';

import NewsesActions from '../Redux/NewsesRedux';

class NewsesScreen extends Component {
  state: {
    key: number;
  };

  static navigationOptions = {
    title: '所有新闻',
  };

  constructor() {
    super();
    this.state = {
      key: 0,
    };
  }

  componentWillMount() {
    this.props.attemptGetNewses();
  }

  render() {
    const { newses, fetching } = this.props;

    return (
      <Container>
        <Content padder={false}>
          {fetching && (
            <Spinner />
          )}
          <FlatList
            data={newses}
            keyExtractor={item => item.idnews}
            renderItem={({ item }) => (
              <ListItem onPress={() => this.props.navigation.navigate('News', { id: item.idnews })}>
                <Body>
                  <Text>{item.news_title.replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')}</Text>
                  <Text note>{item.news_time}</Text>
                </Body>
                <Image source={{uri: item.news_pic}} style={{width: 120, height: 60}} />
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newses: state.newses.newses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetNewses: () => dispatch(NewsesActions.newsesRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsesScreen);
