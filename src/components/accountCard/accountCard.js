import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

const lol = 'lol';

export default class AccountCard extends Component {
  componentDidMount() {
    console.log(this.props.chat);
  }
  render() {
    return (
      <View style={styles.main_darkTheme}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigate('chat', {
              details: {
                name: this.props.chat.name,
                pic: this.props.chat.pic,
                lastMessage: {
                  time: '9.40 PM',
                  msg: 'Byeee',
                },
                uid: this.props.chat.uid,
              },
            });
          }}
        >
          <View style={styles.wrapper_one}>
            <View style={styles.imgWrapper}>
              <Image
                source={{ uri: this.props.chat.pic }}
                style={styles.pfp}
                resizeMode="contain"
              />
            </View>
            <View style={styles.wrapper_two}>
              <Text style={styles.chatPreviewText_darkTheme}>
                {this.props.chat.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_darkTheme: {
    backgroundColor: '#1b1b1b',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 0,
    borderColor: '#2d2c2c',
    borderRadius: 10,
    borderBottomWidth: 2,
    elevation: 1.5,
  },
  pfp: {
    height: 80,
    width: 80,
    borderRadius: 30,
  },
  wrapper_one: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  chatPreviewText_darkTheme: {
    fontFamily: 'font3',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    // backgroundColor: 'red',
  },

  imgWrapper: {
    flex: 1,
  },
  wrapper_two: {
    justifyContent: 'center',
    flex: 3,

    padding: 2,
  },
});
