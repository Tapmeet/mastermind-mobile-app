import React from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import {
  Container,
  //CheckBox,
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
const ResetPassword = (props) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [checkPassword, setCheckPassword] = React.useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [passwordcheck1, setpasswordcheck1] = React.useState(false);
  const [passwordcheck2, setpasswordcheck2] = React.useState(false);
  const [passwordcheck3, setpasswordcheck3] = React.useState(false);
  const [passwordcheck4, setpasswordcheck4] = React.useState(false);
  const [passwordcheck5, setpasswordcheck5] = React.useState(false);
  const setpassword = (event) => {
    var passwordcheckLowercase = /^(?=.*[a-z]).{0,20}$/;
    if (event.match(passwordcheckLowercase)) {
      setpasswordcheck1(true)
    }
    else {
      setpasswordcheck1(false)
    }
    var passwordcheckUppercase = /^(?=.*[A-Z]).{0,20}$/;
    if (event.match(passwordcheckUppercase)) {
      setpasswordcheck2(true)
    }
    else {
      setpasswordcheck2(false)
    }
    var passwordDigit = /^(?=.*\d).{0,20}$/;

    if (event.match(passwordDigit)) {
      setpasswordcheck3(true)
    }
    else {
      setpasswordcheck3(false)
    }
    var passwordSpecialChar = /^(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{0,20}$/;

    if (event.match(passwordSpecialChar)) {
      setpasswordcheck4(true)
    }
    else {
      setpasswordcheck4(false)
    }
    setPassword(event);
    if (event == "") {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
    if (event.length >= 5) {
      setpasswordcheck5(true)
    }
    else {
      setpasswordcheck5(false)
    }
  };
  setconfirmpassword = (event) => {
    setConfirmPassword(event);
    if (event == "") {
      setCheckConfirmPassword(true);
    } else {
      setCheckConfirmPassword(false);
    }
  };
  //Form Submission
  const submitForm = () => {
    if (password == "") {
      setCheckPassword(true);
      return false;
    }
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,20}$/;
    if (!password.match(decimal)) {
      setCheckPassword(true);
      return false
    }
    if (confirmPassword == "") {
      setCheckConfirmPassword(true);
      return false;
    }

    if (password != confirmPassword) {
      setCheckConfirmPassword(true);
      return false;
    }
    const apiUrl = API_URL.trim();
    fetch(`${apiUrl}/odata/ResetPassword`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: props.route.params.email,
        Password: password,
        ConfirmPassword: confirmPassword,
        Code: props.route.params.code,
        VerificationKey: props.route.params.verificationKey,
      }),
    })
      .then((response) => {
        let jsonData = JSON.stringify(response);
        let jsonDataPrase = JSON.parse(jsonData);
        if (jsonDataPrase.status != 200) {
          setErrorMessage("An error has occurred.");
        } else {
          props.navigation.navigate("ResetSuccess");
        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred.");
      });
  };

  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <Content style={loginStyle.spacing} >
        <ImageBackground
          style={{
            width: "100%",
            height: 200,
          }}
          source={require('./../../../assets/bg.png')}
          resizeMode={'stretch'}
        >
          <View style={loginStyle.backWrapper}>
            <Text
              onPress={() => props.navigation.navigate("VerificationCode")}
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
            paddingTop: 60
          }}>
            <Image
              style={loginStyle.logo}
              source={require("../../../assets/Logo.png")}
            />
          </View>
        </ImageBackground>
        <Body style={loginStyle.bodyContainer}>
          <H3 style={globalStyle.h3}>Reset Password?</H3>
          <Text style={verificationStyle.subHeadingWrapper}>
            Please Fill your details below
          </Text>
        </Body>
        <Form style={verificationStyle.form}>
          <Body>
            <Image
              style={verificationStyle.envelop}
              source={require("../../../assets/Lock.png")}
            />
          </Body>
          <View>
            <Item style={globalStyle.formGroup} floatingLabel>
              <Input
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setpassword(text)}
                style={
                  checkPassword
                    ? globalStyle.formControlError
                    : globalStyle.formControl
                }
                placeholder="New Password "
              />
            </Item>
            {/* {password.length > 0 && password.length <= 20 && confirmPassword.length <=1 ? */}
            <View style={{ paddingTop: 20, paddingLeft: 10 }}>
              <Text style={passwordcheck5 ? { fontFamily: 'Poppins', fontSize: 12, color: "green" } : { fontFamily: 'Poppins', fontSize: 12, color: "#777" }}> Must be at least 5 characters</Text>
              <Text style={passwordcheck3 ? { fontFamily: 'Poppins', fontSize: 12, color: "green" } : { fontFamily: 'Poppins', fontSize: 12, color: "#777" }}> Must contain at least 1 number</Text>
              <Text style={passwordcheck2 ? { fontFamily: 'Poppins', fontSize: 12, color: "green" } : { fontFamily: 'Poppins', fontSize: 12, color: "#777" }}> Must contain at least 1 character in capital case</Text>
              <Text style={passwordcheck1 ? { fontFamily: 'Poppins', fontSize: 12, color: "green" } : { fontFamily: 'Poppins', fontSize: 12, color: "#777" }}> Must contain at least 1 character in lower case</Text>
              <Text style={passwordcheck4 ? { fontFamily: 'Poppins', fontSize: 12, color: "green" } : { fontFamily: 'Poppins', fontSize: 12, color: "#777" }}> Must contain at least 1 special characters </Text>
            </View>
            {/* : null} */}
            {checkPassword ? (
              <Text style={globalStyle.error}>Enter Valid Password</Text>
            ) : null}
          </View>
          <View>
            <Item style={globalStyle.formGroup} floatingLabel>
              <Input
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => setconfirmpassword(text)}
                style={
                  checkConfirmPassword
                    ? globalStyle.formControlError
                    : globalStyle.formControl
                }
                placeholder="Confirm  Password "
              />
            </Item>

            {checkConfirmPassword ? (
              <Text style={globalStyle.error}>Check confirm password</Text>
            ) : null}
          </View>
          <Content style={loginStyle.formContainer}>
            {errorMessage != "" ? (
              <Text style={globalStyle.errorText}>
                {errorMessage}
              </Text>
            ) : null}
            <Button onPress={submitForm} style={loginStyle.button} full>
              <Text>Send</Text>
            </Button>
            {/* <Body style={verificationStyle.resendSection}>
              <Text>
                Didn't recieve code?{" "}
                <Text style={globalStyle.hyperlink}>Resend</Text>
              </Text>
            </Body> */}
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default ResetPassword;
