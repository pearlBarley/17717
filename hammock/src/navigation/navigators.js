'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator, TabRouter } from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome'

import TabIcon from '../components/TabIcon'
import Drawer from '../containers/Drawer'
import Home from '../containers/Home'
import Popular from '../containers/Popular'
import Search from '../containers/Search'
import Notifications from '../containers/Notifications'
import Messages from '../containers/Messages'
import PersonalInfo from '../containers/PersonalInfo'
import Error from '../containers/Error'
import EchoView from '../containers/EchoView'


// import LoginScreen from './components/LoginScreen';
// import MainScreen from './components/MainScreen';
// import ProfileScreen from './components/ProfileScreen';

// export const AppNavigator = StackNavigator({
//   Main: { screen: MainScreen },
//   Login: { screen: LoginScreen },
//   Profile: { screen: ProfileScreen },
// });



const HomeContainer = TabNavigator(
  {
    home: { screen: Home },
    popular: { screen: Popular }
  },
  {
    lazy: true,
    tabBarPosition: 'top',
    swipeEnabled: false,
    lazyLoad: true,
    animationEnabled: false,
  }
);


const InboxContainer = TabNavigator(
  {
    notifications: { screen: Notifications },
    messages: { screen: Messages }
  },
  {
    lazy: true,
    tabBarPosition: 'top'
  }
);

export const AppNavigator = TabNavigator(
  {
    tab_home: { screen: HomeContainer },
    tab_search: { screen: Search },
    tab_inbox: { screen: InboxContainer },
    tab_personalinfo: { screen: PersonalInfo }
  },
  {
    lazy: true,
    swipeEnabled: false,
    lazyLoad: true,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#3e9ce9',
      inactiveTintColor: '#999999',
      showIcon: true,
      style: {
        backgroundColor: '#fff'
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0
      }
    }
  }
);



// const AppWithNavigationState = ({ dispatch, nav }) => (
//   <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
// );

class AppWithNavigationState extends React.Component {
  render() {
    return (
      <AppNavigator 
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
      	})}
  	  />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
