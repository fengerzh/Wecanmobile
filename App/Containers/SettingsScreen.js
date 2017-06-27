// @flow

import React, { PureComponent } from 'react';
import {
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
} from 'native-base';

import Actions from '../Actions/Creators';

class SettingsScreen extends PureComponent {
  logout: Function;

  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.attemptLogout();
    this.props.navigation.navigate('Mine');
  }

  render() {
    return (
      <Container>
        <Content>
          <List button={true}>
            <ListItem>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('About')}>
                <Text>关于微能</Text>
              </TouchableHighlight>
            </ListItem>
            <ListItem>
              <TouchableHighlight onPress={this.logout}>
                <Text>退出登录</Text>
              </TouchableHighlight>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: () => dispatch(Actions.logoutRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
