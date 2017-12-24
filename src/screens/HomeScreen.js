import React, { Component } from 'react'
import {
  View,
  FlatList,
  Text,
  Button,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';

import * as Action from '../actions/action'

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ItemList: {
    flex: 1,
    flexDirection: 'row',
    width,
    borderBottomWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ItemText: {
    flex: 8,
    margin: 4,
    padding: 8,
    color: '#6F6F6F',
    fontSize: 18,
    fontWeight: 'bold'
  },
  ItemIcon: {
    flex: 1,
    marginLeft: 15
  },
  btnEditIcon: {
    flex: 1,
  },
  btnAdd: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2DB84C',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textAdd: {
    textAlign: 'center',
    fontSize: 40,
    height: '100%',
    color: '#FFFFFF'
  }
})

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'List'
  });

  _keyExtractor = (item, index) => item.id;

  componentWillMount() {
    const { inIt } = this.props;
    const data = this.getData();
    if (data !== null) {

    } else {
      this.props.inIt(null, 0);
    }
  }

  getData = async () => {
    const { inIt } = this.props;
    try {
      const value = await AsyncStorage.getItem('@MyAppDeMo');
      const dataJson = await JSON.parse(value);
      if (value !== null) {
        inIt(dataJson.data, parseInt(dataJson.size) + 1);
      } else {
        inIt([], 0);
      }
    } catch (error) {
      alert('' + error);
    }
  }

  onPressAdd = () => {
    const { navigate } = this.props.navigation;
    navigate('NewItem', { user: 'Luannb' });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) =>
            <View style={styles.ItemList}>
              <FontAwesomeIcon name="calendar-plus-o" size={17} color="#666" style={styles.ItemIcon} />
              <Text style={styles.ItemText}>{item.value}</Text>
              <TouchableOpacity style={styles.btnEditIcon} onPress={this.onPressAdd.bind(this)}>
                <FontAwesomeIcon name="pencil-square-o" size={22} color="#2DB84C" />
              </TouchableOpacity>
            </View>
          }
        />
        <TouchableOpacity style={styles.btnAdd} onPress={this.onPressAdd.bind(this)}>
          <Text style={styles.textAdd}>&#43;</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inIt: (items, size) => dispatch(Action.inIt(items, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);