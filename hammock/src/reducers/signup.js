'use strict'

import createReducer from './create-reducer'
import { SIGNUP } from './mutation-types'

const initialState = {
  loaded: false,
  email: '',
  username: '',
  password: '',
  operation: {
      type: '',    // get / add / update / delete
      name: '',    // 中文名称
      result: false,   // 操作成功或失败
      msg: ''      // 错误信息
  }
}

const actionHandler = {
  [SIGNUP.CHANGE_EMAIL]: (state, action) => {
    return {
        email: action.email
    }
  },
  [SIGNUP.CHANGE_NAME]: (state, action) => {
    return {
        name: action.name
    }
  },
  [SIGNUP.CHANGE_PASSWORD]: (state, action) => {
    return {
        password: action.password
    }
  },
  [SIGNUP.SIGNUP_RESULT]: (state, action) => {
    console.log('state',state)
    console.log('action',action)
    return {
        // cateList: action.data,
        operation: {
            type: 'post',
            name: '注册',
            result: action.success,
            msg: action.success ? '注册成功': '注册失败'
        }
        
    }
  },
}

export default createReducer(initialState, actionHandler)


