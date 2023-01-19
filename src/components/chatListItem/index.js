import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { DUMMY_INFO } from '../../../assets';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Loading from '../../screens/loading';

const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('gone');
      });
  };

  return (
    <View style={styles.main_darkTheme}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('chat', {
            details: { name: chat.name, pic: chat.pic, uid: chat.uid },
          });
        }}
      >
        <View style={styles.wrapper_one}>
          <View style={styles.imgWrapper}>
            <Image
              source={{ uri: chat.pic }}
              style={styles.pfp}
              resizeMode="contain"
            />
          </View>
          <View style={styles.wrapper_two}>
            <View style={styles.wrapper_three}>
              <Text style={styles.chatPreviewText_darkTheme}>{chat.name}</Text>
              <Text style={styles.chatPreviewText_darkTheme}>
                {moment().diff(moment(chat.lastMessage.time), 'days') > 0
                  ? moment(chat.lastMessage.time).format('MM/DD')
                  : moment(chat.lastMessage.time).format('h.mm a')}
                {}
              </Text>
            </View>
            <View style={styles.lastMsgWrapper}>
              <Text
                style={[
                  styles.chatPreviewText_darkTheme,
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
  main_lightTheme: {
    // white theme
    backgroundColor: '#e4e4e4',
    // black theme
    // backgroundColor: '#1b1b1b',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 0,
    borderColor: '#2d2c2c',
    borderRadius: 10,
    borderBottomWidth: 2,
    elevation: 1.5,
  },
  main_darkTheme: {
    // white theme
    // backgroundColor: '#e4e4e4',
    // black theme
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
  },
  chatPreviewText_lightTheme: {
    padding: 5,
    fontFamily: 'font3',
    fontSize: 18,
    // color: '#d6d6d6',
  },
  chatPreviewText_darkTheme: {
    padding: 5,
    fontFamily: 'font3',
    fontSize: 18,
    color: 'white',
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
