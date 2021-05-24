import React from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import { API_URL } from "./../Utility/AppConst"
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
import { useSelector } from 'react-redux'
import { SideBarMenu } from "../sidebar";
const LinkStudent = (props) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [checklastName, setChecklastName] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };
  const userId = useSelector(state => state);
  // Setting data to variables and validations
  const setfirstName = (event) => {
    setFirstName(event);
    if (event == "") {
      setCheckFirstname(true);
    } else {
      setCheckFirstname(false);
    }
  };

  const setlasttName = (event) => {
    setLastName(event);
    if (event == "") {
      setChecklastName(true);
    } else {
      setChecklastName(false);
    }
  };
  const setemail = (event) => {
    setEmail(event);
    if (event == "") {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };
  //Form Submission
  const submitForm = () => {
    //props.navigation.navigate("Verification");
    if (firstName == "") {
      setCheckFirstname(true);
      return false;
    }
    if (lastName == "") {
      setChecklastName(true)
      return false;
    }
    if (email == "") {
      setCheckEmail(true);
      return false;
    }

    const apiUrl = API_URL.trim();
    fetch(`${apiUrl}/odata/StudentLink`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
      body: JSON.stringify({
        Email: email,
        FirstName: firstName,
        LastName: lastName,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response["odata.error"]) {
          console.log(response["odata.error"].message.value);
          setErrorMessage(response["odata.error"].message.value);
        } else {
          props.navigation.navigate("Verification", {
            studentAccountGuid: response["studentAccountGuid"],
            studentId: response["studentId"],
            Email: email,
            FirstName: firstName,
            LastName: lastName,
          });
        }
      })
      .catch((response) => {
        console.log(response);
        setErrorMessage("An error has occurred. Please check all the fields");
      });
  };
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Link Student "} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <View style={loginStyle.contentContainer}>
          <Body style={loginStyle.bodyContainer}>
            <Text style={globalStyle.small}>Fill out the form below </Text>
          </Body>
          <Form >
            <View style={checkFirstname
              ? globalStyle.formFieldError : globalStyle.formField}>
              <Text style={globalStyle.formLabel}>First Name</Text>
              <Input
                value={firstName}
                onChangeText={(text) => setfirstName(text)}
                style={
                  globalStyle.formControls
                }
                placeholder="Enter your first name"
              />
            </View>
            {checkFirstname ? (
              <Text style={globalStyle.error}>Enter First Name</Text>
            ) : null}
            <View style={checklastName
              ? globalStyle.formFieldError : globalStyle.formField}>
              <Text style={globalStyle.formLabel}>Last Name</Text>
              <Input
                value={lastName}
                onChangeText={(text) => setlasttName(text)}
                style={
                  globalStyle.formControls
                }
                placeholder="Enter your last name"
              />
            </View>
            {checklastName ? (
              <Text style={globalStyle.error}>Enter Last Name </Text>
            ) : null}
            <View style={checkEmail
              ? globalStyle.formFieldError : globalStyle.formField}>
              <Text style={globalStyle.formLabel}>Email</Text>
              <Input
                value={email}
                onChangeText={(text) => setemail(text)}
                style={
                  globalStyle.formControls
                }
                placeholder="Enter your email address "
              />
            </View>
            {checkEmail ? (
              <Text style={globalStyle.error}>Enter Valid Email</Text>
            ) : null}
            <Content style={loginStyle.formContainer}>

              <ImageBackground
                style={[globalStyle.Btn, {
                  width: '100%'
                }]}
                source={require('./../../../assets/Oval.png')}
                resizeMode={'stretch'}
                
              >
                <Button onPress={submitForm}  style={loginStyle.buttons} full>
                  <Text style={loginStyle.buttonText} >Link Student</Text>
                </Button>
              </ImageBackground>
            </Content>
          </Form>
        </View>
      </Content>
    </Container>
  );
};
export default LinkStudent;
