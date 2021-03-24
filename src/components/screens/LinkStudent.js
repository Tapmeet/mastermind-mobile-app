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

 // console.log(userId)
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
    // console.log('heress'); 
    // console.log(API_URL);  
    const token = '5Uq6qgGubQj-IgYw280OFfdvfMghaFApCIYSFwEvSYorxxVktp6NQLuzw04EDf8mFpJP6K1__n164FLNSEIwfkfDYccMOUaO6-icDZsV0gprQT3SmyR8yq42DoOyv5sfEehCbqXCKvk33q7NzE8MSWidD1qJog-vGPC2u3uk_XXFfSoqYarwDmb96Oe40-9s0rDFaTTndTndOlQzSjNnKbasU8J_fo8iQaJOr4d_tNOcU4I1Q6BGyTssH7uKiKCzjyNT4JsrSdp3br_GFsFqpBoaBpr9b5-QZbv7OogaA_CTy5iSOKMh5P2e3sbZVL3C-X2xxdN2-60X2m14PwL_BA3spNEOO2DhHv3qwMxkzUjtJ2kJ_uJyQHXTQn-JRnt-T2bPNJZxEz_pvd3ZnpgJTyXAx8zuYhabz0EdywVBpgaQ8tiAxE0nSkcVkCnWjfORYseYqB310dDw9AfZBITYxIkMcaa005dCP7vCBcIXGzgqxe1_u7p2KAswDeHJcUDGZXGYZvr4v8Csz9axw4370A'
    fetch(`${API_URL}/odata/StudentLink`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
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
        <Form>
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
