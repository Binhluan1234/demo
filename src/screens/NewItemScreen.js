import React, { Component } from 'react'
import {
  View,
  Flatlist,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'

import * as Action from '../actions/action'
import BikeSlider from './BikeSlider'
import HtmlPaser from './htmlPaser'

const styles = StyleSheet.create({
  Button: {
    margin: 4,
    padding: 4,
    backgroundColor: 'blue',
    borderBottomWidth: 1,
    borderColor: 'grey'
  }
})

class NewItemScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'NewItemScreen',
  });

  constructor(Props) {
    super(Props);
    this.state = {
      textInput: ''
    }
  }

  onChangeText = (text) => {
    this.setState({
      textInput: text
    })
  }

  onPressAdd = () => {
    const { textInput } = this.state;
    if(textInput.trim() === '') {
      alert('Please input something');
      return;
    }
    try {
      this.setData();
      this.props.addItem(this.state.textInput);
      this.props.navigation.goBack();
    } catch (error) {

    }
  }

  setData = async () => {
    const { data, size } = this.props;
    const { textInput } = this.state;
    const object = {
      size: size + 1,
      data: [
        ...data,
        {
          id: size + 1,
          value: textInput
        }
      ]
    }
    try {
      if (size === 0) {
        await AsyncStorage.setItem('@MyAppDeMo', JSON.stringify(object));
      }else {
        await AsyncStorage.mergeItem('@MyAppDeMo', JSON.stringify(object));
      }
    } catch (error) {
      throw (error);
      alert("ADD ERR" + error);
    }
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Input text"
          onChangeText={this.onChangeText.bind(this)}
          value={this.state.textInput} />
        <TouchableOpacity onPress={this.onPressAdd.bind(this)}>
          <Text style={styles.Button}>ADD</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    size: state.size
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(Action.addItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItemScreen);