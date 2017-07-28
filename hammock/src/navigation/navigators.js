'use strict'

import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
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

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

//nested tabs home
const HomeContainer = TabNavigator(
  {
    home: { screen: Home },
    popular: { screen: Popular }
  },
  {
    initialRouteName: 'home',
    lazy: true,
    tabBarPosition: 'top',
    swipeEnabled: false,
    lazyLoad: true,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: '#60F4F4',
      inactiveTintColor: '#AAAAAA',
      activeBackgroundColor : '#fff',
      inactiveBackgroundColor : '#fff',
      showLabel: true,
      pressOpacity: 0.5,
      labelStyle: {
        fontSize: 10,
      },
      style: {
        // backgroundColor: 'transparent'
        backgroundColor: '#fff',
        // marginLeft: 20,
        // marginRight: 20,
      },
      indicatorStyle: {
        backgroundColor: '#60F4F4',
      },
      tabStyle: {
        // padding: 0,
      }
    }
  }
);

//nested tabs inbox
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


//设置各个tab导航图标，文字
HomeContainer.navigationOptions = ({ navigation }) => ({
    // title: `Chat with ${navigation.state.params.user}`,
    title: 'Home',
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      /*<Image
        source={require('../assets/img/f8-logo.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />*/ 
      <Icon name="home" size={26} color= {tintColor} />
    ),
});

Search.navigationOptions = {
    title: 'Search',
    tabBarLabel: 'Search',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="search" size={26} color= {tintColor} />
    ),
}

InboxContainer.navigationOptions = {
    title: 'Inbox',
    tabBarLabel: 'Inbox',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="inbox" size={26} color= {tintColor} />
    ),
}

PersonalInfo.navigationOptions = {
    title: 'Me',
    tabBarLabel: 'Me',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={26} color= {tintColor} />
    ),
}


//主框架
export const AppNavigator = TabNavigator(
  {
    tab_home: { screen: HomeContainer },
    tab_search: { screen: Search },
    tab_inbox: { screen: InboxContainer },
    tab_personalinfo: { screen: PersonalInfo }
  },
  {
    initialRouteName: 'tab_home',
    order: ['tab_home','tab_search','tab_inbox','tab_personalinfo'],
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'initialRoute',
    paths: {
      tab_home: 'tab_home',
      tab_search: 'tab_search',
      tab_inbox: 'tab_inbox',
      tab_personalinfo: 'tab_personalinfo'    
    },
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#FF5555',
      inactiveTintColor: '#AAAAAA',
      activeBackgroundColor : '#fff',
      inactiveBackgroundColor : '#fff',
      showLabel: true,
      upperCaseLabel: false,
      pressColor: '#EE9C66',
      pressOpacity: 0.5,
      showIcon: true,
      iconStyle: {
      },
      labelStyle: {
        fontSize:12,
      },
      style: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0,
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
