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
import { NavigationActions } from 'react-navigation';
import * as homeActions from '../actions/homeActions'
import { SearchBar }  from '../components/SearchBar.js';
import { SubscriptionsList }  from '../components/SubscriptionsList.js';
import SubscriptionsListDemo  from '../components/SubscriptionsListDemo.js';
// let SearchBar_ios = require('react-native-search-bar');
import storage, { MyStorage } from '../storage/storage';

import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')

let styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // this.checkLogin()  //直接请求alphabetList 字母弹出层渲染失败
    setTimeout(()=>this.checkLogin(),0)    //字母不一致
  }
  checkLogin () {
    const { dispatch } = this.props.navigation;
    //dispatch(NavigationActions.navigate({ routeName: 'sign_page', params: {}}))
    MyStorage.load('ifIsInit',(ifIsInit)=>{
      console.log('ifIsInit',ifIsInit)
      if(ifIsInit){
         dispatch(NavigationActions.navigate({ routeName: 'sign_page', params: {}}))
      }
    })
    // MyStorage.load('login-token',(token)=>{
    //   console.log('login-token',token)
    // },() => {
    //   console.log('not found token, please login')
    //   //dispatch(NavigationActions.navigate({ routeName: 'login_page', params: {}}))
    //   dispatch(NavigationActions.navigate({ routeName: 'sign_page', params: {}}))
    // },() => {
    //   console.log('token expire')
    //   dispatch(NavigationActions.navigate({ routeName: 'sign_page', params: {}}))
    // })
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
