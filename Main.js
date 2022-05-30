import React from "react";
import { StyleSheet, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import {
  LoginScreen,
  SignUpScreen,
  VerificationCodeScreen,
  ResetSuccessScreen,
  ResetPasswordScreen,
  VerificationScreen,
  AccountSuccessScreen,
  ForgetPasswordScreen,
  VerificationLinkStudentSignupScreen,
  VerificationSignupsScreen,
  WelcomeScreen
} from "./src/components/screens";
import { Drawer } from "./src/components/sidebar";
import { Logs } from "expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LOGGED_IN_USER from "./src/redux/User";
if (__DEV__) {
  const isRemoteDebuggingEnabled = typeof atob !== "undefined";
  if (isRemoteDebuggingEnabled) {
    Logs.disableExpoCliLogging();
  } else {
    Logs.enableExpoCliLogging();
  }
}
LogBox.ignoreAllLogs();

const Main = (props) => {
  const dispatch = useDispatch();
  const userData = (userInfo) =>
    dispatch({ type: "LOGGED_IN_USER", payload: userInfo });
  const userId = useSelector((state) => state);
  async function getData() {
    try {
      const value = await AsyncStorage.getItem("tokenCheck");
      if (value != '' && value != null && typeof userId !== "undefined" && userId.userDataReducer.length == 0) {
        userData({ id: 1, access_Token: value });
      }
    } catch (e) { }
  }
  getData()
  const AuthStack = createStackNavigator();
  return (
    <NavigationContainer>
      {typeof userId !== "undefined" && userId.userDataReducer.length > 0 ? (
        <Drawer />
      ) : (
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
          <AuthStack.Screen name="Verification" component={VerificationScreen} />
          <AuthStack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
          <AuthStack.Screen name="AccountSuccess" component={AccountSuccessScreen} />
          <AuthStack.Screen name="VerificationCode" component={VerificationCodeScreen} />
          <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <AuthStack.Screen name="ResetSuccess" component={ResetSuccessScreen} />
          <AuthStack.Screen name="VerificationLinkStudentSignup" component={VerificationLinkStudentSignupScreen} />
          <AuthStack.Screen name="VerificationSignups" component={VerificationSignupsScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Main;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
