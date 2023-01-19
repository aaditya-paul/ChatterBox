import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../screens/home.js';
import SignUp from '../screens/signUp.js';
import CheckAuthScreen from '../screens/checkAuthScreen.js';
import Chat from '../screens/chat.js';
import Profile from '../screens/profile.js';
import SettingsFloatBtn from '../components/floatings/SettingsFloatBtn.js';
import AddUser from '../screens/addUser.js';

const Stack = createStackNavigator();

export default class Stackk extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="checkAuth"
        >
          <Stack.Screen name="checkAuth" component={CheckAuthScreen} />
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />

          <Stack.Screen
            name="profile"
            component={Profile}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
          />
          <Stack.Screen
            name="addUser"
            component={AddUser}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
