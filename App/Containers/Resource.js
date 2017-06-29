// @flow

import React, { Component } from 'react';
import {
  Alert,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Form,
  Input,
  Left,
  List,
  ListItem,
  Picker,
  Right,
  Text,
  Toast,
} from 'native-base';
import {
  Agenda,
  Calendar,
  LocaleConfig,
} from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Formatter from 'chinese-datetime-formatter';

import Actions from '../Actions/Creators';

LocaleConfig.locales['cn'] = {
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六']
};
LocaleConfig.defaultLocale = 'cn';

class ResourceScreen extends Component {
  state: {
    dataset: {
      item_name: string;
      item_cover: string;
    };
    isLoading: boolean;
    isDateTimePickerVisible: boolean;
    timetype: string;
    starttime: string;
    endtime: string;
    selected: string;
    selectedProject: string;
  };
  handleDatePicked: Function;
  showDateTimePicker: Function;
  hideDateTimePicker: Function;
  renderItem: Function;

  constructor() {
    super();
    this.state = {
      dataset: {
        item_name: '',
        item_cover: '',
      },
      isLoading: true,
      isDateTimePickerVisible: false,
      timetype: 'starttime',
      starttime: '00:00',
      endtime: '00:00',
      selected: '',
      selectedProject: '',
    };
    this.handleDatePicked = this.handleDatePicked.bind(this);
    this.showDateTimePicker = this.showDateTimePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
  }

  componentWillMount() {
    this.getData();
    this.setState({
      selectedProject: this.props.projects[0].ida_project,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      Alert.alert('温馨提醒', nextProps.error, [
        {
          text:'确定',
          onPress: () => {},
        },
      ]);
    } else if (!nextProps.fetching) {
      Alert.alert('温馨提醒', '预约已成功，请按时使用', [
        {
          text:'确定',
          onPress: () => {},
        },
      ]);
    }
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

  setFacProj() {
    if (!this.state.selected) {
      Toast.show({
        supportedOrientations: ['portrait','landscape'],
        text: '请选择日期',
        position: 'bottom',
        buttonText: '确定',
      });
    } else if (this.state.starttime === '00:00') {
      Toast.show({
        supportedOrientations: ['portrait','landscape'],
        text: '请选择开始时间',
        position: 'bottom',
        buttonText: '确定',
      });
    } else if (this.state.endtime === '00:00') {
      Toast.show({
        supportedOrientations: ['portrait','landscape'],
        text: '请先选择结束时间',
        position: 'bottom',
        buttonText: '确定',
      });
    } else {
      this.props.attemptSetFacProj(
        this.props.navigation.state.params.id,
        this.state.selectedProject,
        this.state.selected + ' ' + this.state.starttime + ':00',
        this.state.selected + ' ' + this.state.endtime + ':00'
      );
    }
  }

  handleDatePicked(date: any) {
    if (date instanceof Date) {
      // date picker
      if (this.state.timetype === 'starttime') {
        this.setState({
          starttime: Formatter(date, 'HH:mm'),
          isDateTimePickerVisible: false,
        });
      } else {
        this.setState({
          endtime: Formatter(date, 'HH:mm'),
          isDateTimePickerVisible: false,
        });
      }
    } else {
      // calendar clicked
      this.setState({
        selected: date.dateString,
        // starttime: Formatter(date.dateString, 'yyyy-MM-dd HH:mm:ss'),
      });
    }
  }

  showDateTimePicker(timetype: string) {
    this.setState({
      timetype,
      isDateTimePickerVisible: true,
    });
  }

  hideDateTimePicker() {
    this.setState({
      isDateTimePickerVisible: false,
    });
  }

  renderItem(item: any) {
    return (
      <CardItem>
        <Text>{item.text}</Text>
      </CardItem>
    );
  }

  onProjectSelect(value: string) {
    this.setState({
      selectedProject: value
    });
  }

  render() {
    const item = this.state.dataset;
    const PickerItem = Picker.Item;

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
              <Calendar
                onDayPress={this.handleDatePicked}
                monthFormat={'yyyy年M月'}
                minDate={Formatter(Date(), 'yyyy-MM-dd')}
                markedDates={{[this.state.selected]: {selected: true}}}
                style={{
                  height: 350
                }}
                theme={{
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#00adf5',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  monthTextColor: 'blue'
                }}
              />
            </CardItem>
          </Card>
          <DateTimePicker
            mode={'time'}
            titleIOS={'选择时间'}
            cancelTextIOS={'取消'}
            confirmTextIOS={'确定'}
            is24Hour={true}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <Card style={{marginBottom: 20}}>
            <List>
              <ListItem>
                <Left>
                  <Text>开始时间</Text>
                </Left>
                <Right>
                  <TouchableOpacity onPress={() => {this.showDateTimePicker('starttime')}}>
                    <Text>{this.state.starttime}</Text>
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>结束时间</Text>
                </Left>
                <Right>
                  <TouchableOpacity onPress={() => {this.showDateTimePicker('endtime')}}>
                    <Text>{this.state.endtime}</Text>
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <ListItem last>
                <Left>
                  <Text>项目</Text>
                </Left>
                <Right>
                  <Picker
                    supportedOrientations={['portrait','landscape']}
                    mode="dropdown"
                    selectedValue={this.state.selectedProject}
                    onValueChange={this.onProjectSelect.bind(this)}
                    style={{height: 20}}
                  >
                    {
                      this.props.projects.map(project => (
                        <PickerItem label={project.pro_name} value={project.ida_project} />
                      ))
                    }
                  </Picker>
                </Right>
              </ListItem>
            </List>
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
}

const mapStateToProps = (state) => {
  return {
    projects: state.mine.projects,
    error: state.resources.error,
    fetching: state.resources.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSetFacProj: (item_id, proj_id, start_time, end_time) => dispatch(Actions.setFacProjRequest(item_id, proj_id, start_time, end_time)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceScreen);
