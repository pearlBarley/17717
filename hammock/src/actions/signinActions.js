
'use strict'

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigation/navigators';
import { SIGNIN } from '../reducers/mutation-types'
import config from '../config/config'
import { MyStorage } from '../storage/storage'

//注册账户
export function login (username, password) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        // const { username } = getState();
        let params = { username, password }
        console.log('params',params)
        //fetch('http://192.168.1.126:8999/api/test').then((res)=>{console.log(res)})
        fetch(`${config.host}:${config.port}/api/login`, {
          method: 'post',
          headers: {
            //'Accept': 'application/json, text/plain, */\*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify(params)
        })
        // .then(res=>res.json()) 
        .then((data) => {
              console.log('data',data)
              dispatch(signinResult(data.success)) 
              if (data.success) {
                MyStorage.save('login-token',{token: data.token})
                resolve()
                // const resetAction = NavigationActions.reset({
                //   index: 1,
                //   actions: [
                //     NavigationActions.navigate({ routeName: 'Search'}),
                //   ]
                // })
                // dispatch(resetAction)
                //dispatch(NavigationActions.navigate({ routeName: 'login_page', params: {}}))
                
              }
        })
        .catch((err) => {  
          console.warn(err);  
        })
        .done();
    })
  }
}

export function signinResult (success) {
  return {
    type: SIGNIN.SIGNIN_RESULT,
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