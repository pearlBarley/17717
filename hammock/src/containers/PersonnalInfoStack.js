'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    Picker,
    TouchableOpacity,
    Image,
  }from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/homeActions'
import Icon from 'react-native-vector-icons/FontAwesome'


import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')


class PersonnalInfoStack extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sort: "Hot",
      layout: "Card",
      comments: "BEST",
    }
  }
  componentDidMount () {
    this.setTimeout(() => {},2500)
  }
  startConversation () {
    alert(1111)
  }
  render () {
    const { navigate, dispatch } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.multipleChoice}>
            <Picker
              selectedValue={this.state.sort}
              onValueChange={(sort) => this.setState({sort: sort})}
              style={styles.pickerSort}>
              <Picker.Item label="Hot" value="Hot" />
              <Picker.Item label="New" value="New" />
              <Picker.Item label="Top" value="Top" />
              <Picker.Item label="Controversial" value="Controversial" />
            </Picker>
        </View>


      </ScrollView>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(PersonnalInfoStack.prototype, TimerMixin)


function mapStateToProps (state) {
  return {
    deviceVersion: state.device,
    auth: {
      form: {
        isFetching: state.auth
      }
    },
    global: {
      currentState: state.global,
      showState: state.global
    }
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...homeActions }, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PersonnalInfoStack)





/**
 * Style
 */

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F6F6',
  },
  multipleChoice: {
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  pickerSort: {
    flex: 8,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    height: 30,
  },       
})
