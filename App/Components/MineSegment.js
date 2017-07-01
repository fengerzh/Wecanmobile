// flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Segment,
  Text,
} from 'native-base';

import Actions from '../Actions/Creators';

class MineSegment extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
    this.onSegmentClicked = this.onSegmentClicked.bind(this);
  }

  onSegmentClicked(selectedIndex: integer) {
    this.props.segChanged(selectedIndex);
    // this.setState({
    //   selectedIndex,
    // });
  }

  render() {
    return (
      <Segment>
        <Button first active={this.props.segSelected === 0} onPress={() => this.onSegmentClicked(0)}><Text>用户</Text></Button>
        <Button active={this.props.segSelected === 1} onPress={() => this.onSegmentClicked(1)}><Text>管理员</Text></Button>
        <Button last active={this.props.segSelected === 2} onPress={() => this.onSegmentClicked(2)}><Text>高管</Text></Button>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // login: state.login.login,
    // projects: state.mine.projects,
    // activities: state.mine.activities,
    // facprojs: state.mine.facprojs,
    segSelected: state.mine.segSelected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    segChanged: (id) => dispatch(Actions.segChanged(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MineSegment);
