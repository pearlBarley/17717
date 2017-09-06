'use strict'

import createReducer from './create-reducer'
import { COMMENT } from './mutation-types'

const initialState = {
  loaded: false,
  operation: {
      type: '',    // get / add / update / delete
      name: '',    // 中文名称
      result: false,   // 操作成功或失败
      msg: ''      // 错误信息
  }
}

const actionHandler = {
  [COMMENT.ADD_COMMENT_RESULT]: (state, action) => {
    return {
        // cateList: action.data,
        operation: {
            type: 'comment',
            name: '创建帖子',
            result: action.success,
            msg: ''
        }
    }   
  },
}

export default createReducer(initialState, actionHandler)