import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import React, { Component } from 'react';
import firebase from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {
  Picker,
  PickerItemProps,
  PickerProps,
} from '@react-native-picker/picker';
import AccountCard from '../components/accountCard/accountCard';
import ChatListItem from '../components/chatListItem';
import { searchNotFound } from '../../assets';
const msg = `Q: Why didn't the sun go to college?
                    
A: Because it already had a million degrees!
😎


-By Aaditya Paul 💀`;

export default class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      type: 'uid',
      searchResults: false,
      notFound: true,
    };
  }

  search = async () => {
    console.log(this.state.search);
    this.setState({ search: '' });
    const searchText = this.state.search.trimEnd();
    if (!searchText == '') {
      if (this.state.type == 'uid') {
        // UID
        const specifiedUser = (
          await firebase().collection('users').doc(searchText).get()
        ).data();
        if (!specifiedUser) {
          this.setState({ notFound: true });
        } else {
          this.setState({ notFound: false });
        }
        // console.log(specifiedUser);
        this.setState({ searchResults: specifiedUser });
      } else if (this.state.type == 'email') {
        //   EMAIL
        const email = await firebase()
          .collection('users')
          .where('email', '==', searchText)
          .get();

        if (!email) {
          this.setState({ notFound: true });
        } else {
          this.setState({ notFound: false });
        }

        email.forEach((doc) => {
          this.setState({ searchResults: doc.data() });
        });
      }
      console.log(this.state.searchResults);
    } else {
      ToastAndroid.show('⚠️ Field required ⚠️', ToastAndroid.LONG);
    }
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
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
              <Text style={styles.headerText}>Add Friends</Text>
              <TouchableOpacity
                onPress={() => {
                  alert(msg);
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
                <FontAwesome5 name="smile-beam" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.pickerTextView}>
            <Text style={styles.pickerText}>
              Select the search type and roll on ✌🏼️ !
            </Text>
          </View>
          <Picker
            style={styles.picker}
            selectedValue={this.state.type}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ type: itemValue })
            }
          >
            <Picker.Item label="UID" value="uid" />
            <Picker.Item label="Email" value="email" />
          </Picker>

          <TextInput
            style={styles.searchBar_darkTheme}
            placeholder={'Search by ' + this.state.type.toUpperCase() + ' 🔍'}
            placeholderTextColor="white"
            keyboardType="web-search"
            onSubmitEditing={this.search}
            onChangeText={(e) => {
              this.setState({ search: e });
            }}
            value={this.state.search}
          />

          {/* line */}
          <View style={styles.line} />
          {/* scroll view */}
          <ScrollView style={{ marginTop: 20 }}>
            {!this.state.notFound ? (
              <View>
                <AccountCard
                  chat={this.state.searchResults}
                  navigate={this.props.navigation.navigate}
                />
              </View>
            ) : (
              <View>
                <Image source={searchNotFound} style={styles.searchNotfound} />
              </View>
            )}
          </ScrollView>
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
  searchBar_darkTheme: {
    backgroundColor: '#1b1b1b',
    padding: 20,
    margin: 20,
    color: 'white',
    fontFamily: 'font3',
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 30,
  },
  container: {
    marginVertical: 20,
    height: '100%',
  },
  picker: {
    backgroundColor: '#1b1b1b',
    margin: 20,
    color: 'white',
    fontFamily: 'font3',
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 0,
  },
  header: {
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
  pickerText: {
    color: 'silver',
    fontFamily: 'font3_bold',
    fontSize: 24,
    margin: 20,
    // borderColor: 'gray',
    borderWidth: 3,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 30,
    padding: 15,
    backgroundColor: 'rgba(81, 86, 99,0.7)',
  },
  line: {
    borderBottomColor: '#aaaaaa',
    borderWidth: 2,
    marginHorizontal: 20,
  },
  searchNotfound: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
});
