import React from "react";
import { StyleSheet, LogBox  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from 'react-redux'
import {
  LoginScreen,
  SignUpScreen,
  VerificationCodeScreen,
  ResetSuccessScreen,
  ResetPasswordScreen,
  VerificationScreen,
  AccountSuccessScreen,
  ForgetPasswordScreen,
  VerificationLinkStudentSignupScreen
} from "./src/components/screens";
import { Drawer } from "./src/components/sidebar";
import { Logs } from 'expo'

if ( __DEV__ ) {
  const isRemoteDebuggingEnabled = typeof atob !== 'undefined';
  if (isRemoteDebuggingEnabled) {
    Logs.disableExpoCliLogging();
  } else {
    Logs.enableExpoCliLogging();
  }
}
LogBox.ignoreAllLogs();
const Main = (props) => {
  const userId = useSelector(state => state);
  // console.log(userId)
  const AuthStack = createStackNavigator();
  return (  
    <NavigationContainer>
      {typeof userId !== 'undefined' && userId.userDataReducer.length > 0 ? (
        <Drawer /> 
      ) : (   
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
          }}  
        >
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
          <AuthStack.Screen
            name="Verification"
            component={VerificationScreen}
          />
          <AuthStack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
          <AuthStack.Screen
            name="AccountSuccess"
            component={AccountSuccessScreen}
          />
          <AuthStack.Screen
            name="VerificationCode"
            component={VerificationCodeScreen}
          />
          <AuthStack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
          />
          <AuthStack.Screen
            name="ResetSuccess"
            component={ResetSuccessScreen}
          />
          <AuthStack.Screen
            name="VerificationLinkStudentSignup"
            component={VerificationLinkStudentSignupScreen}
          /> 
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
