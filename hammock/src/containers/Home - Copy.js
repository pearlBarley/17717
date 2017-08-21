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


class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sort: "Hot",
      layout: "Card",
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
    // this.setTimeout(() => {},2500)
    setTimeout(()=>this.checkLogin(),0)
  }
  startConversation () {
    alert(1111)
  }
  render () {
    const { navigate, dispatch } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
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
                <TouchableOpacity onPress={() => { dispatch(NavigationActions.navigate({ routeName: 'posts_detail', params: {'postid': 1}, })) }}>
                  <View style={styles.infoBody}>
                    <Text style={styles.infoBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden RuleGame theory and the Golden RuleGame theory and the Golden Rule</Text>                   
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

            {/***********测试布局******/}
            <View style={styles.info}>         
                <View style={styles.infoTitle}>
                  <Text style={styles.infoTitleText}>r/news • 2h</Text>
                  <View style={styles.infoTitleIcon}>
                      <Icon name="ellipsis-h" size={20} color= '#AAAAAA' />
                  </View>
                </View>
                <View style={styles.infoBody}>
                   <Text style={styles.infoBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden RuleGame theory and the Golden RuleGame theory and the Golden Rule</Text>                   
                   <Image
                     source={require('../assets/img/NavLogo.png')}
                     style={styles.thumbnails}
                   />
                </View>
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

            <View style={styles.info}>         
                <View style={styles.infoTitle}>
                  <Text style={styles.infoTitleText}>r/news • 2h</Text>
                  <View style={styles.infoTitleIcon}>
                      <Icon name="ellipsis-h" size={20} color= '#AAAAAA' />
                  </View>
                </View>
                <View style={styles.infoBody}>
                   <Text style={styles.infoBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden RuleGame theory and the Golden RuleGame theory and the Golden Rule</Text>                   
                   <Image
                     source={require('../assets/img/NavLogo.png')}
                     style={styles.thumbnails}
                   />
                </View>
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

            <View style={styles.info}>         
                <View style={styles.infoTitle}>
                  <Text style={styles.infoTitleText}>r/news • 2h</Text>
                  <View style={styles.infoTitleIcon}>
                      <Icon name="ellipsis-h" size={20} color= '#AAAAAA' />
                  </View>
                </View>
                <View style={styles.infoBody}>
                   <Text style={styles.infoBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden RuleGame theory and the Golden RuleGame theory and the Golden Rule</Text>                   
                   <Image
                     source={require('../assets/img/NavLogo.png')}
                     style={styles.thumbnails}
                   />
                </View>
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

            <View style={styles.info}>         
                <View style={styles.infoTitle}>
                  <Text style={styles.infoTitleText}>r/news • 2h</Text>
                  <View style={styles.infoTitleIcon}>
                      <Icon name="ellipsis-h" size={20} color= '#AAAAAA' />
                  </View>
                </View>
                <View style={styles.infoBody}>
                   <Text style={styles.infoBodyText} numberOfLines={4} ellipsizeMode='tail' selectable={true} >Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden Rule,Game theory and the Golden RuleGame theory and the Golden RuleGame theory and the Golden Rule</Text>                   
                   <Image
                     source={require('../assets/img/NavLogo.png')}
                     style={styles.thumbnails}
                   />
                </View>
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
            {/***********测试布局******/}
        </View>

      </ScrollView>
    )
  }
}



// 组件卸载时自动注销定时器，也可以在componentWillUnMount手动注销定时器
reactMixin(Home.prototype, TimerMixin)


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
  infoBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
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