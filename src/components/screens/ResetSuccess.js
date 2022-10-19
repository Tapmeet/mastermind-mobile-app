import React from "react";
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
// import {
//   Container,
//   //CheckBox,
//   Footer,
//   FooterTab,
//   Content,
//   Form,
//   Item,
//   Input,
//   Label,
//   Button,
//   Body,
//   H3,
//   Icon,
// } from "native-base";
import verificationStyle from "../../style/verification/verifcationStyle";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";

const ResetSuccess = (props) => {
  const win = Dimensions.get("window");
  React.useEffect(() => {
    setTimeout(() => props.navigation.navigate("Login"), 5000);
  }, []);
  const { navigation } = props;
  return (
    <View style={verificationStyle.container}>
      <View style={loginStyle.spacing} padder>
        <View>
          <Image
            style={verificationStyle.successIcon}
            source={require("../../../assets/Successfull.png")}
          />
        </View>
        <View style={loginStyle.bodyContainer}>
          <Text style={globalStyle.h3}>Successful  </Text>
          <Text style={verificationStyle.successText}>
            Your Password changed successfully
          </Text>
        </View>
      </View  >
      <View style={[verificationStyle.redirectingWrapper, {
        top: win.height - 150
      }]}>
        <View style={verificationStyle.redirectingWrapper}>
          <Text style={verificationStyle.redirectingText}>Redirecting...</Text>
        </View>
      </View>
    </View>
  );
};

export default ResetSuccess;
