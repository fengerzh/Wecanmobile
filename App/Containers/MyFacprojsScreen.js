// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Container,
} from 'native-base';
import ScrollableTabView, { ScrollableTabBar, }  from 'react-native-scrollable-tab-view';
import _ from 'lodash';

import Actions from '../Actions/Creators';
import MyFlatList from './MyFacProjFlatList';

class MyFacprojsScreen extends PureComponent {
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
          <MyFlatList tabLabel='全部' dataset={this.props.facprojs} />
          <MyFlatList tabLabel='待批准' dataset={_.filter(this.props.facprojs, function(o) { return o.status == 0; })} />
          <MyFlatList tabLabel='待参与' dataset={_.filter(this.props.facprojs, { 'status': 1 })} />
          <MyFlatList tabLabel='已拒绝' dataset={_.filter(this.props.facprojs, { 'status': 2 })} />
          <MyFlatList tabLabel='已结束' dataset={_.filter(this.props.facprojs, { 'status': 99 })} />
        </ScrollableTabView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    facprojs: state.mine.facprojs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFacprojsScreen);
