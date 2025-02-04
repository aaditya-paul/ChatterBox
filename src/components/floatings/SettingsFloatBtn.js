import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, { Component } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default class SettingsFloatBtn extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      popUpProfile: new Animated.Value(0),
      popUpProfile2: new Animated.Value(0),
      popUpProfile3: new Animated.Value(0),
      opacity: new Animated.Value(0),
    };
  }

  logout = async () => {
    await GoogleSignin.signOut().then(() => {
      auth().signOut();
    });
  };

  animateOnClick = async () => {
    await this.setState({ clicked: !this.state.clicked });
    if (this.state.clicked) {
      Animated.spring(this.state.popUpProfile, {
        toValue: 90,
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.popUpProfile2, {
        toValue: 90 * 2,
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.popUpProfile3, {
        toValue: 90 * 3,
        useNativeDriver: false,
      }).start();

      Animated.timing(this.state.opacity, {
        toValue: 1,
        useNativeDriver: false,
        timing: 10,
      }).start();
    } else {
      Animated.spring(this.state.popUpProfile, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.popUpProfile2, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.popUpProfile3, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      Animated.timing(this.state.opacity, {
        toValue: 0,
        useNativeDriver: false,
        timing: 10,
      }).start();
    }
  };

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    return (
      <View style={styles.floatings_main}>
        <Animated.View
          style={[
            styles.newChatWrapper,
            {
              bottom: this.state.popUpProfile3,
              opacity: this.state.opacity,
              position: 'absolute',
            },
          ]}
        >
          <TouchableOpacity onPress={this.logout} style={styles.newChatWrapper}>
            <View style={[styles.newChat, { backgroundColor: '#F6E88C' }]}>
              <AntDesign name="logout" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.newChatWrapper,
            {
              bottom: this.state.popUpProfile2,
              opacity: this.state.opacity,
              position: 'absolute',
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              this.animateOnClick();
              this.props.navigate('addUser');
            }}
            style={styles.newChatWrapper}
          >
            <View style={[styles.newChat, { backgroundColor: 'pink' }]}>
              <Ionicons name="person-add" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.newChatWrapper,
            {
              bottom: this.state.popUpProfile,
              opacity: this.state.opacity,
              position: 'absolute',
            },
          ]}
        >
          <TouchableOpacity
            onPress={async () => {
              this.props.navigate('profile');
              this.animateOnClick();
            }}
            style={styles.newChatWrapper}
          >
            <Image
              source={
                auth().currentUser.photoURL == null
                  ? {
                      uri: 'https://i.pinimg.com/236x/fe/15/9f/fe159f0fa49b03c2907c0826de7ef291.jpg',
                    }
                  : {
                      uri: auth().currentUser.photoURL,
                    }
              }
              style={styles.floatingProfileBtn}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={styles.newChatWrapper}>
          <TouchableOpacity
            onPress={this.animateOnClick}
            style={styles.newChat}
          >
            <Ionicons name="options" size={30} color="black" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newChat: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: '#9EC771',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  newChatWrapper: {},
  floatingProfileBtn: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
  floatings_main: {
    position: 'absolute',
    zIndex: 5,
    right: 20,
    elevation: 15,
    bottom: 20,
  },
});
