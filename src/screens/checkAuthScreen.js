import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';
import Loading from './loading';

export default class CheckAuthScreen extends Component {
  chechAuthState = () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.replace('home');
        console.log(user.email);
      } else {
        this.props.navigation.replace('signUp');
      }
    });
  };

  componentDidMount() {
    this.chechAuthState();
  }
  render() {
    return <Loading />;
  }
}

const styles = StyleSheet.create({});
