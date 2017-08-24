'use strict'

import createReducer from './create-reducer'
import { POST } from './mutation-types'

const initialState = {
  loaded: false,
  postDetail: {},
  operation: {
      type: '',    // get / add / update / delete
      name: '',    // 中文名称
      result: false,   // 操作成功或失败
      msg: ''      // 错误信息
  }
}

const actionHandler = {
  [POST.CREATEPOST_RESULT]: (state, action) => {
    return {
        // cateList: action.data,
        operation: {
            type: 'post',
            name: '创建帖子',
            result: action.success,
            msg: ''
        }
    }   
  },
  [POST.GETPOSTDETAIL_RESULT]: (state, action) => {
     return {
        postDetail: action.data.data,
        operation: {
            type: 'post',
            name: '创建帖子',
            result: action.data.success,
            msg: ''
        }
     }
  },
}

export default createReducer(initialState, actionHandler)