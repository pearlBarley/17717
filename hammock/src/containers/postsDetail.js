'use strict'

import React,{ Component } from 'react'
//import ReactDOM from 'react-dom';
import{
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    Picker,
    TouchableOpacity,
    findNodeHandle,
    Image,
    FlatList,
    InteractionManager,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
  }from 'react-native'
import { UIManager} from 'NativeModules';
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postActions from '../actions/postActions'
import * as commentActions from '../actions/commentActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommentList from '../components/CommentList'

import TimerMixin from 'react-timer-mixin'
let reactMixin = require('react-mixin')

var {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get("window");

class PostsDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sort: "Hot",
      layout: "Card",
      comments: "BEST",
      text: '',
    }
  }
  componentDidMount () {
    let { 
      stateData: { postDetail }, 
      navigation: { navigate, dispatch, state: { params:{postid, ifScroll} }},
      actions: { getPostDetail, getCommentData }
    } = this.props;
    // getPostDetail(postid).then(()=>{
    //   getCommentData(postid)
    // })
    
    getPostDetail(postid)
    getCommentData(postid)
    
    
    if(ifScroll){
      //jump to comment 
      // var domNode = ReactDOM.findDOMNode(this.refs.commentsFlow)
      // domNode.scrollIntoView()
      //let commentsFlow = findNodeHandle(this.refs.commentsFlow);
      //this._listRef.getNode().scrollToIndex({viewPosition: 0.5, index: 0});
     
      // this.refs.commentFlat.scrollToIndex({animated: true, index: 2})
      //this.refs.commentFlat.scrollToIndex({viewPosition: 0.5, index:0})
      
      //this.commentFlat.scrollToEnd();
      //this.commentFlat.scrollToIndex({viewPosition:0,index:2});
      //this.commentFlat.scrollToOffset({ animated: true, offset: 20000 });

      // InteractionManager.runAfterInteractions(() => {
      //     const handle = findNodeHandle(this.refs.test);
      //     console.log(handle)
      //     UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      //       console.log('x, y, width, height, pageX, pageY',x, y, width, height, pageX, pageY)
      //         this.myScroll.scrollTo({x:x,y:y,animated:true});
      //     });
      //     //this.commentFlat.scrollToEnd();  //外层是ScrollView的话无效
      // })


      // this.measureTimer = setTimeout(() => {
      //     this.commentFlat.measure((x, y, width, height, pageX, pageY) => {
      //         console.log('x, y, width, height, pageX, pageY',x, y, width, height, pageX, pageY)

      //         this.myScroll.scrollTo({x:pageX,y:pageY,animated:true});
      //     })
      // }, 0);

    }
    
  }
  startConversation () {
    alert(1111)
  }
  _renderItem (item) { 
    return   (
        <CommentList
          /*onPressItem={this._onPressItem}
          selected={!!this.state.selected.get(item.id)}*/
          commentData={item}
        />
      )
  }
  _getItemLayout(data, index) {
      //getItemLayout={(data, index) => ( {length: 行高, offset: 行高 * index, index} )}
      let [length, separator, header] = [50, 24, 0];
      return {length, offset: (length + separator) * index + header, index};
  }
  commentFlatLayout (e) {
    let { 
      navigation: { state: { params:{ ifScroll } }}
    } = this.props;
    if(ifScroll){
      let { layout: {x, y, width, height}} = e;
      this.myScroll.scrollTo({ x:x, y:y, animated:true });
    }

  }
  scrollToEnd(){
    this.myScroll.scrollToEnd()
  }
  scrollToTop(){
    this.myScroll.scrollTo({ x:0, y:0, animated:true });
  }
  focus(){}
  blur(){}
  showAddComment(){
    let { 
      stateData: { postDetail }, 
      navigation: { navigate, dispatch }
    } = this.props;
    dispatch(NavigationActions.navigate({ routeName: 'comment_add', params: {'title': 'Add comment','postDetail':postDetail, 'parentids':''}, }))
  }

  render () {
    let { 
      stateData: { postDetail, commentData }, 
      navigation: { navigate, dispatch }
    } = this.props;

    return (
      <View style={styles.containerView}>
        <ScrollView 
          style={styles.container}
          ref={(ref) => this.myScroll = ref}
          >
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
                    <Text>u/wheatlala</Text>
                    <Text>Post something insteresting</Text>
                </View>
            </View>
          </TouchableOpacity>

          <View style={styles.InfoFlow}>
              <View style={styles.info}>         
                  <View style={styles.infoTitle}>
                    <Text style={styles.infoTitleText}>r/news • 2h</Text>
                    <View style={styles.infoTitleIcon}>
                        <Icon name="ellipsis-h" size={20} color= '#AAAAAA' />
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => this.startConversation()}>
                    <Text style={styles.infoBodyTitle} numberOfLines={4} ellipsizeMode='tail' selectable={true} >
                        {postDetail.title}
                    </Text>
                    <View style={styles.infoBody}>
                      
                      <Text style={styles.infoBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >
                        {postDetail.content}
                      </Text>                   
                      <Image
                        source={require('../assets/img/NavLogo.png')}
                        style={styles.thumbnails}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.infoAction}>
                        <View style={styles.vote}>
                            <Icon style={styles.voteIcon} name="arrow-up" size={15} color= '#AAAAAA' />
                            <Text style={styles.voteText} >16.0k</Text>
                            <Icon style={styles.voteIcon} name="arrow-down" size={15} color= '#AAAAAA' />
                        </View>
                        <View style={styles.comment}>
                            <Icon style={styles.commentIcon} name="commenting" size={15} color= '#AAAAAA' />
                            <Text style={styles.commentText} >2.4k</Text>
                        </View>
                        <View style={styles.share}>
                            <Icon style={styles.shareIcon} name="share-square-o" size={15} color= '#AAAAAA' />
                            <Text style={styles.shareText} >Share</Text>
                        </View>                           
                  </View>
              </View>
          </View>



          <View style={styles.multipleChoice}  ref={(commentFlat) => this.commentFlat = commentFlat} onLayout={({nativeEvent:e})=>this.commentFlatLayout(e)}>
              <Picker
                selectedValue={this.state.comments}
                onValueChange={(comments) => this.setState({comments: comments})}
                style={styles.pickerSortComments}>
                <Picker.Item label="New" value="NEW" />
                <Picker.Item label="Top" value="TOP" />           
                <Picker.Item label="Best" value="BEST" />
                <Picker.Item label="Q&A" value="Q&A" />
                <Picker.Item label="Controversial" value="CONTROVERSIAL" />
              </Picker>
          </View>
          
          <View  >
            <FlatList
              //data={[{key: 'a'}, {key: 'b'},{key: 'c'},{key: 'f'},{key: 'r'}]}
              data={commentData}
              renderItem={this._renderItem}
              //ref='commentFlat'
              //ref={(commentFlat) => this.commentFlat = commentFlat}
              getItemLayout={this._getItemLayout}
            />
          </View>

        </ScrollView>
        <View style={styles.bottomView} >
          <TouchableWithoutFeedback onPress={()=>this.showAddComment()}>
            <View>
              <Text ref='inputComment' style={styles.inputComment}>
                Add a comment
              </Text>
            </View>
          </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={()=>this.scrollToEnd()}>
            <View style={styles.scrollToEnd} >
              <Icon name="align-right" size={20} color= '#AAAAAA' />
            </View>
          </TouchableWithoutFeedback>
        </View>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(PostsDetail.prototype, TimerMixin)


function mapStateToProps (state) {
  return {
    stateData: {
      postDetail: state.posts.postDetail,
      operation: state.posts.operation,
      commentData: state.comment.commentData
    }
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...postActions, ...commentActions }, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PostsDetail)





/**
 * Style
 */

let styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  container: {
    backgroundColor: '#F7F6F6',
  },
  multipleChoice: {
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  pickerSort: {
    flex: 8,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    height: 30,
  },
  pickerSortComments: {
    flexBasis: 80,
    justifyContent: 'flex-start',
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
    color: '#B0A7A4',
  },
  infoTitleIcon: {
    flex:1,
    alignItems: 'flex-end',
  }, 
  infoBodyTitle: {
    flex: 1,
    alignItems: 'flex-start',
    fontSize: 18,
    lineHeight: 15,
    fontWeight: '700',
    marginTop: 10,
  }, 
  infoBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    // height: 100,
    paddingTop: 10,
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
    color: '#B0A7A4',
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
  commentIcon: {
  },
  commentText: {
    paddingLeft: 10,
    color: '#B0A7A4',
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
    color: '#B0A7A4',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 40,
    width: deviceWidth,
    backgroundColor: '#fff',
    padding: 5,
  },
  inputComment: { 
    borderColor: 'gray', 
    height: 30,
    width: deviceWidth,
    backgroundColor: '#EEE',
    padding: 5,
  }, 
  scrollToEnd: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    zIndex: 100,
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
            <Button onPress={() => { dispatch(NavigationActions.navigate({ routeName: 'tab_inbox' })) }} title='Switch to tab_inbox' /> 
            <Button onPress={() => { dispatch({ type: 'Login' }) }} title='dispatch Login' /> 
            <Button onPress={() => navigate('tab_inbox')} title='Switch to tab_inbox' /> 
            <Button onPress={() => this.props.navigation.goBack()} title='goBack' /> 
      </ScrollView>
    )
  }
}*/