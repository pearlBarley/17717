'use strict'

import createReducer from './create-reducer'
import { SIGNIN } from './mutation-types'

const initialState = {
  loaded: false,
  email: '',
  name: '',
  password: '',
  operation: {
      type: '',    // get / add / update / delete
      name: '',    // 中文名称
      result: true,   // 操作成功或失败
      msg: ''      // 错误信息
  }
}

const actionHandler = {
  [SIGNIN.LOGIN]: (state, action) => {
    return {
        // cateList: action.data,
        operation: {
            type: 'post',
            name: '注册',
            result: action.success,
            msg: ''
        }
    }
  },
  [SIGNIN.LOGOUT]: (state, action) => {
    return {
        operation: {
            type: 'post',
            name: '注册',
            result: action.success,
            msg: ''
        }
    }
  },
}

export default createReducer(initialState, actionHandler)