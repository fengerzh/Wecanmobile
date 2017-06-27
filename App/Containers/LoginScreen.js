// @flow

import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';

import Actions from '../Actions/Creators';

const Form = t.form.Form;
const Person = t.struct({
  username: t.String,
  password: t.String,
});
const options = {
  fields: {
    username: {
      label: '用户名',
    },
    password: {
      label: '密码',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

class LoginScreen extends Component {
  form: any;
  userLogin: Function;
  closeModal: Function;

  constructor() {
    super();
    this.userLogin = this.userLogin.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // 用户点击登录按钮，开始登录
  userLogin() {
    const value = this.form.getValue();
    if (value) {
      this.props.attemptLogin(value.username, value.password);
    }
  }

  // 取消时的动作，直接关闭此屏幕，并返回活动首页
  async closeModal() {
    if (this.props.closeme) {
      this.props.closeme();
    } else {
      await this.props.navigation.navigate('Activities');
    }
  }

  render() {
    return (
      <Modal
        animationType={"none"}
        transparent={false}
        visible={!this.props.login}
        onRequestClose={() => {alert("Modal has been closed.")}}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>登录</Text>
          </View>
          <View style={styles.row}>
            <Form
              ref={(c) => { this.form = c; }}
              type={Person}
              options={options}
            />
          </View>
          <View style={styles.row}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.userLogin}
              underlayColor="#99d9f4"
            >
              <Text style={styles.buttonText}>登录</Text>
            </TouchableHighlight>
            <View>
              <TouchableHighlight onPress={() => { this.closeModal() }}>
                <Text>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
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
    attemptLogin: (username, password) => dispatch(Actions.loginRequest(username, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
