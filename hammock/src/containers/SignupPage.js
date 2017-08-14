'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button,
    TouchableHighlight,
    Image,
    TextInput
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
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 40,
    // alignItems: 'center',
  },
  back: {
    alignItems: 'center',
  },
  bannerFrame: {},
  banner: {
    width:60,
    height:60,
  },
  text: {
    color: '#19A235',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 40,
  },
  declaration: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 15,
  },
  textInput: {
    height: 60, 
    borderColor: '#CCC', 
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  touch: {
    height: 40,
    borderRadius:5,
    alignSelf: 'stretch',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#4B90F9',
    justifyContent: 'center',
  },
  btnView: {
  },
  btnCreateText: {
    // lineHeight: 30,
    textAlign: 'center',
    // textAlignVertical: 'center',
    fontSize: 14,
    color: '#FFF',
  },
})


class SignupPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      password: '',
    }
  }
  componentDidMount () {
  }
  createAccount () {

  }
  render () {
    const { navigate, dispatch } = this.props.navigation;
    return (
      <View style={styles.container}>
            {/*<TouchableHighlight >*/}
            <View style={styles.back}>
                <Icon name="angle-up"  onPress={() => this.props.navigation.goBack()} size={35} color= '#4B90F9' />
            </View>
            <View>
                <View style={styles.bannerFrame}>
                    <Image
                          source={require('../assets/img/NavLogo.png')}
                          style={styles.banner}
                    />
                </View>
                <Text style={styles.text}>Create an account</Text>
                <TextInput
                  autoFocus={true} 
                  defaultValue=""
                  maxLength={20}
                  placeholder="Email"
                  style={styles.textInput}
                  onBlur={() =>{}}
                  onChangeText={() =>{}}
                  onEndEditing={() =>{}}
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                />
                <TextInput
                  defaultValue=""
                  maxLength={20}
                  placeholder="Username"
                  style={styles.textInput}
                  onBlur={() =>{}}
                  onChangeText={() =>{}}
                  onEndEditing={() =>{}}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                />
                <TextInput
                  secureTextEntry={true}
                  defaultValue=""
                  maxLength={20}
                  placeholder="Password"
                  style={styles.textInput}
                  onBlur={() =>{}}
                  onChangeText={() =>{}}
                  onEndEditing={() =>{}}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                />
                <Text style={styles.declaration}>By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy</Text>                
                <TouchableHighlight style={styles.touch} onPress={this.createAccount.bind(this)} activeOpacity={0.8} >
                    <View style={styles.btnView}>
                        <Text style={styles.btnCreateText}>CREATE ACCOUNT</Text>
                    </View>
                </TouchableHighlight>   
            </View>
      </View>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(SignupPage.prototype, TimerMixin)


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



export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)