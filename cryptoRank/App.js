/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';
import {List, ListItem} from 'react-native-elements';

export default class App extends Component{

  constructor (props) {
    super (props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }


  componentDidMount () {
      fetch('https://api.coinranking.com/v1/public/coins')
      .then ( response => response.json() )
      .then ( responseJson => {
        this.setState ({
          isLoading: false,
          dataSource: responseJson.data.coins,
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
        <List>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <ListItem 
                roundAvatar
                title={item.name}
                subtitle={item.rank}
                avatar={{uri: item.iconUrl}}
              />
            )}
          />
        </List>
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
