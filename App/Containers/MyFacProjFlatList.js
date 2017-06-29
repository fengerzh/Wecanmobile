// @flow

import React, { PureComponent } from 'react';
import {
  FlatList,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  Card,
  CardItem,
  Content,
  Text,
} from 'native-base';
import Swipeout from 'react-native-swipeout';
import Formatter from 'chinese-datetime-formatter';

import Actions from '../Actions/Creators';

class MyFacProjFlatList extends PureComponent {
  deleteFacProj: Function;

  constructor() {
    super();
    this.deleteFacProj = this.deleteFacProj.bind(this);
  }

  deleteFacProj(id: number) {
    this.props.attemptDeleteFacProj(id);
  }

  render() {
    return (
      <Content padder>
        <FlatList
          data={this.props.dataset}
          keyExtractor={item => item.id}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <Swipeout right={[
              {
                backgroundColor: 'red',
                text: '取消预约',
                onPress: () => {this.deleteFacProj(item.id)},
              }
            ]}>
              <Card style={{ flex: 0 }}>
                <CardItem cardBody>
                  <Image
                    style={{ resizeMode: 'cover', width: null, height: 150, flex: 1 }}
                    source={{uri: !item.item_cover ? 'https://img.weinnovators.com/facitemcovers/1.jpg' : `https://img.weinnovators.com/facitemcovers/${item.item_cover}`}}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>{item.item_name}</Text>
                    <Text note>{Formatter(item.start_time, 'yyyy-MM-dd HH:mm')} ~ {Formatter(item.end_time, 'HH:mm')}</Text>
                    <Text note>{item.pro_name}</Text>
                  </Body>
                </CardItem>
              </Card>
            </Swipeout>
          )}
        />
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptDeleteFacProj: (id) => dispatch(Actions.deleteFacProjRequest(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFacProjFlatList);
