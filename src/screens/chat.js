import {
  Text,
  StyleSheet,
  View,
  Button,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import React, { Component, createRef } from 'react';
import auth from '@react-native-firebase/auth';
import Bubble from '../components/chatBubbles/bubbles';
import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatArray: [],
      msgwritten: '',
      msgDisplayed: '',
      scrollY: new Animated.Value(0),
    };
    this.flashListRef = createRef();
  }

  setRecentChat = async (time) => {
    var obj = {
      id: this.props.route.params.details.uid,
      uid: this.props.route.params.details.uid,
      name: this.props.route.params.details.name,
      pic: this.props.route.params.details.pic,
      lastMessage: {
        msg: this.state.msgwritten,
        time: time,
      },
    };

    firestore().collection('users').doc(auth().currentUser.uid).update({
      recentChat: obj,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
  };

  postMsgs = async () => {
    var createdAt = Date().toString();
    var msg = {
      msg: this.state.msgwritten,
      uid: auth().currentUser.uid,
      createdAt: createdAt,
    };
    if (this.state.msgwritten !== '') {
      await firestore()
        .collection('msg')
        .doc(auth().currentUser.uid)
        .collection(this.props.route.params.details.uid)
        .doc()
        .set(msg);

      await firestore()
        .collection('msg')
        .doc(this.props.route.params.details.uid)
        .collection(auth().currentUser.uid)
        .doc()
        .set(msg);

      this.setRecentChat(createdAt);

      this.setState({ msgwritten: '' });
    } else {
      return null;
    }
  };

  fetchMsgs = async () => {
    await firestore()
      .collection('msg')
      .doc(auth().currentUser.uid)
      .collection(this.props.route.params.details.uid)
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot.empty) {
          return null;
        } else {
          let sortedArray = documentSnapshot.docs.sort((a, b) => {
            return new Date(a._data.createdAt) - new Date(b._data.createdAt);
          });
          this.setState({ chatArray: sortedArray });
        }
      });
  };

  componentDidMount() {
    this.fetchMsgs();
  }
  componentWillUnmount() {
    this.flashListRef = null;
  }

  render() {
    return (
      <View style={styles.main}>
        {/* header */}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={[
                styles.headerPfp,
                {
                  backgroundColor: '#3D3D90',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}
            >
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {this.props.route.params.details.name}
            </Text>
            <TouchableOpacity>
              <Image
                style={styles.headerPfp}
                source={{ uri: this.props.route.params.details.pic }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          {/*  chats */}

          <View style={styles.scroll}>
            <FlatList
              ref={this.flashListRef}
              onContentSizeChange={() => {
                if (this.flashListRef.current)
                  this.flashListRef.current.scrollToEnd({ animated: true });
              }}
              renderItem={function ({ item }) {
                return <Bubble text={item._data.msg} uid={item._data.uid} />;
              }}
              data={this.state.chatArray}
              keyExtractor={(_, i) => i.toString()}
            />
          </View>

          {/* textInput / msgbar and send button */}
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="white"
              onChangeText={(txt) => {
                this.setState({ msgwritten: txt, msgDisplayed: txt });
              }}
              value={this.state.msgDisplayed}
              multiline
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => {
                this.setState({ msgDisplayed: '' });
                this.postMsgs();
                // this.fetchMsgs();
              }}
            >
              <Ionicons name="send" size={30} color="black" />
            </TouchableOpacity>
          </View>
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
    marginHorizontal: 20,
    height: '100%',
  },
  textInput: {
    padding: 15,
    borderColor: '#495054',
    borderWidth: 2,
    borderRadius: 30,
    color: 'white',
    backgroundColor: 'black',
    fontSize: 18,
    fontFamily: 'font6',
    flex: 3,
    marginRight: 5,
    maxHeight: 150,
  },
  textInputWrapper: {
    position: 'absolute',
    bottom: 10,
    zIndex: 5,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  sendBtn: {
    backgroundColor: '#6CBC72',
    padding: 5,
    borderRadius: 60 / 2,
    alignItems: 'center',
    height: 60,
    width: 60,
    justifyContent: 'center',
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
  scroll: {
    marginTop: 130,
    marginBottom: 80,
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: 100,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'white',
    borderWidth: 3,
    borderRadius: 50,
    backgroundColor: 'black',
    marginTop: 20,
  },
  headerText: {
    fontFamily: 'font3_bold',
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
    flex: 2,
    textAlign: 'center',
  },
  headerPfp: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginHorizontal: 20,
  },
});
