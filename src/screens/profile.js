import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  Clipboard,
  Linking,
  Alert,
} from 'react-native';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import QRCode from 'react-native-qrcode-svg';
import Loading from './loading';

const logo = require('../../assets/adaptive-icon.png');

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phn: '',
      email: '',
      uid: '',
      pic: '',
    };
  }

  getUserDetails = async () => {
    const user = await auth().currentUser;
    this.setState({
      name: user.displayName,
      phn: user.phoneNumber,
      email: user.email,
      uid: user.uid,
      pic: user.photoURL,
    });
    console.log(user.photoURL);
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    if (this.state.uid == '' || this.state.pic == '') {
      return <Loading />;
    } else {
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
              <Text style={styles.headerText}>{this.state.name}</Text>
              <Image
                style={styles.headerPfp}
                source={{
                  uri: this.state.pic,
                }}
              />
            </View>
          </View>
          <ScrollView>
            {/* big pfp icon */}
            <View>
              <Image
                style={styles.mainPfp}
                resizeMode="cover"
                source={{
                  uri: this.state.pic,
                }}
              />
            </View>
            {/* edit button */}
            <View>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Notice ⚠️',
                    'To edit your profile you need to change your google information.',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Go to MANAGE GOOGLE ACCOUNTS',
                        style: 'default',
                        onPress: () => {
                          Linking.openURL(
                            'https://myaccount.google.com/?utm_source=chrome-profile-chooser&pli=1'
                          );
                        },
                      },
                    ]
                  );
                }}
                style={styles.editBtn}
              >
                <View>
                  <Text style={styles.editBtnTxt}>EDIT PROFILE</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* qr code */}

            <View style={styles.qrcode}>
              <TouchableOpacity
                onPress={() => {
                  auth()
                    .currentUser.reload()
                    .then(() => {
                      console.log(auth().currentUser.photoURL);
                    });
                  ToastAndroid.show(
                    'Let your friend scan this QR CODE to add you as friend 😄',
                    ToastAndroid.LONG
                  );
                }}
              >
                <QRCode
                  size={230}
                  value={this.state.uid}
                  logo={{ uri: this.state.pic }}
                  logoSize={60}
                  logoBorderRadius={60 / 2}
                  backgroundColor="silver"
                />
              </TouchableOpacity>
            </View>
            {/* details */}
            <View style={styles.details}>
              <View style={styles.detailSegments}>
                <Text style={styles.detailsTitle}>Name</Text>
                <Text style={styles.detailsVal}>{this.state.name}</Text>
              </View>
              <View style={styles.detailSegments}>
                <Text style={styles.detailsTitle}>Email</Text>
                <Text style={styles.detailsVal}>{this.state.email}</Text>
              </View>

              {/* <View style={styles.detailSegments}>
                <Text style={styles.detailsTitle}>Phone</Text>
                <Text style={[styles.detailsVal, { color: 'gray' }]}>
                  {this.state.phn == null ? 'No phone number' : this.state.phn}
                </Text>
              </View> */}

              <View style={styles.detailSegments}>
                <Text style={styles.detailsTitle}>UID</Text>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(this.state.uid);
                    ToastAndroid.show(
                      'Copied to clipboard ✅',
                      ToastAndroid.SHORT
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.detailsVal,
                      { fontFamily: 'font8', color: '#e5d5a9' },
                    ]}
                  >
                    {this.state.uid}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    height: '100%',
  },
  header: {
    // position: 'absolute',
    width: '100%',
    height: 100,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'white',
    borderWidth: 3,
    borderRadius: 50,
    backgroundColor: 'black',
    marginVertical: 20,
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
  mainPfp: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    marginHorizontal: 20,
    alignSelf: 'center',
    borderWidth: 3,
    marginTop: 30,
    elevation: 5,
  },
  editBtn: {
    backgroundColor: '#3D3D90',
    paddingVertical: 20,
    padding: 10,
    alignSelf: 'center',
    margin: 30,
    alignItems: 'center',
    borderRadius: 15,
  },
  editBtnTxt: {
    fontFamily: 'font3_bold',
    fontSize: 15,
    color: 'white',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  details: {
    padding: 10,
    alignSelf: 'center',
    width: '100%',
  },
  detailsTitle: {
    color: 'silver',
    fontSize: 25,
    fontFamily: 'font5',
    textAlign: 'left',
  },
  detailsVal: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'font5',
    textAlign: 'left',
    margin: 10,
    marginTop: 5,
  },

  detailSegments: {
    borderBottomColor: 'gray',
    borderLeftColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  qrcode: {
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 3,
  },
});
