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
} from 'react-native';
import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';
import Bubble from '../components/chatBubbles/bubbles';
import { Ionicons } from '@expo/vector-icons';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   console.log(this.props.route.params.name);
  // }

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
                source={{ uri: this.props.route.params.details.image }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          {/*  chats */}
          <ScrollView style={styles.scroll}>
            <Bubble text="lol" msgType="send" />
            <Bubble text="what happened" msgType="recieve" />
            <Bubble
              text="nothin just my stomach hurts ahhhhhhhhhhhhhh"
              msgType="send"
            />
            {/* dummy chat here */}
            <Bubble text="did u take medicine" msgType="recieve" />
            <Bubble text="No just drinking water" msgType="send" />
            <Bubble text="Ohh..." msgType="recieve" />
            <Bubble text="get Well soon :)" msgType="recieve" />
            <Bubble text="haha u bet i will" msgType="send" />
            <Bubble text="love ya 💀❤️‍🩹🙂" msgType="recieve" />
            <Bubble text="love u too!" msgType="send" />
            <Bubble text="byee" msgType="recieve" />
          </ScrollView>
          {/* textInput / msgbar and send button */}
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="white"
              multiline
            />
            <TouchableOpacity style={styles.sendBtn}>
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
    margin: 20,
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
    bottom: 0,
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
  scroll: {
    marginTop: 110,
    marginBottom: 80,
  },
  headerText: {
    fontFamily: 'font3_bold',
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
  },
  headerPfp: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
});
