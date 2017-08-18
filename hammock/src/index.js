'use strict'

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import configureStore from './store/configureStore'
import Navigators from './navigation/navigators';
import reducers from './reducers';
import storage, { MyStorage } from './storage/storage';
import breadFetch, { fetch } from './util/bread-fetch'

//保证全局唯一new Storage
global.storage = storage

global.fetch = fetch

//fetch拦截器 检验token url带上token
breadFetch.interceptors.push((req, next) => {
  // let token = getURLParameter('token')
  // if (openid !== null && openid !== '') {
  console.log('11111111111111111111111111111111')
  debugger
  if (req.url.includes('/api/login') || req.url.includes('/api/signup')) {next() ;return}
  console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
  MyStorage.load('login-token',(token)=>{
      console.log('login-token',token)
      if (req.url.includes('?')) {
        req.url = req.url + '&token=' + token
      } else {
        req.url = req.url + '?token=' + token
      }
      next()
    },() => {
      console.log('not found token, please login')
      //dispatch(NavigationActions.navigate({ routeName: 'login_page', params: {}}))
      NavigationActions.navigate({ routeName: 'login_page', params: {}})
    },() => {
      console.log('token expire')
      NavigationActions.navigate({ routeName: 'login_page', params: {}})
    })

})
breadFetch.interceptors.push((req, next) => {
  console.log('22222222222222222222222222222222222222222222')
  next()
  return
})
breadFetch.interceptors.push((req, next) => {
  console.log('3333333333333333333333333333333333333333')
  next()
  return  
})
// fetch.interceptors.push((req, next) => {
//   next(res => {
//     if (res.body.code === 302) {
//       window.location = res.body.uri
//     }
//   })
// })

//获取url某个参数值
function getURLParameter (urlParams) {
  return decodeURIComponent((new RegExp('[?|&]' + urlParams + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null
}




class index extends React.Component {

  store = configureStore(reducers)

  render() {
    return (
      <Provider store={this.store}>
          <Navigators />
      </Provider>
    );
  }
}

export default index;

