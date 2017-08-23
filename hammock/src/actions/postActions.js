
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
              resolve()
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
    type: POST.CREATE_RESULT,
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