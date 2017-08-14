'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableHighlight
  }from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/homeActions'
import Icon from 'react-native-vector-icons/FontAwesome'


import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')

let styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentFrame: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerFrame: {
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
  banner: {
    width: 300,
    height: 300,
  },
  text: {
    color: '#19A235',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 40,
  },
  touch: {
    // borderColor: '#999',
    // borderWidth: 1,
    borderRadius:5,
    alignSelf: 'stretch',
    marginBottom: 10,
    backgroundColor: '#4B90F9',
    marginLeft: 15,
    marginRight: 15,

  },
  btnView: {
    // borderRadius:5, 
    // backgroundColor: '#fff',
    // backgroundColor: 'transparent',
  },
  btnSignup: {
  },
  btnLogin: {
  },
  btnSignupText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
  btnLoginText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#4B90F9',
    backgroundColor: '#fff',
  },

})


class SignPage extends React.Component {

  componentDidMount () {
    
  }
  jumpToSignup () {
    const { dispatch } = this.props.navigation;
    dispatch(NavigationActions.navigate({ routeName: 'signup_page', params: {}}))
  }
  jumpToLogin () {
    const { dispatch } = this.props.navigation;
    dispatch(NavigationActions.navigate({ routeName: 'login_page', params: {}}))
  }
  render () {
    return (
      <View style={styles.container}>
         <Icon name="close" onPress={() => this.props.navigation.goBack()} size={20} color= '#AAAAAA' />
         <View style={styles.contentFrame}>
            <View style={styles.bannerFrame}>
                <Image
                      source={require('../assets/img/NavLogo.png')}
                      style={styles.banner}
                />
            </View>
            <Text style={styles.text}>Sign up to share your interests</Text>
            
              {/*<Button style={styles.signupBtn} title='SIGN UP'></Button>
              <Button style={styles.loginBtn} title='LOG IN'></Button>
              */}
              <TouchableHighlight style={styles.touch} onPress={this.jumpToSignup.bind(this)} activeOpacity={0.8} >
                    {/*<View style={styles.btnView}>*/}
                        {/*<Button style={styles.btnSignup} title='SIGN UP'></Button>*/}
                        <Text style={styles.btnSignupText}>SIGN UP</Text>
                    {/*</View>*/}
              </TouchableHighlight>
              <TouchableHighlight style={styles.touch} onPress={this.jumpToLogin.bind(this)} activeOpacity={0.8} >
                    <View style={styles.btnView}>
                        {/*<Button style={styles.btnLogin} title='LOG IN'></Button>*/}
                        <Text style={styles.btnLoginText}>LOG IN</Text>
                    </View>
              </TouchableHighlight>          
            </View>
      </View>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(SignPage.prototype, TimerMixin)


function mapStateToProps (state) {
  return {
    deviceVersion: state.device,
    auth: {
      form: {
        isFetching: state.auth
      }
    },
    global: {
      currentState: state.global,
      showState: state.global
    }
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...homeActions }, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignPage)
