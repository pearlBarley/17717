'use strict'

import React from 'react';
import { 
  AppRegistry,
  StyleSheet
 } from 'react-native';
import { Provider } from 'react-redux';
import {
    Router,
    Scene
  } from 'react-native-router-flux'

import Icon from 'react-native-vector-icons/FontAwesome'
import configureStore from './store/configureStore'

import TabIcon from './components/TabIcon'
import Drawer from './containers/Drawer'
import Home from './containers/Home'
import Popular from './containers/Popular'
import Search from './containers/Search'
import Notifications from './containers/Notifications'
import Messages from './containers/Messages'
import PersonalInfo from './containers/PersonalInfo'
import Error from './containers/Error'
import EchoView from './containers/EchoView'

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: 'red',
    color:'#000'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: 'red'
  },
});

class index extends React.Component {

  store = configureStore()

  render() {
    return (
      <Provider store={this.store}>
          <Router sceneStyle={{ backgroundColor: 'white' }}>
             <Scene key="modal" modal hideNavBar>
              <Scene key="drawer" drawer contentComponent={Drawer}>
                  <Scene key="root" hideNavBar hideTabBar>
                      <Scene key="echoview" back clone component={EchoView} getTitle={({navigation}) => navigation.state.key}/>
                      <Scene key="mainframe" hideNavBar initial gestureEnabled={false} tabs tabBarPosition="bottom" tabBarStyle={styles.tabBarStyle} activeBackgroundColor='#ddd' >
                          <Scene key="tab_home" hideNavBar  gestureEnabled={false} title="tab_home" tabBarLabel="tab_home" >
                            <Scene
                              key="home"
                              tabBarLabel="home"
                              tabs={true}
                              wrapRouter={true}
                              initial
                              tabBarPosition="top"
                              
                               >
                                <Scene key="tab_search2" hideNavBar tabBarLabel="howwme1" component={Search} title="search12" />
                                <Scene key="tab_search3" hideNavBar tabBarLabel="howwme2" component={Search} title="search3" />


                            </Scene>
                            <Scene
                              key="popular"
                              component={Popular}
                              title="popular"
                              gestureEnabled={false} 
                              title="popular" 
                              tabBarLabel="popular" 
                              icon={TabIcon} 
                              iconName={'popular'}
                            />
                          </Scene>
                          <Scene key="tab_search" hideNavBar component={Search} title="search" icon={TabIcon} iconName={'search'}/>
                          <Scene key="tab_inbox"  hideNavBar title="inbox" icon={TabIcon} iconName={'inbox'}>
                            <Scene
                              key="notifications"
                              component={Notifications}
                              title="notifications"
                              initial
                            />
                            <Scene
                              key="messages"
                              component={Messages}
                              title="messages"        
                            />
                          </Scene>
                          <Scene key="tab_personalinfo" hideNavBar component={PersonalInfo} title="personalinfo" hideNavBar icon={TabIcon} iconName={'personalinfo'}/>
                      </Scene>               
                  </Scene>
              </Scene>
              <Scene key="error" component={Error} />
            </Scene>
          </Router>
      </Provider>
    );
  }
}

export default index;

