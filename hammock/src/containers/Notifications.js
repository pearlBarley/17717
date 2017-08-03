'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button,
    Picker,
    Image
  }from 'react-native'
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/homeActions'


import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')



class Notifications extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      sort: "All Notifications",
    }
  }
  componentDidMount () {
    this.setTimeout(() => {},2500)
  }
  render () {
    return (
      <View style={styles.container}>
          <View style={styles.multipleChoice}>
            <Picker
              selectedValue={this.state.sort}
              onValueChange={(sort) => this.setState({sort: sort})}
              style={styles.pickerSort}>
              <Picker.Item label="All Notifications" value="All Notifications" />
              <Picker.Item label="Comment Replies" value="Comment Replies" />
              <Picker.Item label="Post Replies" value="Post Replies" />
              <Picker.Item label="Username Mentions" value="Username Mentions" />
            </Picker>
          </View>
          <View style={styles.content}>
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
  multipleChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  pickerSort: {
    flexBasis: 160,
    height: 30,
  },
  content: {},
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
