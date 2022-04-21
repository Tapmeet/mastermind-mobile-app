import React from "react";
import Main from "./Main";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from 'expo-app-loading';
import { Provider as StoreProvider } from "react-redux";
import configureStore from "./src/redux/store";
import { View } from "react-native";
import { Text } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class App extends React.Component {
  state = {
    loading: true,
  };
  async componentDidMount() {
    await Font.loadAsync({ 
      HKGrotesk: require("./assets/fonts/HKGrotesk-Regular.ttf"),
      Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("./assets/fonts/Poppins-Medium.ttf"),
      Roboto_medium: require("./assets/fonts/Roboto-Regular.ttf"),
      ...Ionicons.font,
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <AppLoading />;
    } else {
      return (
        <StoreProvider store={configureStore()}>
          <Main />
        </StoreProvider>
      );
    }
  }
}
