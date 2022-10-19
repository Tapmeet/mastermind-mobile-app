import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Text
} from "react-native";

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

  const [passwordcheck1, setpasswordcheck1] = React.useState(false);
  const [passwordcheck2, setpasswordcheck2] = React.useState(false);
  const [passwordcheck3, setpasswordcheck3] = React.useState(false);
  const [passwordcheck4, setpasswordcheck4] = React.useState(false);
  const [passwordcheck5, setpasswordcheck5] = React.useState(false);
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
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,20}$/;
    if (!password.match(decimal)) {
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
    <View style={loginStyle.container}>
      <ScrollView style={[loginStyle.spacing]} >
        <ImageBackground
          style={{
            width: "100%",
            height: 240,
          }}
          source={require('./../../../assets/bg.png')}
          resizeMode={'stretch'}
        >
          <View style={[loginStyle.backWrapper,{paddingBottom:100}]}>
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
          <Text style={globalStyle.h3}>Sign Up</Text>
        </View>
        <View style={globalStyle.form} padder>
          <View style={globalStyle.formGroup} floatingLabel>
            <TextInput
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
          </View >
          {checkFirstname ? (
            <Text style={globalStyle.error}>Enter First Name</Text>
          ) : null}
          <View style={globalStyle.formGroup} floatingLabel>
            <TextInput
              value={lastName}
              onChangeText={(text) => setlasttName(text)}
              placeholderTextColor='#ccc'
              style={globalStyle.formControl}
              placeholder="Last Name"
            />
          </View >
          <View style={globalStyle.formGroup} floatingLabel>
            <TextInput
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
          </View >
          {checkShoolId ? (
            <Text style={globalStyle.error}>Enter School Id</Text>
          ) : null}
          <View style={globalStyle.formGroup} floatingLabel>
            <TextInput
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
          </View >
          {checkEmail ? (
            <Text style={globalStyle.error}>Enter Valid Email</Text>
          ) : null}
          {/*  <View  style={globalStyle.formGroup} floatingLabel>
            <TextInput
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
           </View >
          {checkConfirmEmail ? (
            <Text style={globalStyle.error}>Check Confirm Email</Text>
          ) : null} */}
          <View style={globalStyle.formGroup} floatingLabel>
            <TextInput
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
          </View >
          {/* {password.length > 0 && password.length <= 20   && confirmpassword.length <= 0 ? */}
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
          <View style={globalStyle.formGroup} floatingLabel>
            <TextInput
              secureTextEntry={true}
              value={confirmpassword}
              onChangeText={(text) => setconfirmpassword(text)}
              placeholderTextColor='#ccc'
              style={
                checkConfirmpassword
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Confirm Password"
            />
          </View >
          {checkConfirmpassword ? (
            <Text style={globalStyle.error}>Password doesn't match</Text>
          ) : null}
          <View style={globalStyle.formGroup} floatingLabel>
            <TextInput
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
          </View >
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
          <View style={loginStyle.formContainer}>
            <TouchableOpacity style={loginStyle.button}
              onPress={submitForm}
              // onPress={() => props.navigation.navigate("VerificationSignups")}
              full>
              <Text style={loginStyle.buttonText} >Create An Account</Text>
            </TouchableOpacity>
          </View  >
        </View>
      </ScrollView  >
    </View>
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