import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Container,
  Footer,
  FooterTab,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Body,
  H3,
  Icon,
} from "native-base";
import verificationStyle from "../../style/verification/verifcationStyle";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";

const AccountSuccess = (props) => {
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
          <Text>Account Created Successfully</Text>
        </View>
       </View  >
      <Footer style={verificationStyle.redirectingWrapper}>
        <FooterTab style={verificationStyle.redirectingWrapper}>
          <Text style={verificationStyle.redirectingText}>Redirecting...</Text>
        </FooterTab>
      </Footer>
     </View>
  );
};

export default AccountSuccess;
