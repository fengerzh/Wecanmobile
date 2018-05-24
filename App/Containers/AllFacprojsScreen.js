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
  Container,
  Content,
  Text,
} from 'native-base';
import Formatter from 'chinese-datetime-formatter';
import _ from 'lodash';

import Actions from '../Actions/Creators';
import MyFlatList from './MyFacProjFlatList';

// 此屏幕用于给管理员显示所有房间的租用情况等，属于私密窗口，只有管理员可以查看
class AllFacprojsScreen extends PureComponent {
  state: {
    key: number;
  };

  constructor() {
    super();
    this.state = {
      key: 0,
    };
  }

  componentWillMount() {
    this.props.attemptGetAllFacItems();
  }

  render() {
    return (
      <Container>
        <Content padder>
          <FlatList
            data={this.props.facItems}
            keyExtractor={item => item.id}
            removeClippedSubviews={false}
            renderItem={({ item }) => (
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
                    <Text note>{item.start_time ? Formatter(item.start_time, 'yyyy-MM-dd HH:mm') : ''} ~ {item.end_time ? Formatter(item.end_time, 'HH:mm') : ''}</Text>
                    <Text note>{item.pro_name}</Text>
                  </Body>
                </CardItem>
              </Card>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    facItems: state.facItems.facItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetAllFacItems: () => dispatch(Actions.facItemsRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFacprojsScreen);
