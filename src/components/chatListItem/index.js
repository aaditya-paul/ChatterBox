import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { DUMMY_INFO } from '../../../assets';
import auth from '@react-native-firebase/auth';

const ChatListItem = ({ chat }) => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('gone');
      });
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={logout}>
        <View style={styles.wrapper_one}>
          <View style={styles.imgWrapper}>
            <Image
              source={{ uri: chat.user.image }}
              style={styles.pfp}
              resizeMode="contain"
            />
          </View>
          <View style={styles.wrapper_two}>
            <View style={styles.wrapper_three}>
              <Text style={styles.chatPreviewText}>{chat.user.name}</Text>
              <Text style={styles.chatPreviewText}>
                {' '}
                {chat.lastMessage.time}
              </Text>
            </View>
            <View style={styles.lastMsgWrapper}>
              <Text
                style={[
                  styles.chatPreviewText,
                  { fontSize: 16, fontFamily: 'font4', opacity: 0.7 },
                ]}
              >
                {chat.lastMessage.msg}{' '}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  main: {
    // backgroundColor: 'green',
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
  },
  chatPreviewText: {
    padding: 5,
    fontFamily: 'font3',
    fontSize: 18,
    // color: '#d6d6d6',
  },
  wrapper_three: {
    justifyContent: 'space-between',
    flex: 3,
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  imgWrapper: {
    // backgroundColor: 'yellow',
    flex: 1,
    marginRight: 10,
  },
  wrapper_two: {
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    flex: 3,
    flexDirection: 'column',
    padding: 2,
  },
  lastMsgWrapper: {
    // padding: 5,
    // backgroundColor: 'pink',
    flex: 2,
  },
});
