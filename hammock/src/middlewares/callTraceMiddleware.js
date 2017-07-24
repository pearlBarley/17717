/**
 * Created by stefan.wang on 8/23/2016.
 */

// 自定义中间件 callTraceMiddleware
// 功能：追踪函数的调用过程

export default function callTraceMiddleware({dispatch, getState}) {
    return next => action => {
        // console.trace();
        return next(action);
    }
}