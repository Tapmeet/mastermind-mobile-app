import React from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
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
import {API_URL} from "@env"
const ForgetPassword = (props) => {
  const [email, setEmail] = React.useState("");
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  setemail = (event) => {
    setEmail(event);
    if (event == "") {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };
  //Form Submission
  submitForm = () => {
    setErrorMessage("");
    if (email == "") {
      setCheckEmail(!checkEmail);
      return false;
    }
    let checkemail = ValidateEmail(email);
    if (checkemail == false) {
      setCheckEmail(!checkEmail);
      return false;
    }

    fetch(`${API_URL}/odata/ForgotPassword`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response["code"]);
        if (response["odata.error"]) {
          // console.log(response["odata.error"].message.value)
          setErrorMessage(response["odata.error"].innererror.message);
        } else {
          //this.props.navigation.navigate('AccountSuccess')
          props.navigation.navigate("VerificationCode", {
            code: response["code"],
            verificationKey: response["verificationKey"],
            email: email
          });
        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred. Please check all the fields");
      });
  };
  const { navigation } = props;
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
            onPress={() => props.navigation.navigate("Login")}
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
          <H3 style={globalStyle.h3}>Forgot Password?</H3>
          <Text style={verificationStyle.subHeadingWrapper}>
            Enter your registered email below to receive password reset
            instruction
          </Text>
        </Body>
        <Form style={verificationStyle.form}>
          <Body>
            <Image
              style={verificationStyle.envelop}
              source={require("../../../assets/Envelop2.png")}
            />
          </Body>
          <Body style={verificationStyle.spaceBetween}>
            <Input
              value={email}
              onChangeText={(text) => setemail(text)}
              style={
                checkEmail
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Enter Email"
            />
          </Body>
          {checkEmail ? (
            <Text style={globalStyle.error}>Enter Valid Email </Text>
          ) : null}
          {errorMessage != "" ? (
            <Text style={globalStyle.errorText}>{errorMessage}</Text>
          ) : null}

          <Content style={loginStyle.formContainer}>
            <Button
              onPress={submitForm}
              //onPress={() => props.navigation.navigate("VerificationCode")}
              style={loginStyle.button}
              full
            >
              <Text>Send</Text>
            </Button>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default ForgetPassword;
