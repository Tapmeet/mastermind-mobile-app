import React, { useRef } from "react";
import { View, Image, StyleSheet, ImageBackground, TouchableOpacity, Text } from "react-native";
import OtpInputss from "./../Utility/Outinputs";
// import {
//   Container,
//   CheckBox,
//   Content,
//   Form,
//   Item,
//   Input,
//   Label,
//   Button,
//   Text,
//   Body,
//   H3,
//   Icon,
// } from "native-base";
import verificationStyle from "../../style/verification/verifcationStyle";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import { API_URL } from "./../Utility/AppConst"
const VerificationCode = (props) => {
  const [otp, setOtp] = React.useState("");
  const [otpCheck, setOtpCheck] = React.useState(props.route.params.verificationKey);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [code, setCode] = React.useState(props.route.params.code);
  const getOtp = (otp) => {
    setOtp(otp);
  };

  submitForm = () => {
    if (otp != otpCheck) {
      setErrorMessage("Wrong verifcation code");
    } else {
      props.navigation.navigate("ResetPassword", {
        code: code,
        verificationKey: otpCheck,
        email: props.route.params.email,
      });
    }
  };
  submitResend = () => {
    setSuccessMessage(false)
    fetch(`${API_URL}/odata/ForgotPassword`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: props.route.params.email,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["odata.error"]) {
          setSuccessMessage(false)
          setErrorMessage(response["odata.error"].message.value);
        } else {
          setCode(response.code)
          setOtpCheck(response.verificationKey)
          setSuccessMessage(true)

        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred. Please check all the fields");
      });
  };
  const { navigation } = props;
  const { route } = props;
  return (
    <View style={loginStyle.container}>
      <View style={loginStyle.spacing} >
        <ImageBackground
          style={{
            width: "100%",
            height: 260,
          }}
          source={require('./../../../assets/bg.png')}
          resizeMode={'stretch'}
        >
          <View style={loginStyle.backWrapper}>
            <Text
              onPress={() => props.navigation.navigate("ForgetPassword")}
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
            paddingTop: 80
          }}>
            <Image
              style={loginStyle.logo}
              source={require("../../../assets/Logo.png")}
            />
          </View>
        </ImageBackground>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"center", width:"100%"}}>
          <View style={loginStyle.bodyContainer}>
            <Text style={globalStyle.h3}>Enter Email Code </Text>
            <Text style={verificationStyle.subHeading}>
              Please enter your the verification code.
            </Text>
          </View>
        </View>
        <View>
          <View style={{ padding: 30 }}>
          </View>
          <View style={[verificationStyle.spaceBetween, { paddingLeft: 30, paddingRight: 30  }]}>
            <OtpInputss getOtp={(otp) => getOtp(otp)} />
          </View>
          <View style={[loginStyle.formContainer, { paddingLeft: 30, paddingRight: 30 }]}>
            <TouchableOpacity onPress={submitForm} style={loginStyle.button} full>
              <Text style={{color:"#fff", fontSize: 18}}>Send</Text>
            </TouchableOpacity>
            {errorMessage != "" ? (
              <Text style={globalStyle.errorText}>{errorMessage}</Text>
            ) : null}
            {successMessage ? (
              <Text style={globalStyle.sucessText}>Sent successfully</Text>
            ) : null}

            <View style={verificationStyle.resendSection}>
              <Text onPress={submitResend}>
                Didn't recieve code?
                <Text style={globalStyle.hyperlink}> Resend</Text>
              </Text>
            </View>
          </View  >
        </View>
      </View  >
    </View>
  );
};
export default VerificationCode;
