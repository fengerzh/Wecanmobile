// @flow

import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';
import {
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
} from 'native-base';
import {
  Agenda,
  Calendar,
  LocaleConfig,
} from 'react-native-calendars';

LocaleConfig.locales['cn'] = {
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六']
};
LocaleConfig.defaultLocale = 'cn';

export default class Resource extends Component {
  state: {
    dataset: {
      item_name: string;
      item_cover: string;
    };
    isLoading: boolean;
  };

  static navigationOptions = {
    title: '资源详情',
  };

  constructor() {
    super();
    this.state = {
      dataset: {
        item_name: '',
        item_cover: '',
      },
      isLoading: true,
    };
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    try {
      const response = await fetch(`https://api.weinnovators.com/facitems/${this.props.navigation.state.params.id}`);
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

  setFacProj()
  {
    alert('hhh');
  }

  // <Calendar
  //   markedDates={
  //     {'2017-06-20': [{textColor: 'green'}],
  //      '2017-06-22': [{startingDay: true, color: 'green'}],
  //      '2017-06-23': [{endingDay: true, color: 'green', textColor: 'gray'}],
  //      '2017-06-04': [{startingDay: true, color: 'green'}, {endingDay: true, color: 'green'}]
  //     }}
  //   markingType={'interactive'}
  //   style={{
  //     borderWidth: 1,
  //     borderColor: 'gray',
  //     height: 350
  //   }}
  //   theme={{
  //     calendarBackground: '#ffffff',
  //     textSectionTitleColor: '#b6c1cd',
  //     selectedDayBackgroundColor: '#00adf5',
  //     selectedDayTextColor: '#ffffff',
  //     todayTextColor: '#00adf5',
  //     dayTextColor: '#2d4150',
  //     textDisabledColor: '#d9e1e8',
  //     dotColor: '#00adf5',
  //     selectedDotColor: '#ffffff',
  //     arrowColor: 'orange',
  //     monthTextColor: 'blue'
  //   }}
  // />
  render() {
    const item = this.state.dataset;

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Image
                style={{ resizeMode: 'cover', width: null, height: 150, flex: 1 }}
                source={{uri: !item.item_cover ? 'https://img.weinnovators.com/facitemcovers/1.jpg' : `https://img.weinnovators.com/facitemcovers/${item.item_cover}`}}
              />
            </CardItem>
            <CardItem>
              <Text>{item.item_name}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Agenda
                items={
                  {'2017-06-22': [{text: 'item 1 - any js object'}],
                   '2017-06-23': [{text: 'item 2 - any js object'}],
                   '2017-06-24': [],
                   '2017-06-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
                  }}
                loadItemsForMonth={(mongh) => {console.log('trigger items loading')}}
                onDayPress={(day)=>{console.log('day pressed')}}
                onDayChange={(day)=>{console.log('day changed')}}
                selected={'2017-06-16'}
                renderItem={this.renderItem.bind(this)}
                renderDay={(day, item) => {return (<View />);}}
                renderEmptyDate={() => {return (<View />);}}
                rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                hideKnob={false}
                theme = {{}}
                style = {{}}
              />
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full success onPress={() => this.setFacProj()}>
              <Text style={{color: '#FFFFFF'}}>预约资源</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  renderItem(item: any) {
    return (
      <CardItem>
        <Text>{item.text}</Text>
      </CardItem>
    );
  }
}
