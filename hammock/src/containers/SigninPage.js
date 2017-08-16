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
import * as signinActions from '../actions/signinActions'
import Icon from 'react-native-vector-icons/FontAwesome'

import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')



class SigninPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      password: '',
    }
  }
  componentDidMount () {
  }
  login () {
    // let { stateData: { email, username, password }, 
    //       navigation: { navigate, dispatch }, 
    //       actions:{ login }
    //     } = this.props;
    let {actions:{ login }} = this.props
    login(this.state.name, this.state.password)
    .then(()=>{
      //console.log('stateData.operation',this.props.stateData.operation)
      if (this.props.stateData.operation.result) {
        this.props.navigation.goBack()
      }
    })

    
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
                <Text style={styles.text}>Log in to Reddit</Text>
                  {/*onBlur={() =>{}}
                  onChangeText={() =>{}}
                  onEndEditing={() =>{}}*/}
                <TextInput
                  autoFocus={true} 
                  defaultValue=""
                  maxLength={20}
                  placeholder="Username"
                  style={styles.textInput}            
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                />
                <TextInput
                  secureTextEntry={true}
                  defaultValue=""
                  maxLength={20}
                  placeholder="Password"
                  style={styles.textInput}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                />
                <Text style={styles.declaration}>FORGOT PASSWORD</Text>                
                <TouchableHighlight style={styles.touch} onPress={this.login.bind(this)} activeOpacity={0.8} >
                    <View style={styles.btnView}>
                        <Text style={styles.btnCreateText}>LOG IN</Text>
                    </View>
                </TouchableHighlight>   
            </View>
      </View>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(SigninPage.prototype, TimerMixin)


function mapStateToProps (state) {
  return {
    stateData: {
      email: state.signin.email,
      username: state.signin.username,
      password: state.signin.password,
      operation: state.signin.operation,
    }
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...signinActions }, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SigninPage)



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
