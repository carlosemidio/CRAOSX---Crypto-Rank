/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Image from 'react-native-remote-svg';

class CoinScreen extends Component{
    static navigationOptions = {
        title: 'Coin Screen',
    };

    constructor (props) {
        super (props);
        this.state = {
          isLoading: true,
          dataSource: null,
        }
    }

    // Carrega da API os dados sobre as moedas 
    componentDidMount () {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');

        fetch('https://api.coinranking.com/v1/public/coin/'+itemId)
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
                      style={{ width: 50, height: 50}}/>
                    <Text style={{fontHeight:'bold'}}>Name: {this.state.dataSource.name}</Text>
                    <Text>Rank: {this.state.dataSource.rank}</Text>
                    <Text>Price: {this.state.dataSource.price}</Text>
                    <Text>Market Cap: {this.state.dataSource.marketCap}</Text>
                    <Text>Change: {this.state.dataSource.change}</Text>
                    
                </View>
            );
        }
    }  
  }

  export default CoinScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      paddingTop: 10,
    },
  });