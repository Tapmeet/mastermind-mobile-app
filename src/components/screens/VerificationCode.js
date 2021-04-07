import React, { useRef } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import OtpInputs from "./../Utility/Outinputs";
import {
  Container,
  CheckBox,
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

const VerificationCode = (props) => {
  const [otp, setOtp] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const getOtp = (otp) => {
    setOtp(otp);
  };

  submitForm = () => {
    if (otp != props.route.params.verificationKey) {
      setErrorMessage("Wrong verifcation code");
    } else {
      props.navigation.navigate("ResetPassword", {
        code: props.route.params.code,
        verificationKey: props.route.params.verificationKey,
        email: props.route.params.email,
      });
    }
  };

  const { navigation } = props;
  const { route } = props;
  console.log(route)
  return (
    <Container style={loginStyle.container}>
      <Content style={loginStyle.spacing} >
        <ImageBackground
          style={{
            width: "100%",
            height: 290,
          }}
          source={require('./../../../assets/bg.png')}
          resizeMode={'stretch'}
        >
          <View style={loginStyle.backWrapper}>
            <Text
              onPress={() => props.navigation.navigate("ForgetPassword")}
              style={loginStyle.backButtonStyle}
            >
              <Image
                style={loginStyle.backButton}
                source={require("../../../assets/BackButton.png")}
              />
            </Text>
          </View>
          <View style={{
            alignSelf: "center",
            paddingTop: 100
          }}>
            <Image
              style={loginStyle.logo}
              source={require("../../../assets/Logo.png")}
            />
          </View>
        </ImageBackground>
        <Body style={loginStyle.bodyContainer}>
          <H3 style={globalStyle.h3}>Enter Email Code</H3>
          <Text style={verificationStyle.subHeading}>
            Please enter your the verification code.
          </Text>
        </Body>
        <Form>
          <Body style={{ padding: 30}}>
            <Image
              style={verificationStyle.envelop}
              source={require("../../../assets/Envelop.png")}
            />
          </Body>
          <Body style={[verificationStyle.spaceBetween,{ paddingLeft: 30, paddingRight:30}]}>
            <OtpInputs getOtp={(otp) => getOtp(otp)} />
          </Body>
          <Content style={[loginStyle.formContainer,{ paddingLeft: 30, paddingRight:30}]}>
            <Button onPress={submitForm} style={loginStyle.button} full>
              <Text>Send</Text>
            </Button>
            {errorMessage != "" ? (
              <Text style={globalStyle.errorText}>{errorMessage}</Text>
            ) : null}
            <Body style={verificationStyle.resendSection}>
              <Text>
                Didn't recieve code?{" "}
                <Text style={globalStyle.hyperlink}>Resend</Text>
              </Text>
            </Body>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default VerificationCode;
