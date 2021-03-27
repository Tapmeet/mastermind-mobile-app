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
   
    
    fetch(`${API_URL}/odata/StudentLink`, {
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
      <Content style={loginStyle.spacing} padder>
        <View style={loginStyle.backWrapper}>
          {/* <Image
            style={loginStyle.backButton}
            source={require("../../../assets/BackButton.png")}
          /> */}
        </View>
        <Body style={loginStyle.bodyContainer}>
          <H2 style={globalStyle.h2}>Link Student!</H2>
          <Text style={globalStyle.small}>Fill out the form below </Text>
        </Body>
        <Form style={globalStyle.form}>
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={firstName}
              onChangeText={(text) => setfirstName(text)}
              style={
                checkFirstname
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="First Name"
            />
          </Item>
          {checkFirstname ? (
            <Text style={globalStyle.error}>Enter First Name</Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={lastName}
              onChangeText={(text) => setlasttName(text)}
              style={globalStyle.formControl}
              placeholder="Last Name"
            />
          </Item>
          {checklastName ? (
            <Text style={globalStyle.error}>Enter Last Name </Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={email}
              onChangeText={(text) => setemail(text)}
              style={
                checkEmail
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Email "
            />
          </Item>
          {checkEmail ? (
            <Text style={globalStyle.error}>Enter Valid Email</Text>
          ) : null}
          <Content style={loginStyle.formContainer}>
            <Button onPress={submitForm} style={loginStyle.button} full>
              <Text>Link Student</Text>
            </Button>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default LinkStudent;
