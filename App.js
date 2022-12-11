import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'expo-dev-client';
import Stackk from './src/navigation/stack';
import { custom_fonts } from './assets';
import * as Fonts from 'expo-font';
import React from 'react';
import Loading from './src/screens/loading';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }
  componentDidMount() {
    this.loadFont();
  }

  loadFont = async () => {
    await Fonts.loadAsync(custom_fonts).then(() => {
      this.setState({ fontsLoaded: true });
    });
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <>
          <Stackk />
          <StatusBar translucent backgroundColor="transparent" />
        </>
      );
    } else {
      return <Loading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
