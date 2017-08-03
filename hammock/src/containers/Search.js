'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button,
    Platform,
  }from 'react-native'
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/homeActions'
import { SearchBar }  from '../components/SearchBar.js';
import { SubscriptionsList }  from '../components/SubscriptionsList.js';
import SubscriptionsListDemo  from '../components/SubscriptionsListDemo.js';
// let SearchBar_ios = require('react-native-search-bar');

import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')

let styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'stretch',
    backgroundColor: '#fff',
  },
})


class Search extends React.Component {
  
  constructor(props) {
        super(props)
        this.state = {
        };
  }
  componentDidMount () {
    this.setTimeout(() => {},2500)
  }

  doSearch(val) {
    alert(val)
  }

  render () {
    // if(Platform.OS == 'ios'){
    let search__Bar = <SearchBar onSearch={(val)=> {this.doSearch(val)}}/>;

    return (
      <View style={styles.container}>
         {search__Bar}
         <SubscriptionsList />
         {/*<SubscriptionsListDemo />*/}
      </View>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(Search.prototype, TimerMixin)


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



export default connect(mapStateToProps, mapDispatchToProps)(Search)
