import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';
export default class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = { userUid: '' };
  }

  getuid = async () => {
    const uid = await auth().currentUser.uid;
    this.setState({ userUid: uid });
  };

  componentDidMount() {
    this.getuid();
  }

  render() {
    return (
      <View style={styles.main}>
        <View
          style={
            this.props.uid == this.state.userUid ? styles.send : styles.recieve
          }
        >
          <Text style={styles.bubbleText}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    // marginBottom: 20,
  },
  send: {
    backgroundColor: '#495054',
    alignSelf: 'flex-end',
    // ...............................
    paddingVertical: 15,
    paddingHorizontal: 20,
    maxWidth: '80%',
    borderRadius: 30,
    marginVertical: 10,
  },
  recieve: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    borderColor: '#495054',
    borderWidth: 3,
    // ...............................
    paddingVertical: 15,
    paddingHorizontal: 20,
    maxWidth: '80%',
    borderRadius: 30,
    marginVertical: 10,
  },
  bubbleText: {
    color: 'white',
    fontFamily: 'font6',
    fontSize: 18,
    textAlignVertical: 'center',
  },
});
