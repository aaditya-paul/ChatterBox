import { Text, StyleSheet, View, Button, Image } from 'react-native';
import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { logo, custom_fonts } from '../../assets';
import * as Fonts from 'expo-font';
import Loading from './loading';

GoogleSignin.configure({
  webClientId:
    '133060323513-ilfliluaeivqptei7m2tv7rp85h8filh.apps.googleusercontent.com',
});

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }

  loadFont = async () => {
    await Fonts.loadAsync(custom_fonts).then(() => {
      this.setState({ fontsLoaded: true });
    });
  };

  chechAuthState = () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.replace('home');
        console.log(user);
      } else {
        return null;
      }
    });
  };

  componentDidMount() {
    this.loadFont();
    this.chechAuthState();
  }

  googleSignin = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Get the users ID token
    const { idToken, user } = await GoogleSignin.signIn();
    console.log(user);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.main}>
          <View style={{ margin: 30 }}>
            <View style={styles.mainSubset}>
              <Image
                source={logo}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: 'center',
                  marginVertical: 50,
                }}
              />
              <Text style={styles.text}>Get Started</Text>

              <GoogleSigninButton
                style={{
                  width: '100%',
                  height: 72,
                  marginTop: 50,
                }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.googleSignin}
              />
            </View>
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
    height: '100%',
    backgroundColor: 'black',
  },
  mainSubset: {
    marginTop: 80,
    padding: 15,
  },
  text: {
    fontSize: 34,
    fontFamily: 'font2',
    color: 'white',
    textAlign: 'center',
    borderBottomColor: '#73C398',
    borderColor: 'transparent',
    borderWidth: 3,
  },
});
