'use strict'

import React from 'react';
import { StyleSheet, Image, View, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator, DrawerNavigator, TabRouter } from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
import PostsDetail from '../containers/PostsDetail'
import PersonnalInfoStack from '../containers/PersonnalInfoStack'
import SignPage from '../containers/SignPage'
import SignupPage from '../containers/SignupPage'
import SigninPage from '../containers/SigninPage'
import PostCreate from '../containers/PostCreate'
import CommentAdd from '../containers/CommentAdd'

// import LoginScreen from './components/LoginScreen';
// import MainScreen from './components/MainScreen';
// import ProfileScreen from './components/ProfileScreen';

// export const AppNavigator = StackNavigator({
//   Main: { screen: MainScreen },
//   Login: { screen: LoginScreen },
//   Profile: { screen: ProfileScreen },
// });
const BOTTOM_ICON_SIZE = 24
const TOP_ICON_SIZE = 22

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  headerRight: {
    marginRight: 15,
  },
  headerLeft: {
    marginLeft: 15,
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
    // lazyLoad: true,
    tabBarPosition: 'top',
    // swipeEnabled: false,   
    // animationEnabled: false,
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
        height: 40,
        borderBottomWidth:1,
        borderBottomColor: '#EEE',
      }
    }
  }
);

//nested tabs inbox
const InboxNestedTabs = TabNavigator(
  {
    notifications: { screen: Notifications },
    messages: { screen: Messages }
  },
  {
    initialRouteName: 'notifications',
    lazy: true,
    tabBarPosition: 'top',
    // lazyLoad: true,
    // swipeEnabled: false,
    // animationEnabled: false,
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
        backgroundColor: '#fff',
      },
      indicatorStyle: {
        backgroundColor: '#60F4F4',
      },
      tabStyle: {
        height: 40,
        borderBottomWidth:1,
        borderBottomColor: '#EEE',
      }
    }
  }
);

const InboxContainer = StackNavigator({
   inbox_nested_tabs: {
     screen: InboxNestedTabs,
     navigationOptions: { 
       title: 'Inbox',
       headerRight: (<Icon name="envelope-open-o" size={TOP_ICON_SIZE} color= '#AAAAAA' style={styles.headerRight} />),
       headerLeft: (<Icon name="pencil" size={TOP_ICON_SIZE} color= '#AAAAAA' style={styles.headerLeft} />),
       headerStyle: {
         height: 40,
       },
       headerTitleStyle: {
         //  textAlign: 'center',
         alignSelf: 'center',
         fontSize: 16,
       },
       headerTintColor: '#000',
     }
  }
})


//PersonalInfo container
const PersonalInfoContainer = StackNavigator({
   personnal_info: {
     screen: PersonalInfo,
     navigationOptions: ({ navigation }) => ({ 
       title: 'wheatlala',
       headerRight: (<Ionicons name="ios-settings" size={TOP_ICON_SIZE} color= '#AAAAAA' style={styles.headerRight} />),
       headerStyle: {
         height: 40,
       },
       headerTitleStyle: {
         alignSelf: 'center',
         fontSize: 16,
       },
       headerTintColor: '#000',
     })
  }  
})  

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
      <Icon name="home" size={BOTTOM_ICON_SIZE} color= {tintColor} />
    ),
});

Search.navigationOptions = {
    title: 'Search',
    tabBarLabel: 'Search',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="search" size={BOTTOM_ICON_SIZE} color= {tintColor} />
    ),
}

InboxContainer.navigationOptions = {
    title: 'Inbox',
    tabBarLabel: 'Inbox',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="inbox" size={BOTTOM_ICON_SIZE} color= {tintColor} />
    ),
}

PersonalInfoContainer.navigationOptions = {
    title: 'Me',
    tabBarLabel: 'Me',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={BOTTOM_ICON_SIZE} color= {tintColor} />
    ),
}


//底部导航
const bottomNavigator =  TabNavigator(
  {
    tab_home: { screen: HomeContainer },
    tab_search: { screen: Search },
    tab_inbox: { screen: InboxContainer },
    tab_personalinfo: { screen: PersonalInfoContainer }
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
        marginTop: 0,
      },
      labelStyle: {
        fontSize:11,
        marginTop: -3,
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
        height: 40,
      }
    }
  }
);


const pageNavigator = StackNavigator({
    bottom_navigator: {
      screen: bottomNavigator,
    },
    create_post: {
      path: 'createPost/:title',
      screen: PostCreate,
    },
    posts_detail: {
      path: 'detail/:postid',
      screen: PostsDetail,
    },
    comment_add: {
      path: 'commentadd/:postid',
      screen: CommentAdd,
    },
    personnal_info_stack: {
      path: 'personnalinfo/:stackname',
      screen: PersonnalInfoStack,
    //   navigationOptions: ({ navigation }) => ({ 
    //    title: `${navigation.state.params.stackname}`,
    //    headerStyle: {
    //      height: 40,
    //    },
    //    headerTitleStyle: {
    //      alignSelf: 'center',
    //      fontSize: 16,
    //    },
    //    headerTintColor: '#000',
    //  })
    },
    sign_page: {
      screen: SignPage,
    },
    signup_page: {
      screen: SignupPage,
    },
    signin_page: {
      screen: SigninPage,
    },

  },
  {
    // navigationOptions: {
    //   header: null,
    // },
    navigationOptions: ({ navigation }) => {
      // const headerVisible = navigation.state.params && navigation.state.params.headerVisible;
      // const headerVisible = navigation.state.params.headerVisible || true;
      // console.log('navigation',navigation)
      // const headerVisible = navigation.state.routeName === 'posts_detail'; //posts_detail 时显示标题栏     
      let headerVisible = false
      let title = ''
      let headerRight = []
      let headerLeft = []
      let headerTitleStyle = {fontSize: 16,}
      switch (navigation.state.routeName) {
        case 'posts_detail':
                headerVisible = true
                title = 'post detail'
                headerRight = (<Icon name="ellipsis-h" size={22} color= '#AAAAAA' style={styles.headerRight} />)
             break
        case 'personnal_info_stack':
                headerVisible = true
                title = `${navigation.state.params.stackname}`
                headerTitleStyle.alignSelf = 'center'
             break
        case 'create_post':
                headerVisible = true
                title = `${navigation.state.params.title}`
                headerTitleStyle.alignSelf = 'center'
                headerRight = (<Text onPress={navigation.state.params.createPost} style={{color: '#5685CC',marginRight:15}}>POST</Text>)
                headerLeft = (<Icon name="ellipsis-h" size={22} color= '#AAAAAA' style={styles.headerRight} />)
             break
        case 'comment_add':
                headerVisible = true
                title = `${navigation.state.params.title}`
                headerTitleStyle.alignSelf = 'center'
                headerRight = (<Text onPress={navigation.state.params.addComment} style={{color: '#5685CC',marginRight:15}}>SEND</Text>)
                headerLeft = (<Icon name="ellipsis-h" size={22} color= '#AAAAAA' style={styles.headerRight} />)
             break
        default:

      }
      return {
        header: headerVisible ? undefined : null,
        title: title,
        headerRight: headerRight,
        // headerLeft: headerLeft,
        headerStyle: {
          height: 40,
        },
        headerTitleStyle: headerTitleStyle,
        headerTintColor: '#000',
      };

    }

  }

);

//主框架
export const AppNavigator = DrawerNavigator({
    page_navigator: {
      screen: pageNavigator,
    },
    drawer: {
      screen: Drawer
    }
  },
  {
    initialRouteName: 'page_navigator',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    navigationOptions: {
      drawerLabel: 'drawer',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/img/hamburger.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    }
  }
);






// AppNavigator.navigationOptions = ({ navigation }) => {
//   // const headerVisible = navigation.state.params && navigation.state.params.headerVisible;
//   // const headerVisible = navigation.state.params.headerVisible || true;
//   console.log('navigation',navigation)
//   const headerVisible = navigation.state.routeName === 'posts_detail'; //posts_detail 时显示标题栏
//   return {
//     header: headerVisible ? undefined : null,
//     title: 'Now you see me',
//   };
// };


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
