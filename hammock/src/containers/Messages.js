'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button,
    Image,
  }from 'react-native'
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/homeActions'


import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')




class Messages extends React.Component {

  componentDidMount () {
    this.setTimeout(() => {},2500)
  }
  render () {
    return (
      <View style={styles.container}>
          <View style={styles.content}>
              <Text style={styles.contentTitle}>reddit • 134d</Text>
              <Text style={styles.contentText}>hello, /u/wheatlala!Welcome to reddit! Hello!</Text>
          </View>
          <View style={styles.empty}>
              <Image style={styles.emptyImage} source={require('../assets/img/NavLogo.png')} />
              <Text style={styles.emptyText}>Wow, such empty</Text>
          </View>
     </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F6F6',
    flex:1,
  },
  content: {
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    borderBottomWidth:1,
    borderBottomColor: '#EEE',
  },
  contentTitle: {},
  contentText: {},
  empty: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  emptyImage: {
    width: 50,
    height: 50,
  },
  emptyText: {
    marginTop: 10
  },
})

// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(Messages.prototype, TimerMixin)


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



export default connect(mapStateToProps, mapDispatchToProps)(Messages)
