
'use strict'

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigation/navigators';
import { POST } from '../reducers/mutation-types'
import config from '../config/config'
import { MyStorage } from '../storage/storage'

//创建新帖
export function createPost (title, content) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        // const { username } = getState();
        let params = { title, content }
        console.log('params',params)
        //fetch('http://192.168.1.126:8999/api/test').then((res)=>{console.log(res)})
        fetch(`${config.host}:${config.port}/api/createPost`, {
          method: 'post',
          headers: {
            //'Accept': 'application/json, text/plain, */\*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify(params),
          // credentials: "same-origin"
        })
        // .then(res=>res.json()) 
        .then((data) => {
              console.log('data',data)
              dispatch(createResult(data.success))
              resolve(data.data)
        })
        .catch((err) => {  
          console.warn(err);  
        })
        .done();
    })
  }
}

export function createResult (success) {
  return {
    type: POST.CREATEPOST_RESULT,
    success: success
  }
}



//获取postdetail
export function getpostDetail (postid) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        fetch(`${config.host}:${config.port}/api/getpostDetail?postid=${postid}`)
        // .then(res=>res.json()) 
        .then((data) => {
              dispatch(getPostDetailResult(data))
              resolve()
        })
        .catch((err) => {  
          console.warn(err);  
        })
        .done();
    })
  }
}

export function getPostDetailResult (data) {
  return {
    type: POST.GETPOSTDETAIL_RESULT,
    data: data
  }
}

