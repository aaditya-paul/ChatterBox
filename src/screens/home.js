import { Text, StyleSheet, View, Button, ScrollView } from 'react-native';
import React, { Component } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import ChatListItem from '../components/chatListItem';

const chat = {
  id: '1',
  user: {
    image:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Zuck',
  },
  lastMessage: {
    time: '9.30 PM',
    msg: 'Byeee',
  },
};

export default class Home extends Component {
  logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('gone');
      });
  };
  render() {
    return (
      <View style={styles.main}>
        <View style={{ marginTop: 30 }}>
          <ChatListItem chat={chat} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    // backgroundColor: '#003217',
    height: '100%',
  },
});
