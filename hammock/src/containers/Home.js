'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView 
  }from 'react-native'
import { NavigationActions } from 'react-navigation';
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


class Home extends React.Component {

  componentDidMount () {
    this.setTimeout(() => {},2500)
  }
  render () {
    const { navigate, dispatch } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
            <Text>Tab title:{this.props.title} name:{this.props.name}</Text>
            <Text>Tab data:{this.props.data}</Text>
            <Button onPress={Actions.pop} title='Back' />
            <Button onPress={() => { dispatch(NavigationActions.navigate({ routeName: 'tab_inbox' })) }} title='Switch to tab_inbox' /> 
            <Button onPress={() => { dispatch({ type: 'Login' }) }} title='dispatch Login' /> 
            <Button onPress={() => navigate('tab_inbox')} title='Switch to tab_inbox' /> 

      </ScrollView>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(Home.prototype, TimerMixin)


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



export default connect(mapStateToProps, mapDispatchToProps)(Home)
