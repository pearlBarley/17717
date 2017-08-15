
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Image,
    Platform,
    SectionList,
    Dimensions
} from 'react-native';

import { subscriptions } from '../assets/subscriptions.js';
import AlphabetList from './AlphabetList'

import Icon from 'react-native-vector-icons/FontAwesome'

var {width,height} = Dimensions.get('window');

export class SubscriptionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionData: subscriptions,
            alphabets: [],
        }
        let alphabetsArr = []
        let subscriptionData = subscriptions[1]['data'];
        for (let i=0;i<subscriptionData.length;i++) {
            alphabetsArr.push(subscriptionData[i].alphabet)
        }
        //RN 不支持 chrome支持
        // for ( [key, value] of subscriptions[1]['data'].entries()) {
        //     alphabetsArr.push(value.alphabet)
        // }
        // this.setState({ alphabets: alphabetsArr })
        this.state = {
            sectionData: subscriptions,
            alphabets: alphabetsArr,
        }
        // console.log('alphabetsArr',alphabetsArr)
    }
    
    //行
    renderItem (item) {
        // console.log('item',item)
        // console.log('item.section.title',item.section.title)
        let img = `${item.item.img}${Platform.OS === 'ios' ? '.png' : ''}`;
        
        let itemTextTwo = itemIconView = [];
        if(!item.section.title){
            itemTextTwo =  (<Text style={styles.itemTextTwo}>{item.item.prompt}</Text>);
        } else {
            itemIconView = (<View style={styles.itemIconView}>
                                <Icon style={styles.itemIconO} name="star-o" size={15} color= '#AAAAAA' />
                                <Icon style={styles.itemIcon} name="star" size={15} color= '#AAAAAA' />
                            </View>)
        }

        return (
            <View style={styles.item}>              
                <Image source={{uri: img }} style={styles.itemImg}/>
                <View style={styles.itemSubView}>
                   <Text style={styles.itemTextOne}>{item.item.text}</Text>
                   {itemTextTwo}
                   {/*{(()=>{
                       
                      if(!item.section.title){
                         return (<Text style={styles.itemTextTwo}>{item.item.prompt}</Text>);
                      }
                      return [];
                   })()}*/}
                </View>
                {itemIconView}
            </View>
        ) 
    }
    //头
    renderSection (section) {
        //console.log('section',section)
        if (!section.section.title) {
           return []    //不渲染title
        }
        return (
            <View style={styles.section}>
                <Text style={styles.sectionText}>{section.section.title}</Text>
            </View>
        )
    }
    //下划线
    renderItemSeparator () {
        return (<View style={styles.itemSeparator}/>)
    }
    itemChange = (info)=>{
        // let title = info.viewableItems[0].item.title
        // var reg = new RegExp("^[0-9]*$");
        // if (reg.test(title)) {
        //     DeviceEventEmitter.emit('right',title); //发监听
        // }
    }
    _onSectionselect = (section, index) => {
        //跳转到某一项
        // console.log('this.refs',this.refs)
        // this.refs.list.scrollToIndex({animated: true, index: this.state.sectionSize[index]})
    }
    render() {

        console.log('this.state.alphabets',this.state.alphabets)    
        return (            
            <View style={styles.container} >
                <SectionList
                    ref='sectionList'
                    style={styles.sectionList}
                    renderSectionHeader={(section)=>this.renderSection(section)} //头
                    renderItem={(item)=>this.renderItem(item)} //行
                    ItemSeparatorComponent = {()=>this.renderItemSeparator()}//分隔线
                    sections={this.state.sectionData} //数据
                    onViewableItemsChanged = {(info)=>this.itemChange(info)}  //滑动时调用
                />
                <AlphabetList 
                    sections={ this.state.alphabets}
                    onSectionSelect={this._onSectionselect} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#50555F', 
        flexDirection: 'row', 
        padding: 5   
    },
    sectionList: {
        width: width-80,
    },
    section: {
        height:30,
        backgroundColor:'#FFF',
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    sectionText: {
        fontSize: 13,
        color: '#DDD',
        marginLeft:10,
    },
    item: {
        height:40,
        flexDirection: 'row',
        alignItems:'center',
        marginLeft:15,
    },
    itemSeparator: {
        height:1,
        backgroundColor:'#fff',
    },
    itemImg: {
        width: 30,
        height: 30,
        padding: 5,
    },
    itemSubView: {
        marginLeft: 10,

    },
    itemTextOne: {

    }, 
    itemTextTwo: {
       fontSize:12,
       color: '#DDD'
    },
    itemIconView: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
       alignItems: 'center',
       flex: 1,
       marginRight: 50,
    },
    itemIconO: {
       
    },
    itemIcon: {
       color: '#6BFAA4',
    //    justifyContent: 'flex-end',
    //    alignSelf: 'flex-end',
    },
});