import React from "react";
import { AppRegistry } from "react-native";
import { expo } from "./app.json";
import { registerRootComponent } from "expo";
import Main from "./Main";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { Provider as StoreProvider } from "react-redux";
import configureStore from "./src/redux/store";
import { View, Text } from "react-native";
// import { Text } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useFonts } from "expo-font";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function App() {
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  let [fontsLoaded] = useFonts({
    HKGrotesk: require("./assets/fonts/HKGrotesk-Regular.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Medium.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto-Regular.ttf"),
    ...Ionicons.font,
  });

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <StoreProvider store={configureStore()}>
        <Main />
      </StoreProvider>
    );
  }
  async function registerForPushNotificationsAsync() {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }
  // AppRegistry.registerRunnable((expo) => {
  //   try {
  //     const App = require("./App").default;
  //     AppRegistry.registerComponent(expo.name, () => App);
  //     AppRegistry.runApplication(expo.name);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
}
export default App;
