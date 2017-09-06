'use strict'

import createReducer from './create-reducer'
import { COMMENT } from './mutation-types'

const initialState = {
  loaded: false,
  commentData: [],
  operation: {
      type: '',    // get / add / update / delete
      name: '',    // 中文名称
      result: false,   // 操作成功或失败
      msg: ''      // 错误信息
  }
}

const actionHandler = {
  [COMMENT.GET_COMMENT_RESULT]: (state, action) => {
    return {
        commentData: action.data.data,
        operation: {
            type: 'comment',
            name: '获取评论',
            result: action.success,
            msg: ''
        }
    }   
  },
  [COMMENT.ADD_COMMENT_RESULT]: (state, action) => {
    return {
        // cateList: action.data,
        operation: {
            type: 'comment',
            name: '添加评论',
            result: action.success,
            msg: ''
        }
    }   
  },
}

export default createReducer(initialState, actionHandler)