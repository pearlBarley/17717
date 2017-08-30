'use strict'

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigation/navigators';
import { HOME } from '../reducers/mutation-types'
import config from '../config/config'
import { MyStorage } from '../storage/storage'

//获取主页post数据
export function getHomePosts (params) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        // const { username } = getState();
        let url = `${config.host}:${config.port}/api/getHomePosts`
        //let params = { pageSize, currentPage }
        let paramsArray = [];  
        //拼接参数  
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
        if (url.search(/\?/) === -1) {  
            url += '?' + paramsArray.join('&')  
        } else {  
            url += '&' + paramsArray.join('&')  
        }  
        fetch(url)
        // .then(res=>res.json()) 
        .then((data) => {
              console.log('getHomePostsResult data',data)
              dispatch(getHomePostsResult(data))
              resolve()
        })
        .catch((err) => {  
          console.warn(err);  
        })
        .done();
    })
  }
}

export function getHomePostsResult (data) {
  return {
    type: HOME.GETHOMRPOSTS_RESULT,
    data: data
  }
}

//投票
export function votePost (params) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        // const { username } = getState();
        let url = `${config.host}:${config.port}/api/votePost`
        fetch(url, {
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
              //dispatch(createResult(data.success))
              resolve(data.data)
        })
        .catch((err) => {  
          console.warn(err);  
        })
        .done();
    })
  }
}
