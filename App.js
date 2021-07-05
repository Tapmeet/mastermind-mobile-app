import React from "react";
import Main from './Main'
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Provider as StoreProvider } from 'react-redux'
import configureStore from './src/redux/store'
import { View } from "react-native";
import { Text } from "native-base";

export default class App extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      "HKGrotesk-Regular": require("./assets/fonts/HKGrotesk-Regular.ttf"),
      "HKGrotesk-Bold": require("./assets/fonts/HKGrotesk-Bold.ttf"),
      ...Ionicons.font,
    })
    //await Font.loadAsync(customFonts);
    this.setState({ loading: false })
  }
  render() {
    if (this.state.loading) {
      return (
        <View><Text>Loading...</Text></View>
      );
    }
    else {
      return (
        <StoreProvider store={configureStore()}>
          <Main />
        </StoreProvider>
      )
    }
  }

};


