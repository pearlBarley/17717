'use strict'

import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigation/navigators';
import createReducer from './create-reducer'
import mutationTypes from './mutation-types'


// Start with two routes: The Main screen, with the Login screen on top.
// 导航器可以通过重写router.getActionForPathAndParams来指定自定义URI处理，以输出相关的导航操作，
// 并在router.getStateForAction中处理该操作。
// getActionForPathAndParams返回一个可选配置的navigation action,在用户导航到这个路径并且有可选的查询参数的时候使用这个action.
// const firstAction = AppNavigator.router.getActionForPathAndParams('tab_home');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('popular');
// const initialNavState = AppNavigator.router.getStateForAction(
//   secondAction,
//   tempNavState
// );
// const initialNavState = tempNavState

export default function nav(state = undefined, action) {
  // debugger
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}




// const initialState = undefined

// const actionHandler = {
//   [mutationTypes.SIGNIN.LOGIN]: (state, action) => {
//     return AppNavigator.router.getStateForAction(
//               NavigationActions.back(),
//               state
//            );
//   },
//   [mutationTypes.SIGNIN.LOGOUT]: (state, action) => {
//     return AppNavigator.router.getStateForAction(
//               NavigationActions.navigate({ routeName: 'Login' }),
//               state
//            );
//   },

// }

// nav比较特殊，不适用createReducer函数
// export default createReducer(initialState, actionHandler)