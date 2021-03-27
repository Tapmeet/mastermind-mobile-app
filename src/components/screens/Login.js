import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { API_URL } from "@env"
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Body,
  H2,
  Icon,
} from "native-base";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import { useSelector, useDispatch } from 'react-redux'
import LOGGED_IN_USER from "./../../redux/User"

const Login = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkUsername, setCheckUsername] = React.useState(false);
  const [checkPassword, setCheckPassword] = React.useState(false);
  const dispatch = useDispatch()
  const userData = userInfo => dispatch({ type: "LOGGED_IN_USER", payload: userInfo })
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  //Form Submission
  const submitForm = () => {
    if (username == "") {
      setCheckUsername(true);
      return false;
    }
    let checkemail = ValidateEmail(username);
    if (checkemail == false) {
      setCheckUsername(true);
      return false;
    }
    if (password == "") {
      setCheckPassword(true);
      return false;
    }
    //console.log('working');
    var details = {
      userName: username,
      password: password,
      grant_type: "password",
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`${API_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        userData({"id": 1, "access_Token": response["access_token"]})
      })
      .catch(function (data) {
        console.log("Error", data);
      });
  }; 
  const setusername = (event) => {
    setUsername(event);
    if (event == "") {
      setCheckUsername(true);
    } else {
      setCheckUsername(false);
    }
  };
  const setpassword = (event) => {
    setPassword(event);
    if (event == "") {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <Content style={loginStyle.spacing} padder>
        <View style={loginStyle.backWrapper}>
          {/* <Image
            style={loginStyle.backButton}
            source={require("../../../assets/BackButton.png")}
          /> */}
        </View>
        <Body style={loginStyle.bodyContainer}>
          <Image
            style={loginStyle.logo}
            source={require("../../../assets/Logo.png")}
          />
          <H2 style={globalStyle.h2}>Welcome!</H2>
          <Text style={globalStyle.small}>Sign in to Continue</Text>
        </Body>
        <Form style={globalStyle.form}>
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={username}
              onChangeText={(text) => setusername(text)}
              style={
                checkUsername
                  ? globalStyle.formControlError 
                  : globalStyle.formControl
              }
              placeholder="Enter Username"
            />
          </Item>
          {checkUsername ? (
            <Text style={globalStyle.error}>Enter Valid Username </Text>
          ) : null}
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
              placeholder="Password "
            />
          </Item>
          {checkPassword ? (
            <Text style={globalStyle.error}>Enter Password</Text>
          ) : null}
          <Content style={loginStyle.formContainer}>
            <Button onPress={submitForm} style={loginStyle.button} full>
              <Text>Login</Text>
            </Button>
          </Content>
        </Form>
        <Body style={globalStyle.textRight}>
          <Text
            style={globalStyle.hyperlink}
            onPress={() => props.navigation.navigate("ForgetPassword")}
          >
            Forgot Password?
          </Text>
        </Body>
        <Body style={loginStyle.signUpSection}>
          <Text>
            Don’t have an account?
            <Text
              onPress={() => props.navigation.navigate("SignUp")}
              style={globalStyle.hyperlink}
            >
              {" "}
              Sign Up Now!
            </Text>
          </Text>
        </Body>
      </Content>
    </Container>
  );
};
export default Login;
