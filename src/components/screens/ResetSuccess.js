import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Container,
  //CheckBox,
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

const ResetSuccess = (props) => {
  React.useEffect(() => {
    setTimeout(() => props.navigation.navigate("Login"), 5000);
  }, []);
  const { navigation } = props;
  return (
    <Container style={verificationStyle.container}>
      <Content style={loginStyle.spacing} padder>
        <Body>
          <Image
            style={verificationStyle.successIcon}
            source={require("../../../assets/Successfull.png")}
          />
        </Body>
        <Body style={loginStyle.bodyContainer}>
          <H3 style={globalStyle.h3}>Successful </H3>
          <Text style={verificationStyle.successText}>
            Your Password changed successfully
          </Text>
        </Body>
      </Content>
      <Footer style={verificationStyle.redirectingWrapper}>
        <FooterTab style={verificationStyle.redirectingWrapper}>
          <Text style={verificationStyle.redirectingText}>Redirecting...</Text>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default ResetSuccess;
