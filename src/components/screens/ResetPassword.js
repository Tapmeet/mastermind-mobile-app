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

  setpassword = (event) => {
    setPassword(event);
    if (event == "") {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
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
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,20}$/;
    if(!password.match(decimal)) 
    { 
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
            Please Fill your detials below
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
            {password.length > 0 && password.length <= 20 && confirmPassword.length <=1 ?
              <View style={{ paddingTop: 20, paddingLeft: 10 }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: "#777" }}>Must be at least 5 character</Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: "#777" }}>Must contain at least 1 number</Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: "#777" }}>Must contain at least 1 character in capital case</Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: "#777" }}>Must contain at least 1 character in lower case</Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: "#777" }}>Must contain at least 1 special character </Text>
              </View>
              : null}
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
export default ResetPassword;
