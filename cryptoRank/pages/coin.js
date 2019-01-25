/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1s
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Image from 'react-native-remote-svg';

export default class App extends Component{

  constructor (props) {
    super (props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  // Carrega da API os dados sobre as moedas 
  componentDidMount (coinID) {
    fetch('https://api.coinranking.com/v1/public/coins/'+{coinID})
    .then ( response => response.json() )
    .then ( responseJson => {
      this.setState ({
        isLoading: false,
        dataSource: responseJson.data.coin,
      })
    })
    .catch ( ( error ) => {
      console.log(error);
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );

    } else {
      return (
        <View style={styles.container}>
            <Image source={{ uri: this.state.dataSource.iconUrl }}
                style={{ width: 50, height: 50}}
            />
        </View>
      );
    }
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
