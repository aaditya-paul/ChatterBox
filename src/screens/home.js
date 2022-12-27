import {
  Text,
  StyleSheet,
  View,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import React, { Component } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import ChatListItem from '../components/chatListItem/index';
import { Ionicons } from '@expo/vector-icons';
import SettingsFloatBtn from '../components/floatings/SettingsFloatBtn';

const { width, height } = Dimensions.get('screen');
const chat = {
  id: '1',
  user: {
    image:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Zuck Mukerberg',
  },
  lastMessage: {
    time: '9.40 PM',
    msg: 'Byeee',
  },
};

export default class Home extends Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          {/* header  */}
          <View>
            <Text style={styles.text_darkTheme}>ChatterBox</Text>
          </View>
          {/* search */}
          <View>
            <TextInput
              style={styles.searchBar_darkTheme}
              placeholder="Search by name, email or UID  🔍"
              placeholderTextColor="white"
              keyboardType="web-search"
            />
          </View>

          <View>
            <ChatListItem chat={chat} />
            <ChatListItem chat={chat} />
            <ChatListItem chat={chat} />
            <ChatListItem chat={chat} />
            <ChatListItem chat={chat} />
          </View>

          {/* settings floatings */}
          <SettingsFloatBtn navigate={this.props.navigation.navigate} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    height: '100%',
  },
  container: {
    marginVertical: 20,
    height: '100%',
  },
  text_darkTheme: {
    color: 'white',
    fontFamily: 'font1',
    fontSize: 50,
    textAlign: 'center',
    borderBottomColor: '#bfbfbf',
    borderWidth: 3,
    margin: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchBar_darkTheme: {
    backgroundColor: '#1b1b1b',
    padding: 20,
    margin: 10,
    color: 'white',
    fontFamily: 'font3',
    fontSize: 16,
    borderRadius: 20,
    marginBottom: 30,
  },
});
