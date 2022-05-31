import React from "react";
import { View, Image, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
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
import { API_URL } from "./../Utility/AppConst"

import PhoneInput from 'react-phone-number-input/react-native-input'

const SignUp = (props) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [schoolId, setSchoolId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmEmail, setConfirmEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmpassword] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [checkShoolId, setCheckShoolId] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [checkConfirmEmail, setCheckConfirmEmail] = React.useState(false);
  const [checkPassword, setCheckPassword] = React.useState(false);
  const [checkConfirmpassword, setCheckConfirmpassword] = React.useState(false);
  const [checkmobile, setCheckmobile] = React.useState(false);
  const [checkterms, setCheckterms] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState('');
  const [loaderMessage, setLoaderMessage] = React.useState(false);
  // Email validations custom
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };
  const onChangePhone = (text, setVariable) => {
    let formatedNo = formatMobileNumber(text);

    setVariable(formatedNo);
  };

  const formatMobileNumber = (text) => {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      return number;
    }
    return text;
  }
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
  const setconfirmpassword = (event) => {
    setConfirmpassword(event);
    if (event == "") {
      setCheckConfirmpassword(true);
    } else {
      setCheckConfirmpassword(false);
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
    // props.navigation.navigate("VerificationSignups");
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

    // if (confirmEmail == "") {
    //   setCheckConfirmEmail(true);
    //   return false;
    // }
    // let checkConfirmemail = ValidateEmail(confirmEmail);
    // if (checkConfirmemail == false) {
    //   setCheckConfirmEmail(true);
    //   return false;
    // }

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
    if (confirmpassword == "") {
      setCheckConfirmpassword(true);
      return false;
    }
    if (password != confirmpassword) {
      setCheckConfirmpassword(true);
      return false;
    }
    else {
      setCheckConfirmpassword(false);
    }
    if (mobile == "") {
      setCheckmobile(true);
      return false;
    }
    if (terms == false) {
      setCheckterms(true);
      return false;
    }
  
    setLoaderMessage(true)

    
    fetch(`${API_URL}odata/Register`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        EmailConfirmed: email,
        Password: password,
        SchoolUniqueId: schoolId,
        FirstName: firstName,
        LastName: lastName,
        WaiverFile: "some text",
        Phone1: mobile,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setLoaderMessage(false)
        if (response["odata.error"]) {
          setErrorMessage(response["odata.error"].message.value);
        } else {

          props.navigation.navigate("VerificationSignups", {
            Email: email,
            FirstName: firstName,
            LastName: lastName,
          });
        }
      })
      .catch((response) => {
        setLoaderMessage(false)
        setErrorMessage("An error has occurred. Please check all the fields");
      });
  };

  const { navigation } = props.navigation;
  return (
    <Container style={loginStyle.container}>
      <Content style={loginStyle.spacing} >
        <ImageBackground
          style={{
            width: "100%",
            height: 240,
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
            paddingTop: 70
          }}>
            <Image
              style={loginStyle.logo}
              source={require("../../../assets/Logo.png")}
            />
          </View>
        </ImageBackground>
        <View style={{ paddingLeft: 30 }}>
          <H3 style={globalStyle.h3}>Sign Up</H3>
        </View>
        <Form style={globalStyle.form} padder>
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={firstName}
              onChangeText={(text) => setfirstName(text)}
              placeholderTextColor='#ccc'
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
              placeholderTextColor='#ccc'
              style={globalStyle.formControl}
              placeholder="Last Name"
            />
          </Item>
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={schoolId}
              onChangeText={(text) => setschoolId(text)}
              placeholderTextColor='#ccc'
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
              autoCapitalize='none'
              onChangeText={(text) => setemail(text)}
              placeholderTextColor='#ccc'
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
          {/* <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={confirmEmail}
              autoCapitalize='none'
              onChangeText={(text) => setconfirmemail(text)}
              placeholderTextColor='#ccc'
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
          ) : null} */}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setpassword(text)}
              placeholderTextColor='#ccc'
              style={
                checkPassword
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Password "
            />
          </Item>
          {password.length > 0 && password.length <= 20   && confirmpassword.length <=1?
            <View style={{ paddingTop: 20, paddingLeft: 10 }}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, color:"#777"}}>Must be at least 5 character</Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, color:"#777"}}>Must contain at least 1 number</Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, color:"#777"}}>Must contain at least 1 character in capital case</Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, color:"#777"}}>Must contain at least 1 character in lower case</Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, color:"#777"}}>Must contain at least 1 special character </Text>
            </View>
            : null}
          {checkPassword ? (
            <Text style={globalStyle.error}>Enter Valid Password</Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              secureTextEntry={true}
              value={confirmpassword}
              onChangeText={(text) => setconfirmpassword(text)}
              placeholderTextColor='#ccc'
              style={
                checkConfirmpassword
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Confirm Password "
            />
          </Item>
          {checkConfirmpassword ? (
            <Text style={globalStyle.error}>Password doesn't match</Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={mobile}
             // onChangeText={(text) => setmobile(text)}
              onChangeText={(text) => onChangePhone(text, setmobile)}
              placeholderTextColor='#ccc'
              style={
                checkmobile
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Mobile "
            />
          </Item>
          {checkmobile ? (
            <Text style={globalStyle.error}>Enter Mobile</Text>
          ) : null}
          <View style={loginStyle.radioSection}>
            <TouchableOpacity
              style={{ borderColor: "#ddd", borderRadius: 5, borderWidth: 2, height: 25, width: 28, marginRight: 10 }}
              value={terms}
              onPress={setterms}
            >
              {terms ? <Image
                style={{ height: 15, marginRight: 0, marginTop: 2 }}
                source={require("../../../assets/checkTick.png")}
                resizeMode={'contain'}
              /> : null}
            </TouchableOpacity>
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
          {loaderMessage ?
            <View style={[styles.container, styles.horizontal, { marginTop: 10, marginBottom: 10, zIndex: 9999 }]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View>
            : null}
          <Content style={loginStyle.formContainer}>
            <Button style={loginStyle.button}
              onPress={submitForm}
              // onPress={() => props.navigation.navigate("VerificationSignups")}
              full>
              <Text style={loginStyle.buttonText} >Create An Account</Text>
            </Button>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: -18
  },
});