import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';

export default class Loading extends Component {
  render() {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}
      >
        <ActivityIndicator color="white" size={90} />
        <StatusBar translucent backgroundColor="transparent" />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
