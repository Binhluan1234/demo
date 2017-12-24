/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { StackNavigator } from 'react-navigation';

import reducer from './src/reducers/reducer'
import HomeScreen from './src/screens/HomeScreen'
import NewItemScreen from './src/screens/NewItemScreen'
import Test from './src/screens/Test'

const store = createStore(reducer)

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <SimpleApp />
      </Provider>
    );
  }
}

export const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  NewItem: { screen: NewItemScreen },
  Test: { screen: Test }
});

