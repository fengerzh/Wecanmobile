import React, { Component } from 'react';
import {
  Text,
  View,
  WebView,
} from 'react-native';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      dataset: {
        news_title: '',
        news_content: '',
      },
      isLoading: true,
    };
  }

  componentWillMount() {
    this.getNews();
  }

  async getNews() {
    try {
      const response = await fetch(`https://api.weinnovators.com/news/${this.props.navigation.state.params.id}`);
      const responseJson = await response.json();
      this.setState({
        dataset: responseJson,
        isLoading: false,
      });
      return responseJson.movies;
    } catch (error) {
      return -1;
    }
  }

  // <WebView
  //   startInLoadingState={false}
  //   domStorageEnabled
  //   source={{ html: this.state.dataset.news_content }}
  // />
  // <Text>{this.state.dataset.news_title}</Text>
  // startInLoadingState={false}
  render() {
    const html = `<h2>${this.state.dataset.news_title}</h2>
      ${this.state.dataset.news_content.replace(/http:\/\//g, 'https://')}
      <style>
        img {
          height: auto !important;
          max-width: 100% !important;
        }
      </style>
    `;
    return (
      <WebView
        source={{ html }}
      />
    );
  }
}

News.navigationOptions = {
  title: '新闻详情',
};
