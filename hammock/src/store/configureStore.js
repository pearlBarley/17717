
'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
// import reducers from '../reducers'
import { createLogger } from 'redux-logger'
import asyncHandle from '../middlewares/asyncHandleMiddleware'

// let isDebuggingInChrome = __DEV__ && !! window.navigator.userAgent;
let logger = createLogger({
  // predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true, //折叠日志
  duration: true,  // 循环打印action
});

// 使用中间件
let middleWares = [thunk, asyncHandle, logger];
const createStoreWithMiddleware = applyMiddleware(...middleWares)(createStore);

export default function configureStore (reducers) {
  return createStoreWithMiddleware(reducers)
}
