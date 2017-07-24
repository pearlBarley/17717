'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button
  }from 'react-native'
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/homeActions'


import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')

let styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  }
})


class Notifications extends React.Component {

  componentDidMount () {
    this.setTimeout(() => {},2500)
  }
  render () {
    return (
      <View style={styles.container}>
            <Text>Tab title:{this.props.title} name:{this.props.name}</Text>
            <Text>Tab data:{this.props.data}</Text>
            <Button onPress={Actions.pop} title='Back' />
            <Button onPress={() => { Actions.mainframe({ data: 'mainframe!' }); }} title='Switch to mainframe' /> 
            <Button onPress={() => { Actions.tab_home({ data: 'tab_home!' }); }} title='Switch to tab_home' /> 
            <Button onPress={() => { Actions.popular({ data: 'popular!' }); }} title='Switch to popular' /> 
            <Button onPress={() => { Actions.home({ data: 'home!' }); }} title='Switch to home' /> 
            <Button onPress={() => { Actions.tab_search({ data: 'tab_search!' }); }} title='Switch to tab_search with data' /> 
            <Button onPress={() => { Actions.tab_inbox({ data: 'tab_inbox!' }); }} title='Switch to tab_inbox' /> 
            <Button onPress={() => { Actions.notifications({ data: 'notifications!' }); }} title='Switch to notifications' /> 
            <Button onPress={() => { Actions.messages({ data: 'messages!' }); }} title='Switch to messages' /> 
            <Button onPress={() => { Actions.tab_personalinfo({ data: 'tab_personalinfo!' }); }} title='Switch to tab_personalinfo' /> 
            <Button onPress={() => { Actions.error({ data: 'error!' }); }} title='Switch to error' /> 

      </View>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(Notifications.prototype, TimerMixin)


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



export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
