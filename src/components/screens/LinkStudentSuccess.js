import React from "react";
import { View, Image, StyleSheet, ImageBackground, Dimensions } from "react-native";
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
const windowHeight = Dimensions.get('window').height;
const LinkStudentSuccess = (props) => {
  React.useEffect(() => {
    setTimeout(() => props.navigation.navigate("Home"), 3000);
  }, []);

  const { navigation } = props;
  return (
    <Container style={[verificationStyle.container, { position: "relative", height: windowHeight - 60, paddingTop: 0 }]}>
      <Content style={[loginStyle.spacing,{paddingTop: 20}]} >
        <Body>
          <Image
            style={verificationStyle.successIcon}
            source={require("../../../assets/tick.png")}
          />
        </Body>
        <Body style={loginStyle.bodyContainer}>
          <H3 style={[globalStyle.h3, { fontSize: 32, fontWeight: "bold", zIndex: 999, position: "relative" }]}>Successful </H3>
          <Text style={{ color: "#A7A7BF", fontSize: 20, zIndex: 999, position: "relative" }}>Student Successfully Linked</Text>
        </Body>
        <ImageBackground
          style={{
            width: '100%',
            height: 300,
            position: "relative",
            bottom: 0,
          }
          }
          source={require('./../../../assets/bgGradient.png')}
          resizeMode={'stretch'}
        >
          <View style={{ position: "absolute", bottom: 30, left: 0, right: 0, textAlign: "center", margin: "auto", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
            <Text style={verificationStyle.redirectingText}>Redirecting ...</Text>
          </View>
        </ImageBackground>
      </Content>
    </Container>
  );
};

export default LinkStudentSuccess;
