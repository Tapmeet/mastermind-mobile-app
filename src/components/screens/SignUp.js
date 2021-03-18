import React from "react";
import { View, Image, StyleSheet } from "react-native";
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
  H3,
  Icon,
} from "native-base";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import CheckBox from "@react-native-community/checkbox";
import { API_URL } from "@env"

import PhoneInput from 'react-phone-number-input/react-native-input'

const SignUp = (props) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [schoolId, setSchoolId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [checkShoolId, setCheckShoolId] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [checkConfirmEmail, setCheckConfirmEmail] = React.useState(false);
  const [checkPassword, setCheckPassword] = React.useState(false);
  const [checkmobile, setCheckmobile] = React.useState(false);
  const [checkterms, setCheckterms] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  // Email validations custom
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

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
  };
  const setschoolId = (event) => {
    setSchoolId(event);
    if (event == "") {
      setCheckShoolId(true);
    } else {
      setCheckShoolId(false);
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
  const setconfirmemail = (event) => {
    setConfirmEmail(event);
    if (event == "") {
      setCheckConfirmEmail(true);
    } else {
      setCheckConfirmEmail(false);
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
  const setmobile = (event) => {
    setMobile(event);
    if (event == "") {
      setCheckmobile(true);
    } else {
      setCheckmobile(false);
    }
  };
  const setterms = () => {
    setTerms(!terms);
    if (terms == false) {
      setCheckterms(false);
    } else {
      setCheckterms(true);
    }
  };

  //Form Submission
  const submitForm = () => {
    if (firstName == "") {
      setCheckFirstname(true);
      return false;
    }
    if (schoolId == "") {
      setCheckShoolId(true);
      return false;
    }
    if (email == "") {
      setCheckEmail(true);
      return false;
    }
    let checkemail = ValidateEmail(email);
    if (checkemail == false) {
      setCheckEmail(true);
      return false;
    }

    if (confirmEmail == "") {
      setCheckConfirmEmail(true);
      return false;
    }
    let checkConfirmemail = ValidateEmail(confirmEmail);
    if (checkConfirmemail == false) {
      setCheckConfirmEmail(true);
      return false;
    }
    if (email != confirmEmail) {
      setCheckConfirmEmail(true);
      return false;
    }
    if (password == "") {
      setCheckPassword(true);
      return false;
    }
    if (mobile == "") {
      setCheckmobile(true);
      return false;
    }
    if (terms == false) {
      setCheckterms(true);
      return false;
    }

    //schoolId: 29D2568F-5950-46A6-A54E-DDA0BD0ADFD4
    fetch(`${API_URL}/odata/Register`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        EmailConfirmed: confirmEmail,
        Password: password,
        SchoolUniqueId: "29D2568F-5950-46A6-A54E-DDA0BD0ADFD4",
        FirstName: firstName,
        LastName: lastName,
        WaiverFile: "some text",
        Phone1: mobile,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response["odata.error"]) {
          console.log(response["odata.error"].message.value);
          setErrorMessage(response["odata.error"].message.value);
        } else {
          props.navigation.navigate("AccountSuccess");
        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred. Please check all the fields");
      });
  };

  const { navigation } = props.navigation;
  return (
    <Container style={loginStyle.container}>
      <Content style={loginStyle.spacing} padder>
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
        <Body style={loginStyle.bodyContainer}>
          <Image
            style={loginStyle.logo}
            source={require("../../../assets/Logo.png")}
          />
        </Body>
        <View>
          <H3 style={globalStyle.h3}>Sign Up</H3>
        </View>
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
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={schoolId}
              onChangeText={(text) => setschoolId(text)}
              style={
                checkShoolId
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="School Id"
            />
          </Item>
          {checkShoolId ? (
            <Text style={globalStyle.error}>Enter School Id</Text>
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
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={confirmEmail}
              onChangeText={(text) => setconfirmemail(text)}
              style={
                checkConfirmEmail
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Confirm Email "
            />
          </Item>
          {checkConfirmEmail ? (
            <Text style={globalStyle.error}>Check Confirm Email</Text>
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
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={mobile}
              onChangeText={(text) => setmobile(text)}
              style={
                checkmobile
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Mobile "
            /> 
            {/* <PhoneInput
              defaultCountry="US"
              placeholder="Enter phone number"
              value={mobile}
              onChange={(text) => setmobile(text)}
              style={
                checkmobile
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
            /> */}
          </Item>
          {checkmobile ? (
            <Text style={globalStyle.error}>Enter Mobile</Text>
          ) : null}
          <View style={loginStyle.radioSection}>
            <CheckBox
              disabled={false}
              value={terms}
              onChange={setterms}
              style={loginStyle.checkbox}
            />
            <Text style={loginStyle.text}>
              I agree to the Terms and Conditions
            </Text>
          </View>
          {checkterms ? (
            <Text style={globalStyle.error}>
              Please agree to the Terms and Conditions before proceed
            </Text>
          ) : null}
          {errorMessage != "" ? (
            <Text style={globalStyle.errorText}>{errorMessage}</Text>
          ) : null}

          <Content style={loginStyle.formContainer}>
            <Button style={loginStyle.button} onPress={submitForm} full>
              <Text>Create An Account</Text>
            </Button>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default SignUp;
