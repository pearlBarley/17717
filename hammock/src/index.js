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
  console.log('interceptors1')
  if (req.url.includes('/api/login') || req.url.includes('/api/signup')) {
      next()
      return
  }
  MyStorage.load('login-token',(tokenObj)=>{
      // console.log('login-token',tokenObj)
      if (! req.options.method || req.options.method.toUpperCase() === 'GET'){
          if (req.url.includes('?')) {
            req.url = req.url + '&token=' + tokenObj.token
          } else {
            req.url = req.url + '?token=' + tokenObj.token
          }
      } else if (req.options.method.toUpperCase() === 'POST') {
          let body = JSON.parse(req.options.body)
          body.token = tokenObj.token
          req.options.body = JSON.stringify(body)
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
  console.log('interceptors2')
  next()
})
breadFetch.interceptors.push((req, next) => {
  console.log('interceptors3')
  next((res, after) => {
    console.log('interceptorsAfter1')
    after()
  }) 
})

breadFetch.interceptors.push((req, next) => {
  console.log('interceptors4')
  next((res, after) => {
    console.log('interceptorsAfter2')
    // if (res.body.code === 302) {
    //   window.location = res.body.uri
    // }
    after()
  })
})

//获取url某个参数值
function getURLParameter (urlParams) {
  return decodeURIComponent((new RegExp('[?|&]' + urlParams + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null
}


//是否是初始加载
// MyStorage.save('ifIsInit',true)

// storage.remove({key:'login-token'})

//初始检测有无login-token，检测是否是初始加载
MyStorage.load('login-token',(token)=>{
    console.log('login-token',token)
    MyStorage.save('ifIsInit',false)
  },() => {
    console.log('not found token, please login')
    //dispatch(NavigationActions.navigate({ routeName: 'login_page', params: {}}))
    MyStorage.save('ifIsInit',true)
    //NavigationActions.navigate({ routeName: 'sign_page', params: {}})
  },() => {
    console.log('token expire')
    MyStorage.save('ifIsInit',true)
    //NavigationActions.navigate({ routeName: 'sign_page', params: {}})
  })



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

