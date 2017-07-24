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
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
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
                      <Scene key="echo" back clone component={EchoView} getTitle={({navigation}) => navigation.state.key}/>
                      <Scene key="mainframe" initial gestureEnabled={false} tabs tabBarStyle={styles.tabBarStyle} activeBackgroundColor='#ddd' >
                          <Scene key="tab_home" initial title="tab_home" tabBarLabel="tab_home" icon={TabIcon} iconName={'tab_home'} navigationBarStyle={{backgroundColor: 'red'}} titleStyle={{color: 'white'}} >
                            <Scene
                              key="home"
                              component={Home}
                              title="Home"
                              onRight={() => alert('Right button')}
                              rightTitle="Right"
                              initial
                            />
                            <Scene
                              key="popular"
                              component={Popular}
                              title="popular"
                              back
                              titleStyle={{color: 'black'}}
                            />
                          </Scene>
                          <Scene key="tab_search" component={Search} title="search" icon={TabIcon} iconName={'search'}/>
                          <Scene key="tab_inbox"  title="inbox" icon={TabIcon} iconName={'inbox'}>
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
                              back
                              onBack={() => alert('onBack button!')}
                              backTitle="Back!"
                              panHandlers={null}
                            />
                          </Scene>
                          <Scene key="tab_personalinfo" component={PersonalInfo} title="personalinfo" hideNavBar icon={TabIcon} iconName={'personalinfo'}/>
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

