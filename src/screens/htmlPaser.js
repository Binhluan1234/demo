import React, { Component } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
var HTMLParser = require('fast-html-parser');
// import HTMLParser from 'fast-html-parser'
import getDataApi from './getDataAPI'

class htmlPaser extends Component {

  componentWillMount() {

    let responseJson = getDataApi(1);
    

    var root = HTMLParser.parse('<ul id="list"><li>Hello World</li></ul> <ul id="list2"><li>Hello World 2</li></ul>');
    alert(JSON.stringify(root.querySelector('#list2').rawText));

    // fetch('http://dantri.com.vn/su-kien/toan-canh-hau-qua-bao-so-12-chua-tung-co-hon-20-nam-o-nha-trang-20171105073925328.htm')
    // .then((resp)=>{ return resp.text() }).then((text)=>{ console.log(text) })

    // let response = await fetch('http://dantri.com.vn/su-kien/toan-canh-hau-qua-bao-so-12-chua-tung-co-hon-20-nam-o-nha-trang-20171105073925328.htm');
    // let responseJson = await response.Text();
    root = HTMLParser.parse(responseJson);
    console.log('ABC')
    console.log(root);
    // return responseJson.movies;

  }

  render() {
    return(
      <View>
        <Text>ABC</Text>
      </View>
    );
  }
}

export default htmlPaser;