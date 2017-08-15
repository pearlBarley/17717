import { combineReducers } from 'redux';
// import { NavigationActions } from 'react-navigation';
// import { AppNavigator } from '../navigation/navigators';
// import mutationTypes from './mutation-types'
import nav from  './nav'
import signup from './signup'
import signin from './signin'


const AppReducer = combineReducers({
  nav,
  signup,
  signin,
  
});

export default AppReducer;
