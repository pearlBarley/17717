/**
 * Created by stefan.wang on 8/26/2016.
 */

// 自定义中间件 asyncHandleMiddleware
// 功能：专门负责进行异步处理的中间件

export default function asyncHandleMiddleware({dispatch, getState}) {
    return next => action => {
        // 根据情况，可在这dispatch指定的action
        // dispatch(action());

        // console.log("------------------------")
        // console.log(getState())
        // let state = getState();
        // if (state.showSlide.operation.msg == "Didn't login in!") {
        //     window.location.href = "http://vsc.selmif.com";
        // }

        switch (action.type) {
            case "MENU_CUT":
                return next(action);
            default:
                return next(action);
        }
    }
}