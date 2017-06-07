// @flow

import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import t from 'tcomb-form-native';

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

export default class Login extends Component {
  form: any;
  userLogin: Function;

  constructor() {
    super();
    this.userLogin = this.userLogin.bind(this);
  }

  static navigationOptions = {
    title: '登录',
  };

  async onValueChange(item: string, selectedValue: string) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      // console.log(`AsyncStorage error: ${error.message}`);
    }
  }

  async userLogin() {
    const value = this.form.getValue();
    if (value) {
      const response = await fetch('https://api.weinnovators.com/gluseruser/login', {
        method: 'POST',
        body: `username=${value.username}&password=${value.password}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status === 401) {
        // alert('错误');
      } else {
        const responseData = await response.json();
        // 存储用户的token，以便将来调用时使用
        this.onValueChange('id_token', responseData.id_token);
        this.onValueChange('idgl_user', responseData.idgl_user.toString());
        // 返回上一屏
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
      }
    }
  }

  render() {
    // <TouchableHighlight style={styles.button} onPress={this._userSignup} underlayColor='#99d9f4'>
    //   <Text style={styles.buttonText}>Signup</Text>
    // </TouchableHighlight>
    // <View style={styles.row}>
    //   <TouchableHighlight onPress={this._getProtectedQuote} style={styles.button}>
    //     <Text style={styles.buttonText}>Get a Chuck Norris Quote!</Text>
    //   </TouchableHighlight>
    // </View>
    return (
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
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  navigation: React.PropTypes.shape({
    routeName: React.PropTypes.string,
    key: React.PropTypes.string,
    navigate: React.PropTypes.func,
  }).isRequired,
};
