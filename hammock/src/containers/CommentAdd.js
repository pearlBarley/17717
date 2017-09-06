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
    PixelRatio,
    TouchableWithoutFeedback,
  }from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as commentActions from '../actions/commentActions'
import Icon from 'react-native-vector-icons/FontAwesome'
let ImagePicker = require('react-native-image-picker');

import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')


class CommentAdd extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        commentContent: '',
        commentContentHeight: 0,
    }
    this.addComment = this.addComment.bind(this)
  }
  componentDidMount () {
    this.props.navigation.setParams({
        // title: `${this.props.navigation.state.params.title}`,
        addComment: this.addComment
    })
  }

  addComment () {
    let { 
      stateData: { operation }, 
      navigation: { navigate, dispatch,  state:{ params:{ postDetail } }  },
      actions: { addComment }
    } = this.props;

    addComment(postDetail._id, this.state.commentContent)
    .then((data)=>{
      if(operation.result){
        console.log('add sucess')
        this.props.navigation.goBack()
        //dispatch(NavigationActions.navigate({ routeName: 'posts_detail', params: {postid:data._id}}))
        //this.showPopup(true)
      } else {
        //this.showPopup(false)
      }
    })
  }
  changeContent (commentContent) {
    this.setState({
      commentContent
    })
  }

  render () {
    const { navigate, dispatch, state:{ params:{title, postDetail} } } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.multipleChoice}>
            <Text style={styles.multipleChoiceText}>{postDetail.content}</Text>
        </View>
        <TextInput
          autoFocus={true} 
          multiline = {true}
          defaultValue=""
          underlineColorAndroid="transparent"
          placeholder="Your comment"
          style={[styles.textInput, {height: Math.max(35, this.state.commentContentHeight)}]}
          onContentSizeChange={(event) => {this.setState({commentContentHeight: event.nativeEvent.contentSize.height});}}          
          onChangeText={(commentContent) => this.changeContent(commentContent)}
          value={this.state.commentContent}
        />




      </View>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(CommentAdd.prototype, TimerMixin)


function mapStateToProps (state) {
  return {
    stateData: {
      operation: state.posts.operation,
    }
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...commentActions }, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CommentAdd)





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
  },
  avatarContainerView:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContainer: {
    
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
     
})
