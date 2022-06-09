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
import { API_URL } from "./../Utility/AppConst"
const VerificationCode = (props) => {
  const [otp, setOtp] = React.useState("");
  const [otpCheck, setOtpCheck] = React.useState(props.route.params.verificationKey);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [code, setCode] = React.useState(props.route.params.code);
  const getOtp = (otp) => {
    setOtp(otp);
  };

  submitForm = () => {
    if (otp != otpCheck) {
      setErrorMessage("Wrong verifcation code");
    } else {
      props.navigation.navigate("ResetPassword", {
        code: code,
        verificationKey: otpCheck,
        email: props.route.params.email,
      });
    }
  };
  submitResend = () => {
    setSuccessMessage(false)
    fetch(`${API_URL}/odata/ForgotPassword`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: props.route.params.email,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["odata.error"]) {
          setSuccessMessage(false)
          setErrorMessage(response["odata.error"].message.value);
        } else {
          setCode(response.code)
          setOtpCheck(response.verificationKey)
          setSuccessMessage(true)
         
        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred. Please check all the fields");
      });
  };
  const { navigation } = props;
  const { route } = props;
  return (
    <Container style={loginStyle.container}>
      <Content style={loginStyle.spacing} >
        <ImageBackground
          style={{
            width: "100%",
            height: 260,
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
            paddingTop: 80
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
          <Body style={{ padding: 30 }}>
          </Body>
          <View style={[verificationStyle.spaceBetween, { paddingLeft: 30, paddingRight: 30 }]}>
            <OtpInputs getOtp={(otp) => getOtp(otp)} />
          </View>
          <Content style={[loginStyle.formContainer, { paddingLeft: 30, paddingRight: 30 }]}>
            <Button onPress={submitForm} style={loginStyle.button} full>
              <Text>Send</Text>
            </Button>
            {errorMessage != "" ? (
              <Text style={globalStyle.errorText}>{errorMessage}</Text>
            ) : null}
            {successMessage ? (
              <Text style={globalStyle.sucessText}>Sent successfully</Text>
            ) : null}

            <Body style={verificationStyle.resendSection}>
              <Text onPress={submitResend}>
                Didn't recieve code?
                <Text style={globalStyle.hyperlink}> Resend</Text>
              </Text>
            </Body>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default VerificationCode;
