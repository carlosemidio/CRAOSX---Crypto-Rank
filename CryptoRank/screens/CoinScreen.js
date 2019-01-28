/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import Image from 'react-native-remote-svg';
import Table from 'react-native-simple-table';

const columns = [
    {
      title: 'Data',
      dataIndex: 'timestamp',
      width: 170
    },
    {
    title: 'Price($)',
        dataIndex: 'price',
        width: 170
    },
];

class CoinScreen extends Component{
    static navigationOptions = {
        title: 'Coin Screen',
    };

    constructor (props) {
        super (props);
        this.state = {
          isLoading: true,
          dataSource: null,
          history: null,
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
            isLoading: true,
            dataSource: responseJson.data.coin,
            history: null,
          })

          this.getHistory(itemId);
        })
        .catch ( ( error ) => {
          console.log(error);
        });
    }

    getHistory (itemId) {
        fetch('https://api.coinranking.com/v1/public/coin/'+itemId+'/history/7d?base=EUR')
        .then ( response => response.json() )
        .then ( responseJson => {
            this.setState ({
                isLoading: false,
                dataSource: this.state.dataSource,
                history: responseJson.data.history,
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
            
            var dt = null;
            this.state.history.forEach(element => {
                dt = new Date(element.timestamp);
                element.timestamp = (dt.getDate()+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear())+' '+dt.getHours()+':'+dt.getMinutes();
            });

            return (
                <View
                ref={'abc'}
                directionalLockEnabled={false}
                horizontal={true} 
                style={styles.container}>      
                    <Image source={{ uri: this.state.dataSource.iconUrl }}
                      style={{ width: 50, height: 50}}/>
                    <Text style={{fontHeight:'bold'}}>Name: {this.state.dataSource.name}</Text>
                    <Text>Rank: {this.state.dataSource.rank}</Text>
                    <Text>Price: {this.state.dataSource.price}</Text>
                    <Text>Market Cap: {this.state.dataSource.marketCap}</Text>
                    <Text>Change: {this.state.dataSource.change}</Text>
                
                    <View style={styles.container}>
                        <Text style={styles.title}>History Last 7 days</Text>
                        <Table height={250} columnWidth={60} columns={columns} dataSource={this.state.history.reverse()} />
                    </View>
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
    title: {
      fontSize: 18,
      padding: 10,
      textAlign: 'center'
    }
  });