'use strict'

import React,{ Component } from 'react'
import{
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    Picker,
    TouchableOpacity,
    Image,
    TextInput,
  }from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postActions from '../actions/postActions'
import Icon from 'react-native-vector-icons/FontAwesome'


import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')


class postCreate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        postTitle: '',
        postContent: '',
        postTitleHeight: 0,
        postContentHeight: 0,
        restCount: '',
        maxTitleLength: 300,
    }
    this.createPost = this.createPost.bind(this)
  }
  componentDidMount () {
    this.props.navigation.setParams({
        // title: `${this.props.navigation.state.params.title}`,
        createPost: this.createPost
    })
  }
  changeTitle(postTitle){
    let restCount = this.state.maxTitleLength - postTitle.length
    this.setState({
      postTitle,
      restCount:(restCount===300?'':restCount),
    })
  }
  createPost () {
    let {actions:{ createPost }} = this.props
    
    createPost(this.state.postTitle, this.state.postContent)
    .then(()=>{
      
    })
  }
  render () {
    const { navigate, dispatch } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.multipleChoice}>
            <Image source={require('../assets/img/NavLogo.png')} style={styles.multipleChoiceImage} />
            <Text style={styles.multipleChoiceText}>Choose a community</Text>
            <Icon style={styles.multipleChoiceIcon} name="square" size={20} color= '#AAAAAA' />
        </View>
        <TextInput
          autoFocus={true} 
          multiline = {true}
          defaultValue=""
          maxLength={this.state.maxTitleLength}
          underlineColorAndroid="transparent"
          placeholder="An interesting title"
          style={[styles.textInput, {height: Math.max(35, this.state.postTitleHeight)}]}
          onContentSizeChange={(event) => {this.setState({postTitleHeight: event.nativeEvent.contentSize.height});}}          
          onChangeText={(postTitle) => this.changeTitle(postTitle)}
          value={this.state.postTitle}
        />
        <Text style={styles.restCount}>{this.state.restCount}</Text>
        <TextInput
          multiline = {true}
          defaultValue=""
          underlineColorAndroid="transparent"
          placeholder="Your text post (optional)"
          style={[styles.textInput, {height: Math.max(35, this.state.postContentHeight)}]}
          onContentSizeChange={(event) => {this.setState({postContentHeight: event.nativeEvent.contentSize.height});}}          
          onChangeText={(postContent) => this.setState({postContent})}
          value={this.state.postContent}
        />

      </View>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(postCreate.prototype, TimerMixin)


function mapStateToProps (state) {
  return {
    stateData: {
      operation: state.posts.operation,
    }
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...postActions }, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(postCreate)





/**
 * Style
 */

let styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  multipleChoice: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  multipleChoiceImage: {
    width: 30,
    height:30,
    marginRight: 5,
  },
  multipleChoiceText: {
    fontSize: 14,
    marginRight: 5,
  },
  multipleChoiceIcon: {
  },
  textInput: {
    // borderColor: '#CCC', 
    // borderWidth: 1,
    // borderRadius: 5,
    paddingLeft: 10,
    
  },
  restCount: {
    textAlign: 'right',
    fontSize: 8,
    marginBottom: 10,
    paddingRight: 10,
  }
     
})
