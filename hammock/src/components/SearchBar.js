
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Image,
    Platform,
    PixelRatio
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: '', 
            focused: false,
        }
    }
    focus() {
        this.setState({ focused: true })
    }
    blur(){
        this.setState({ focused: false })
        //this.refs['inputSearch'].focus();
        this.refs['inputSearch'].blur();
    }
    doSearch() {
        if(this.props.onSearch){
            this.props.onSearch(this.state.text);
        }
    }
    render() {

            
        return (            
            <View style={styles.container} >
                <TextInput
                    ref='inputSearch'
                    multiline={false}
                    placeholder='Find a community or post'
                    placeholderTextColor='#CCC'
                    returnKeyType ="search"
                    underlineColorAndroid= "transparent"       
                    maxLength = {40}
                    blurOnSubmit= {true}
                    clearButtonMode='while-editing'
                    style={styles.inputSearch}
                    value={this.state.text}                  
                    onChangeText={(text) => this.setState({ text }) }                   
                    onFocus = {this.focus.bind(this) }
                    onBlur = {this.blur.bind(this) }
                    onSubmitEditing={this.doSearch.bind(this)}
                    >
                </TextInput>
                {
                  (() => {
                    if (this.state.focused) {                   
                       return (<TouchableHighlight onPress={this.blur.bind(this) } style={styles.button}>
                                    <Text adjustsFontSizeToFit = {true}>
                                        Cancel
                                    </Text>
                               </TouchableHighlight>)
                    }
                  })()
                }

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
    inputSearch: { 
        flex: 5,
        borderColor: 'gray', 
        height: 30,
        backgroundColor: '#EEE',
        padding: 0,
        
    },                                                                  
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: -5,    
        borderColor: 'transparent',
    },
});