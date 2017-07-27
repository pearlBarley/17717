import React from 'react';
// import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';

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
});

const LoginScreen = ({ navigation }) => (
  //从props获取navigation   addNavigationHelpers 关联react-navigation和redux,可以让navigation进行dispatch操作
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Screen A
    </Text>
    <Text style={styles.instructions}>
      This is great
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Login' })}   //触发login操作，nav和auth的都加上对应的login type来捕捉执行都会执行（redux）,navigation会加上index标识不同的堆栈router
      title="Log in"
    />
  </View>
);

// LoginScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
// };

LoginScreen.navigationOptions = {
  title: 'Log In',
};

export default LoginScreen;
