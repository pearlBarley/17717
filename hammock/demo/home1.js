
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

class RecentChatsScreen extends React.Component {
  static navigationOptions = {
    title: 'RecentChatsScreen',
  };
  render() {
    return <Text>List of recent chats</Text>
  }
}

class AllContactsScreen extends React.Component {
  static navigationOptions = {
    title: 'AllContactsScreen',
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./img/back_white.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (<View>
              <Text>List of all contacts</Text>
              <Button onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
                title="Chat with Lucy"
            />
         </View>
    )
  }
}
const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
  },
  {
    tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: 'red',
        }
    }
  },
  );
MainScreenNavigator.navigationOptions = {
  title: 'MainScreenNavigator',
};
export default MainScreenNavigator

// export default function globalInit() {
//   var loggerMiddleware = createLogger();
//   var store = applyMiddleware(thunk, loggerMiddleware)(createStore)(reducers);
//   return (
//       <AllContactsScreen/>
//   );
// };
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});