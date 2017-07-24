/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Image
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import MainScreenNavigator from './src/home';
import Drawer from './src/drawer';

class Home extends Component {
  static navigationOptions = {
    title: 'Welcome',
    headerRight: <Button title="Info" />,
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Button
          onPress={() => navigate('Chat',{ user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

class ChatScreen extends Component {
  // static navigationOptions = ({navigation}) => ({
  //   title: `Chat with Lucy ${navigation.state.params.user}`,
  // });
  render() {
    const { navigate, state : { params : par } } = this.props.navigation;
    return (
      <View>
        <Text>Chat with Lucy {par.user}</Text>
        <Button
          onPress={() => navigate('MainScreenNavigator')}
          title="MainScreenNavigator"
        />
        <Button
          onPress={() => navigate('DrawerOpen')}
          title="DrawerOpen"
        />
        <Button
          onPress={() => navigate('DrawerClose')}
          title="DrawerClose"
        />
      </View>
    );
  }
}
// debugger
const hammock = StackNavigator({
  Home: { screen: Home },
  Chat: { screen: ChatScreen, path: 'people/:user', navigationOptions: ({navigation}) => ({
      title: `Chat with Lucy ${navigation.state.params.user}`,
    }), },
  MainScreenNavigator: { screen: MainScreenNavigator },
  Drawer: { screen: Drawer }
});



// AppRegistry.registerComponent('hammock', () => MainScreenNavigator2);
AppRegistry.registerComponent('hammock', () => hammock);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
