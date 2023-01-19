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
  FlatList,
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
import firestore from '@react-native-firebase/firestore';
import Loading from './loading';

const { width, height } = Dimensions.get('screen');

const chat = [
  {
    id: '4quqLcb9ncXVUaADO6o40ZaBuh52',
    lastMessage: {
      msg: 'ko',
      time: 'Thu Jan 19 2023 18:27:23 GMT+0530 (IST)',
    },
    name: 'Aaditya Paul',
    pic: 'https://lh3.googleusercontent.com/a/AEdFTp5TF4RO1W1iWKdDYJKsZNrh7Lx5pveKVCDfQNUzRQ=s96-c',
    uid: '4quqLcb9ncXVUaADO6o40ZaBuh52',
  },
  {
    id: '4quqLcb9ncXVUaADO6o40ZaBuh52',
    lastMessage: {
      msg: 'ah',
      time: 'Thu Jan 19 2023 18:29:51 GMT+0530 (IST)',
    },
    name: 'Aaditya Paul',
    pic: 'https://lh3.googleusercontent.com/a/AEdFTp5TF4RO1W1iWKdDYJKsZNrh7Lx5pveKVCDfQNUzRQ=s96-c',
    uid: '4quqLcb9ncXVUaADO6o40ZaBuh52',
  },
];

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
    };
  }

  fetchRecentChats = async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.data().recentChat);
        let data = [];
        data.push(querySnapshot.data().recentChat);
        this.setState({ data: data });
      });
  };

  componentDidMount() {
    this.fetchRecentChats();
  }

  componentDidUpdate() {
    this.fetchRecentChats();
  }

  render() {
    if (this.state.data !== '') {
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
              <FlatList
                renderItem={({ item }) => {
                  return <ChatListItem chat={item} />;
                }}
                data={this.state.data}
                keyExtractor={(_, i) => i.toString()}
              />
            </View>

            {/* settings floatings */}
            <SettingsFloatBtn navigate={this.props.navigation.navigate} />
          </View>
        </View>
      );
    } else {
      return <Loading />;
    }
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
