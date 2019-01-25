/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1s
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {List, ListItem, Avatar, SearchBar, colors} from 'react-native-elements';
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

  renderSeparator = () => {
    return (
      <View
        style = {{
          height:1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  }

  renderHeater = () => {
    return <SearchBar placeholder="insert coin code..." lightTheme round/>
  }

  renderFooter = () => {
    if (!this.state.isLoading) {
      return null;
    }

    return (<View style={{paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE'}}>
        <ActivityIndicator animating size='large' />
      </View>);
  }

  change = (item) => {
    if (item.change < 0) {
      return (
        <View style={{flexDirection: 'row', paddingLeft: 5}}>
          <Text>{item.name}</Text>
          <Text style={{marginLeft:10}}>${item.price}</Text>
          <Text style={{color: '#d94040', marginLeft:'2.5%'}}>{item.change}%</Text>
        </View>
      );
    } else if (item.change == 0) {
      return (
        <View style={{flexDirection: 'row', paddingLeft: 5}}>
          <Text>{item.name}</Text>
          <Text style={{marginLeft:10}}>${item.price}</Text>
          <Text style={{color: '#428bca', marginLeft:'2.5%'}}>{item.change}%</Text>
        </View>
      );
    } 
    
    return (
      <View style={{flexDirection: 'row', paddingLeft: 5}}>
          <Text>{item.name}</Text>
          <Text style={{marginLeft:10}}>${item.price}</Text>
          <Text style={{color: '#009e73', marginLeft:'2.5%'}}>{item.change}%</Text>
        </View>
    );
  }

  coinPressed = (item) => {
    alert(item.name)
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
              <TouchableWithoutFeedback onPress={ () => this.coinPressed(item)}>
                <ListItem 
                  roundAvatar
                  title={this.change(item)}
                  avatar={
                    <Image source={{ uri: item.iconUrl }}
                    style={{ width: 50, height: 50}}/>
                  }
                />
              </TouchableWithoutFeedback>
            )}

            keyExtractor = {item => item.rank}
            ItemSeparatorComponent = {this.renderSeparator}
            ListHeaderComponent = {this.renderHeater}
            ListFooterComponent = {this.renderFooter}
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
