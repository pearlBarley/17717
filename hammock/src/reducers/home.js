'use strict'

import createReducer from './create-reducer'
import { HOME } from './mutation-types'

const initialState = {
  loaded: false,
  homePostList: [],
  operation: {
      type: '',    // get / add / update / delete
      name: '',    // 中文名称
      result: false,   // 操作成功或失败
      msg: ''      // 错误信息
  }
}

const actionHandler = {
  [HOME.GETHOMRPOSTS_RESULT]: (state, action) => {
    return {
        homePostList: action.data.data || [],
        operation: {
            type: 'post',
            name: '获取帖子',
            result: action.data.success,
            msg: ''
        }
    }   
  },
}

export default createReducer(initialState, actionHandler)