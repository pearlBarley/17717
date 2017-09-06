
'use strict'

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigation/navigators';
import { COMMENT } from '../reducers/mutation-types'
import config from '../config/config'
import { MyStorage } from '../storage/storage'

//创建新帖
export function addComment (postid, content) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        // const { username } = getState();
        let params = { postid, content }
        console.log('params',params)
        //fetch('http://192.168.1.126:8999/api/test').then((res)=>{console.log(res)})
        fetch(`${config.host}:${config.port}/api/addComment`, {
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
              dispatch(addCommentResult(data.success))
              resolve(data.data)
        })
        .catch((err) => {  
          console.warn(err);  
        })
        .done();
    })
  }
}

export function addCommentResult (success) {
  return {
    type: COMMENT.ADD_COMMENT_RESULT,
    success: success
  }
}


