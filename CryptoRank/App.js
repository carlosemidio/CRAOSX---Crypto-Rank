/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import CoinScreen from './screens/CoinScreen';

export default class App extends React.Component {
  render () {
    return (
      <AppNavigator/>
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: HomeScreen,
  Coin: CoinScreen
});

const AppNavigator = createAppContainer(MainNavigator);
