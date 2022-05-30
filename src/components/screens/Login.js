import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { API_URL } from "./../Utility/AppConst";
import * as ImagePicker from 'expo-image-picker'; 
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { useSelector, useDispatch } from "react-redux";
import LOGGED_IN_USER from "./../../redux/User";

const Login = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkUsername, setCheckUsername] = React.useState(false);
  const [checkPassword, setCheckPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loaderMessage, setLoaderMessage] = React.useState(false);
  const dispatch = useDispatch();
  const userData = (userInfo) =>
    dispatch({ type: "LOGGED_IN_USER", payload: userInfo });
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

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
    const apiUrl = API_URL.trim();
    setLoaderMessage(true)
    fetch(`${apiUrl}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then(async (response) => {
        setLoaderMessage(false)
        if (response["access_token"]) {
          const token =response["access_token"].toString()
          await AsyncStorage.setItem("tokenCheck", token);
          userData({ id: 1, access_Token: response["access_token"] });
        
        } else {
          setErrorMessage(response["error_description"]);
        }
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
    <Container style={loginStyle.container} scrollEnabled={false}>
      <Content style={loginStyle.spacing} scrollEnabled={false}>
        <ImageBackground
          style={{
            width: "100%",
            height: 200,
          }}
          source={require("./../../../assets/bg.png")}
          resizeMode={"stretch"}
        >
          <View
            style={{
              alignSelf: "center",
              paddingTop: 40,
            }}
          >
            <Image
              style={loginStyle.logo}
              source={require("../../../assets/Logo.png")}
            />
          </View>
        </ImageBackground>
        <Body style={loginStyle.bodyContainer} padder>
          <H2 style={globalStyle.h2}>Welcome!</H2>
          <Text style={globalStyle.small}>Sign in to Continue</Text>
        </Body>
        <Form style={globalStyle.form} padder>
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={username}
              onChangeText={(text) => setusername(text)}
              placeholderTextColor="#ccc"
              autoCapitalize="none"
              style={
                checkUsername
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Enter Email Address"
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
              placeholderTextColor="#ccc"
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
          {errorMessage != "" ? (
            <Text style={[globalStyle.errorText, { marginTop: 15 }]}>
              {errorMessage}
            </Text>
          ) : null}
          {loaderMessage ?
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View>
            : null}
          <Content style={loginStyle.formContainer} scrollEnabled={false}>
            <Button
              onPress={submitForm}
              style={loginStyle.button}
              full
            >
              <Text style={loginStyle.buttonText}>Login</Text>
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
      </Content>
      <Body style={loginStyle.signUpSection}>
        <Text>
          Don’t have an account?
          <Text
            onPress={() => props.navigation.navigate("SignUp")}
            style={globalStyle.hyperlink}
          >
            &nbsp; Sign Up Now!
          </Text>
        </Text>
      </Body>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    position: 'absolute',
    width: '100%',
    left: 30,
    top: -18
  },
});
export default Login;
