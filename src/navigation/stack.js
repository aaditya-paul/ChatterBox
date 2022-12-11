import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home.js';
import SignUp from '../screens/signUp.js';
import CheckAuthScreen from '../screens/checkAuthScreen.js';

const Stack = createStackNavigator();

export default class Stackk extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="checkAuth"
        >
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="checkAuth" component={CheckAuthScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
