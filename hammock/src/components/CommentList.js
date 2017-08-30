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
  
  
  render () {
    let commentData = this.props.commentData
    return (
          <View ref="commentsFlow" style={styles.commentsFlow}>
            <View style={styles.comments}>                   
                <View style={styles.replyFrame}>
                  <View style={styles.commentsTitle}>
                    <Text style={styles.commentsTitleText}>r/news • 2h</Text>
                  </View>
                  <TouchableOpacity onPress={() => this.startConversation()}>
                    <View style={styles.commentsBody}>
                      <Text style={styles.commentsBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden RuleGame theory and the Golden RuleGame theory and the Golden Rule</Text>                   
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
                        <View style={styles.reply}>
                            <Icon style={styles.replyIcon} name="reply" size={10} color= '#AAAAAA' />
                            <Text style={styles.replyText} >Reply</Text>
                        </View>  
                        <View style={styles.commentsVote}>
                            <Icon style={styles.commentsVoteIcon} name="arrow-up" size={10} color= '#AAAAAA' />
                            <Text style={styles.commentsVoteText} >16.0k</Text>
                            <Icon style={styles.commentsVoteIcon} name="arrow-down" size={10} color= '#AAAAAA' />
                        </View>                       
                  </View>

                 <View style={[styles.replyFrame,{ borderLeftColor: '#DDD', borderLeftWidth: 1, paddingLeft: 15, }]}>
                      <View style={styles.commentsTitle}>
                        <Text style={styles.commentsTitleText}>r/news • 2h</Text>
                      </View>
                      <TouchableOpacity onPress={() => this.startConversation()}>
                        <View style={styles.commentsBody}>
                          <Text style={styles.commentsBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden RuleGame theory and the Golden RuleGame theory and the Golden Rule</Text>                   
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
                            <View style={styles.reply}>
                                <Icon style={styles.replyIcon} name="reply" size={10} color= '#AAAAAA' />
                                <Text style={styles.replyText} >Reply</Text>
                            </View>  
                            <View style={styles.commentsVote}>
                                <Icon style={styles.commentsVoteIcon} name="arrow-up" size={10} color= '#AAAAAA' />
                                <Text style={styles.commentsVoteText} >16.0k</Text>
                                <Icon style={styles.commentsVoteIcon} name="arrow-down" size={10} color= '#AAAAAA' />
                            </View>                       
                      </View>

                      <View style={[styles.replyFrame,{ borderLeftColor: '#DDD', borderLeftWidth: 1, paddingLeft: 15, }]}>
                            <View style={styles.commentsTitle}>
                              <Text style={styles.commentsTitleText}>r/news • 2h</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.startConversation()}>
                              <View style={styles.commentsBody}>
                                <Text style={styles.commentsBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden RuleGame theory and the Golden RuleGame theory and the Golden Rule</Text>                   
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
                                  <View style={styles.reply}>
                                      <Icon style={styles.replyIcon} name="reply" size={10} color= '#AAAAAA' />
                                      <Text style={styles.replyText} >Reply</Text>
                                  </View>  
                                  <View style={styles.commentsVote}>
                                      <Icon style={styles.commentsVoteIcon} name="arrow-up" size={10} color= '#AAAAAA' />
                                      <Text style={styles.commentsVoteText} >16.0k</Text>
                                      <Icon style={styles.commentsVoteIcon} name="arrow-down" size={10} color= '#AAAAAA' />
                                  </View>                       
                            </View>
                            
                            <View style={styles.moreReply}>
                              <Text style={styles.moreReplyText}>1 MORE REPLY</Text>
                            </View>

                        {/*sub sub replyFrame*/}
                        </View> 

                        <View style={styles.moreReply}>
                          <Text style={styles.moreReplyText}>12 MORE REPLY</Text>
                        </View>

                  {/*sub replyFrame*/}
                  </View> 

                 {/*replyFrame*/}
                </View> 

             {/*comments*/}
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