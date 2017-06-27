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
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';
import Formatter from 'chinese-datetime-formatter';

import Actions from '../Actions/Creators';

class ActivitiesScreen extends PureComponent {
  state: {
    dsActivities: Array<any>;
    isLoading: boolean;
    key: number;
    imageContainerHeight: number;
  };
  onLayout: Function;
  setStatus: Function;

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

  onLayout(e) {
    if (Dimensions.get('window').width > Dimensions.get('window').height) {
      this.setState({
        imageContainerHeight: 300,
      });
    } else {
      this.setState({
        imageContainerHeight: 150,
      });
    }
  }

  render() {
    const { activities, fetching } = this.props;

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
    cancelClicked: state.login.cancelClicked,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetActivities: () => dispatch(Actions.activitiesRequest()),
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesScreen);
export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(ActivitiesScreen, 'Activities'));
