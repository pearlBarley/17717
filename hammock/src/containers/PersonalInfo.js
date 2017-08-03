'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity
  }from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/homeActions'

import Icon from 'react-native-vector-icons/FontAwesome'

import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')

import { personalInfoList } from '../assets/personalInfoList'


class PersonalInfo extends React.Component {

  componentDidMount () {
    this.setTimeout(() => {},2500)
  }
  render () {

    const { navigate, dispatch } = this.props.navigation;

    //Array [{reactElement},{reactElement},{reactElement}]
    let personalInfoListElememt = personalInfoList.map(function(val, index) {
      return (
        <TouchableOpacity 
          key={index} 
          onPress={()=>{dispatch(NavigationActions.navigate(
                                      {
                                        routeName: 'personnal_info_stack',
                                        params: {'stackname': val.description}
                                      })
                       )}
                  }>
          
          <View style={styles.infoRow}>
              <Icon style={styles.infoRowIconLeft}  name={val.icon} size={20} color= '#AAAAAA' />
              <Text style={styles.infoRowText}>{val.description}</Text>
              <Icon style={styles.infoRowIconRight}  name="angle-right" size={20} color= '#AAAAAA' />
          </View>
        </TouchableOpacity>
        )
    })
    // debugger
    return (
      <View style={styles.container}>
          <View style={styles.karmaAge}>
            <View style={styles.karma}>
              <Icon style={styles.karmaIcon}  name="pagelines" size={20} color= '#F93A60' />
              <View style={styles.karmaTextView}>
                <Text style={styles.karmaTextTop}>1</Text>
                <Text style={styles.karmaTextBottom}>KARMA</Text>
              </View>
            </View>
            <View style={styles.age}>
              <Icon style={styles.ageIcon}  name="birthday-cake" size={20} color= '#6BFAA4' />
              <View style={styles.ageTextView}>
                <Text style={styles.ageTextTop}>134 d</Text>
                <Text style={styles.ageTextBottom}>REDDIT AGE</Text>
              </View>
            </View>
          </View>
          {personalInfoListElememt}
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  karmaAge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  karma: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  karmaIcon: {
    marginLeft: 15,
    marginRight: 20,
  },
  karmaTextView: {
    flexDirection: 'column',
  },
  karmaTextTop: {
    fontWeight: 'bold',
  },
  karmaTextBottom: {
    fontSize: 11,
    color: '#CCC'
  },
  age: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ageIcon: {
    marginLeft: 15,
    marginRight: 20,
  },
  ageTextView: {
    flexDirection: 'column',
  },
  ageTextTop: {
    fontWeight: 'bold',
  },
  ageTextBottom: {
    fontSize: 11,
    color: '#CCC'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  infoRowIconLeft: {
    marginLeft: 10,
    marginRight: 10,
  },
  infoRowIconRight: {
    marginRight: 10,
  },
  infoRowText: {
    flex: 1,
  }, 
})

// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(PersonalInfo.prototype, TimerMixin)


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



export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)
