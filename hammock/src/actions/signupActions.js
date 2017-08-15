
'use strict'

import { SIGNUP } from '../reducers/mutation-types'
import config from '../config/config'
//export var changeEmail = (email) => {
export function changeEmail (email) {
  return {
    type: SIGNUP.CHANGE_EMAIL,
    email: email
  }
}
export function changeName (name) {
  return {
    type: SIGNUP.CHANGE_NAME,
    name: name
  }
}
export function changePassword (password) {
  return {
    type: SIGNUP.CHANGE_PASSWORD,
    password: password
  }
}

//注册账户
export function createAccount (email, username, password) {
  return (dispatch) => {
    let params = { email, username, password }
    //fetch('http://192.168.1.126:8999/api/test').then((res)=>{console.log(res)})
    fetch(`${config.host}:${config.port}/api/signup`, {
      method: 'post',
      headers: {
        //'Accept': 'application/json, text/plain, */\*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(params)
    })
    .then(res=>res.json())
    .then(res => {
          console.log(res)
          // if(res.success){
          //   dispatch(signupSuccess(res)
          // } else {

          // }
          dispatch(signupResult(res.success))
    });
  }
}

export function signupResult (success) {
  return {
    type: SIGNUP.SIGNUP_RESULT,
    success: success
  }
}

    // let url = `${this.host}/home/${api}?brandName=${this.brandName}`

    // fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         let tmpData = data;
    //         cacheData[api] = tmpData;
    //         resolve(tmpData);
    //     })
    //     .catch((error) => {
    //         // console.warn('getDataFromServererror:',error)
    //         reject(error);
    //     });