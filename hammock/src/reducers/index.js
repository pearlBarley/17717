import { combineReducers } from 'redux';
// import { NavigationActions } from 'react-navigation';
// import { AppNavigator } from '../navigation/navigators';
// import mutationTypes from './mutation-types'
import nav from  './nav'
import home from  './home'
import signup from './signup'
import signin from './signin'
import posts from './posts'
import comment from './comment'


const AppReducer = combineReducers({
  nav,
  home,
  signup,
  signin,
  posts,
  comment,
});

export default AppReducer;
