

import Share from 'react-native-share';
import{
    Platform,
  }from 'react-native'

export function onShare (post) {
    let lables = '';
    let lan = '';
    var Lans_Name = '';
    var country = '';
    var website = '';
    var location = '';
    var logo = '';
    var description = '';
    var note = '';
    var photoPath = '';
    var infoMessage = '';
    var title = post.title

    if(Platform.OS == 'ios'){
        infoMessage = `${title}`
    }else{
        infoMessage = `${title}`
    }
    Share.open({
        // url:"http://a.com",
        message: infoMessage,
        title: post.title,
        subject:'post',
    }, (e) => {
        console.log(e);
    })
}

