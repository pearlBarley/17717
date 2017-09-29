'use strict'

import React,{ Component } from 'react'
import {
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
  } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

class CommentList extends React.Component {
  // _onPress = () => {
  //   this.props.onPressItem(this.props.id);
  // };
  getCommentChild(item, ifFirst, childKey){

    //if(item.children.length <= 0) return []
    let recursionChild = []
    if(item.children.length > 0) {
      recursionChild = item.children.map((value,index,arr)=>{
         return this.getCommentChild(value, false, index)
      })
    }
    let replyFrameStyles = ifFirst? styles.replyFrame : [styles.replyFrame,{ borderLeftColor: '#DDD', borderLeftWidth: 1, paddingLeft: 15, }]
    return (
      <View style={replyFrameStyles} key={childKey}>
                      <View style={styles.commentsTitle}>
                        <Text style={styles.commentsTitleText}>r/news • 2h</Text>
                      </View>
                      <TouchableOpacity onPress={() => this.startConversation()}>
                        <View style={styles.commentsBody}>
                          <Text style={styles.commentsBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >
                            {item.content}
                          </Text>                   
                          {/*<Image
                            source={require('../assets/img/NavLogo.png')}
                            style={styles.thumbnails}
                          />*/}
                        </View>
                      </TouchableOpacity>
                      <View style={styles.commentsAction}>
                            <View style={styles.commentsMoreAction}>
                                <Icon name="ellipsis-h" size={15} color= '#AAAAAA' />
                            </View>
                            <View>
                                <TouchableOpacity style={styles.reply} onPress={()=>this.reply(item.parent_ids,item._id,item.content)}>
                                    <Icon style={styles.replyIcon} name="reply" size={10} color= '#AAAAAA' />
                                    <Text style={styles.replyText} >Reply</Text>
                                </TouchableOpacity>
                            </View>  
                            <View style={styles.commentsVote}>
                                <Icon style={styles.commentsVoteIcon} name="arrow-up" size={10} color= '#AAAAAA' />
                                <Text style={styles.commentsVoteText} >16.0k</Text>
                                <Icon style={styles.commentsVoteIcon} name="arrow-down" size={10} color= '#AAAAAA' />
                            </View>                       
                      </View>

                        {recursionChild}

                        <View style={styles.moreReply}>
                          <Text style={styles.moreReplyText}>12 MORE REPLY</Text>
                        </View>

                  {/*sub replyFrame*/}
                  </View> 
    )

  }
  
  reply (parent_ids, _id, content) {
    let this_parent_ids = parent_ids === ''? _id: parent_ids+','+_id
    //alert(this_parent_ids)
    let replyFun = this.props.reply
    replyFun(this_parent_ids, content)
  }

  render () {
    let commentData = this.props.commentData
    console.log('commentData',commentData)
    let index = commentData.index
    let item = commentData.item
    // author_id:"5992b100949b231f44e2e697"
    // comment_ids:Array(0)
    // content:"dsfsdfsfsdfsdfdsf"
    // createdAt:"2017-09-07T08:37:30.219Z"
    // oppose:0
    // parent_ids:""
    // parent_ids_test:Array(0)
    // post_id:"599fa325a3623b3874cfde90"
    // replier_ids:Array(0)
    // tag_ids:Array(0)
    // updatedAt:"2017-09-07T08:37:30.219Z"
    // upvote:0
    // _id:"59b1054ac706b17c22fafc99"
    // children:[]
    
    let comment = this.getCommentChild(item, true, index)

    return (
          <View ref="commentsFlow" style={styles.commentsFlow} key={index}>
            <View style={styles.comments}> 

                  {comment}

            </View>
        </View>
     )
  }
}
export default CommentList;



/**
 * Style
 */

let styles = StyleSheet.create({
  commentsFlow: {
    },
    comments: {
      backgroundColor: '#fff',
      marginTop: 5,
      paddingLeft: 20,
      paddingRight: 20,
    },
    replyFrame: {
      marginBottom: 10,
    },
    commentsTitle: {
      display: 'flex',
      flexDirection: 'row',      
      alignItems: 'center',      
      justifyContent: 'center',  
      paddingTop: 10,
    },
    commentsTitleText: {
      flex:1,                    
      alignItems: 'flex-start',
      color: '#B0A7A4',
    },
    commentsBody: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 5,
    },
    commentsBodyText: {
      flex: 1,
      alignItems: 'flex-start',
      fontSize: 12,
      lineHeight: 15,
    },
    commentsAction: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingBottom: 10,
    },
    commentsMoreAction: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 15,
    },
    reply: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderLeftWidth: 1,
      borderLeftColor: '#DDDDDD',
      borderRightWidth: 1,
      borderRightColor: '#DDDDDD',
      paddingLeft: 15,
      paddingRight: 15,
    },
    replyIcon: {
    },
    replyText: {
      paddingLeft: 10,
      fontSize: 12,
      color: '#B0A7A4',
    },
    commentsVote: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingLeft: 15,
      paddingRight: 15,
    },  
    commentsVoteIcon: {
    },  
    commentsVoteText: {
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 10,
      color: '#B0A7A4',
    },
    moreReply: {
      backgroundColor: '#EFEDED',
    },
    moreReplyText: {
      fontSize: 10,
      color: '#908480',
      textAlign: 'center',
    }, 
})        









