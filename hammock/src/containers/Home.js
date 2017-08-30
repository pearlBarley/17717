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
    Modal,
    TouchableHighlight,
    Dimensions,
    TouchableWithoutFeedback,

    findNodeHandle,
  }from 'react-native'
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/homeActions'
import Icon from 'react-native-vector-icons/FontAwesome'
// import Dimensions from 'Dimensions'
// var {height, width} = Dimensions.get('window') // Screen dimensions in current orientation
import storage, { MyStorage } from '../storage/storage';

import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')

var {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get("window");

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sort: "Hot",
      layout: "Card",
      modalVisible: false,
      username: '',
    }
  }
  checkLogin () {
    const { dispatch } = this.props.navigation;
    MyStorage.load('ifIsInit',(ifIsInit)=>{
      console.log('ifIsInit',ifIsInit)
      if(ifIsInit){
         dispatch(NavigationActions.navigate({ routeName: 'sign_page', params: {}}))
      }
    })
  }
  componentDidMount () {
    const {stateData: { pageSize, currentPage }, actions: { getHomePosts } } = this.props
    let params = { pageSize, currentPage }
    getHomePosts(params)

    setTimeout(()=>this.checkLogin(),0)

    MyStorage.load('username',(data)=>{
      this.setState({ username: data.username})
    },() => {
      console.log('not found username, please login')
    },() => {
      console.log('username expire')
    })
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  postText(){
    const { navigate, dispatch } = this.props.navigation;
    this.setModalVisible(false)
    dispatch(NavigationActions.navigate({ routeName: 'create_post', params: {'title': 'Text'}, }))
  }
  postImgOrVideo(){
    const { navigate, dispatch } = this.props.navigation;
    this.setModalVisible(false)
    dispatch(NavigationActions.navigate({ routeName: 'create_post', params: {'title': 'Image/Video'}, }))
  }
  postLink(){
    const { navigate, dispatch } = this.props.navigation;
    this.setModalVisible(false)
    dispatch(NavigationActions.navigate({ routeName: 'create_post', params: {'title': 'Link'}, }))
  }
  startConversation () {
     this.setModalVisible(true)
  }
  checkBoundary (even) {
    let target = even.nativeEvent.target;
    let a = findNodeHandle(this.refs.modalView);
    if (target === findNodeHandle(this.refs.modalView) ) {  
        this.setModalVisible(false)
    } 
  }
  voteAction (post, action) {
    let {
      stateData: { pageSize, currentPage },
      actions: { votePost, cancelVotePost, getHomePosts }
    } = this.props;

    let params = { postid: post._id, 
                   action: action, 
                   alreadyUpvote: post.alreadyUpvote,
                   alreadyOppose: post.alreadyOppose,
                 }
    votePost(params)       
    .then(()=>{
      getHomePosts({ pageSize, currentPage })
    })

  }
  jumpToDetail (post) {
    let { navigation: { navigate, dispatch } } = this.props;
    dispatch(NavigationActions.navigate({ routeName: 'posts_detail', params: {'postid': post._id, 'ifScroll': true }, }))
  }
  render () {
    let { 
      stateData: { homePostList }, 
      navigation: { navigate, dispatch }
    } = this.props;

    let postList = homePostList.map((post, index)=>{
       return (
            <View style={styles.info} key={index} >         
                <View style={styles.infoTitle}>
                  <Text style={styles.infoTitleText}>r/news • 2h</Text>
                  <View style={styles.infoTitleIcon}>
                      <Icon name="ellipsis-h" size={20} color= '#AAAAAA' />
                  </View>
                </View>
                <TouchableOpacity onPress={() => { dispatch(NavigationActions.navigate({ routeName: 'posts_detail', params: {'postid': post._id}, })) }}>
                  <Text style={styles.infoBodyTitle} numberOfLines={4} ellipsizeMode='tail' selectable={true} >
                      {post.title}
                  </Text>
                  <View style={styles.infoBody}>
                    <Text style={styles.infoBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >
                      {post.content}
                    </Text>                   
                    <Image
                      source={require('../assets/img/NavLogo.png')}
                      style={styles.thumbnails}
                    />     
                  </View>
                </TouchableOpacity>
                <View style={styles.infoAction}>
                      <View style={styles.vote}>
                           <TouchableOpacity onPress={this.voteAction.bind(this, post,1)}>
                               <Icon style={styles.voteIcon} name="arrow-up" size={15} color= {post.alreadyUpvote?'#EF4A21':'#AAAAAA'} />
                           </TouchableOpacity>
                           <Text style={styles.voteText} >{post.voteNum}</Text>
                           <TouchableOpacity onPress={() => this.voteAction(post,0)}>
                               <Icon style={styles.voteIcon} name="arrow-down" size={15} color= {post.alreadyOppose?'#EF4A21':'#AAAAAA'} />
                           </TouchableOpacity>
                      </View>
                      <View style={styles.comment}>
                           <TouchableOpacity style={styles.commentTouch} onPress={() => this.jumpToDetail(post)}>
                              <Icon style={styles.commentIcon} name="commenting" size={15} color= '#AAAAAA' />
                              <Text style={styles.commentText} >2.4k</Text>
                           </TouchableOpacity>
                      </View>
                      <View style={styles.share}>
                           <Icon style={styles.shareIcon} name="share-square-o" size={15} color= '#AAAAAA' />
                           <Text style={styles.shareText} >Share</Text>
                      </View>                           
                </View>
            </View>
       );
    })



    return (
      <ScrollView style={styles.container}>
        <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {this.setModalVisible(false)}}
        >
        {/*<View>*/}
            <TouchableWithoutFeedback style={styles.touchModalView} onPress={(e) => this.checkBoundary(e)}>
            <View ref="modalView" style={styles.modalView}>

              <View style={styles.triangleUp}></View>
              <View style={styles.conversation}>
                <Text style={styles.conversationText}>Start a conversation</Text>
                <View style={styles.conversationView}>
                    <TouchableOpacity onPress={() => this.postText()}>
                      <View style={styles.conversationViewSection}>
                          <Image source={require('../assets/img/NavLogo.png')} style={styles.conversationViewSectionImage} />
                          <Text style={styles.conversationViewSectionText}>TEXT</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.postImgOrVideo()}>
                      <View style={styles.conversationViewSection}>
                          <Image source={require('../assets/img/NavLogo.png')} style={styles.conversationViewSectionImage} />
                          <Text style={styles.conversationViewSectionText}>IMAGE/VIDEO</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.postLink()}>
                      <View style={styles.conversationViewSection}>
                          <Image source={require('../assets/img/NavLogo.png')} style={styles.conversationViewSectionImage} />
                          <Text style={styles.conversationViewSectionText}>LINK</Text>
                      </View>
                    </TouchableOpacity>
                </View>
              </View>
              
            </View>
            </TouchableWithoutFeedback>
          {/*</View>*/}
         
        </Modal>


        <View style={styles.multipleChoice}>
            <Picker
              selectedValue={this.state.sort}
              onValueChange={(sort) => this.setState({sort: sort})}
              style={styles.pickerSort}>
              <Picker.Item label="Hot" value="Hot" />
              <Picker.Item label="New" value="New" />
              <Picker.Item label="Top" value="Top" />
              <Picker.Item label="Controversial" value="Controversial" />
            </Picker>
            <View style={styles.pickerBlank}></View>
            <View style={styles.pickerLayout}>         
                <Icon name="align-right" size={20} color= '#AAAAAA' />
            </View>
            {/*<Picker
              selectedValue={this.state.layout}
              onValueChange={(layout) => this.setState({layout: layout})}
              style={styles.pickerLayout}>
              <Picker.Item label="Card" value="Card" />
              <Picker.Item label="Compact" value="Compact" />
              <Picker.Item label="Media gallery" value="Media gallery" />
            </Picker>*/}
        </View>
        <TouchableOpacity onPress={() => this.startConversation()}>
          <View style={styles.userPost}>
              <View style={styles.editIcon}>         
                  <Icon name="edit" size={26} color= '#60F4F4' />
              </View>
              <View style={styles.userText}>
                  <Text>{'u/'+ this.state.username}</Text>
                  <Text>Post something insteresting</Text>
              </View>
          </View>
        </TouchableOpacity>

        <View style={styles.InfoFlow}>
            { postList }
        </View>

      </ScrollView>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(Home.prototype, TimerMixin)


function mapStateToProps (state) {
  return {
    stateData: {
      homePostList: state.home.homePostList,
      pageSize: state.home.pageSize, 
      currentPage: state.home.currentPage,
      operation: state.home.operation,
    }
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...homeActions }, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home)





/**
 * Style
 */

let styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: '#F7F6F6',
  },
  multipleChoice: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  pickerSort: {
    flex: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 30,
  },
  pickerBlank: {
    flex: 20,
    height: 30
  },
  pickerLayout: {
    flex: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 30
  },
  userPost: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  editIcon: {
    // flex: 1,
    flexBasis: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  userText: {
    // flex: 4,
    flexBasis: 'auto',
    flexDirection: 'column',
  },
  InfoFlow: {
  }, 
  info: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
  }, 
  infoTitle: {
    display: 'flex',
    flexDirection: 'row',      //主轴为水平方向
    alignItems: 'center',      //侧轴方向，现在代表垂直方向
    justifyContent: 'center',  //主轴方向，现在代表水平方向
    paddingTop: 10,
  },
  infoTitleText: {
    flex:1,                    
    alignItems: 'flex-start',  //主轴默认为垂直方向，alignItems代表侧轴所以是水平方向
  },
  infoTitleIcon: {
    flex:1,
    alignItems: 'flex-end',
  },
  infoBodyTitle: {
    flex: 1,
    alignItems: 'flex-start',
    fontSize: 13,
    lineHeight: 15,
    // fontWeight: '700',
    marginTop: 10,
  },
  infoBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    // height: 100,
    // paddingTop: 10,
    paddingBottom: 10,
  },
  infoBodyText: {
    flex: 1,
    alignItems: 'flex-start',
    fontSize: 13,
    lineHeight: 15,
    // overflow : 'hidden',
    // textOverflow: 'ellipsis',
  },
  thumbnails: {
    width: 50,
    height: 50,
    alignItems: 'flex-end',
  }, 
  infoAction: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  }, 
  vote: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  voteIcon: {
  },
  voteText: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  comment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#DDDDDD',
    borderRightWidth: 1,
    borderRightColor: '#DDDDDD',
  },
  commentTouch: {
    flexDirection: 'row',
  },
  commentIcon: {
  },
  commentText: {
    paddingLeft: 10,
  },
  share: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
  },
  shareText: {
    paddingLeft: 10,
  }, 
  
  touchModalView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  conversation: {
    width: deviceWidth*0.9,
    // marginTop: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'relative',
    zIndex: 100,
  },
  triangleUp: {
    // position: 'absolute',
    // top: -10,
    // left: 8,
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    marginTop: 110,
    marginLeft: 28,
    alignSelf: 'flex-start',
  },
  conversationText: {
    fontSize: 15,
    marginBottom: 10,
  },
  conversationView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationViewSection: {
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationViewSectionImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  conversationViewSectionText: {
    fontSize: 12,
  },
       
})




/*class Home extends React.Component {

  componentDidMount () {
    this.setTimeout(() => {},2500)
  }
  render () {
    const { navigate, dispatch } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
            <Text>Tab title:{this.props.title} name:{this.props.name}</Text>
            <Text>Tab data:{this.props.data}</Text>
            <Button onPress={Actions.pop} title='Back' />
            <Button onPress={() => { Actions.mainframe({ data: 'mainframe!' }); }} title='Switch to mainframe' /> 
            <Button onPress={Actions.pop} title='Back' />
            <Button onPress={() => { dispatch(NavigationActions.navigate({ routeName: 'tab_inbox' })) }} title='Switch to tab_inbox' /> 
            <Button onPress={() => { dispatch({ type: 'Login' }) }} title='dispatch Login' /> 
            <Button onPress={() => navigate('tab_inbox')} title='Switch to tab_inbox' /> 
            <Button onPress={() => this.props.navigation.goBack()} title='goBack' /> 
      </ScrollView>
    )
  }
}*/