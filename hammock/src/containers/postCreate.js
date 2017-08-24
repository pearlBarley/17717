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
  }from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postActions from '../actions/postActions'
import Icon from 'react-native-vector-icons/FontAwesome'
let ImagePicker = require('react-native-image-picker');

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
        avatarSource: null,
        videoSource: null,
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
    let { 
      stateData: { operation }, 
      navigation: { navigate, dispatch },
      actions: { createPost }
    } = this.props;

    createPost(this.state.postTitle, this.state.postContent)
    .then((data)=>{
      if(operation.result){
        dispatch(NavigationActions.navigate({ routeName: 'posts_detail', params: {postid:data._id}}))
        //this.showPopup(true)
      } else {
        //this.showPopup(false)
      }
    })
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }
  launchCamera() {
    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchCamera(options, (response)  => {
      console.log(response)
    });
  }
  launchImageLibrary() {
    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, (response)  => {
      console.log(response)
    });
  }

  render () {
    const { navigate, dispatch, state:{ params:{title} } } = this.props.navigation;
    let contentLayout;
    if(title === 'Text'){
      contentLayout = (
          <TextInput
            multiline = {true}
            defaultValue=""
            underlineColorAndroid="transparent"
            placeholder="Your text post (optional)"
            style={[styles.textInput, {height: Math.max(35, this.state.postContentHeight)}]}
            onContentSizeChange={(event) => {this.setState({postContentHeight: event.nativeEvent.contentSize.height});}}          
            onChangeText={(postContent) => this.setState({postContent})}
            value={this.state.postContent}
          />)
    } else if(title === 'Image/Video'){
      contentLayout = (
          <View style={styles.avatarContainerView}>  
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                }
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer]}>
                  <Text>Select a Video</Text>
                </View>
              </TouchableOpacity>
              { this.state.videoSource &&
                <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
              }

              <TouchableOpacity onPress={this.launchCamera.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer]}>
                  <Text>launchCamera</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchImageLibrary.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer]}>
                  <Text>launchImageLibrary</Text>
                </View>
              </TouchableOpacity>
          </View>
       )
    } else if(title === 'Link'){

    }
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

         {contentLayout}


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
