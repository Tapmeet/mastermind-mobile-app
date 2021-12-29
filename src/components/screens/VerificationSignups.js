import React, { useRef } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import OtpInputs from "../Utility/Outinputs";
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
import { useSelector } from 'react-redux'
import { API_URL } from "../Utility/AppConst"
const apiUrl = API_URL.trim();
const VerificationSignups = (props) => {
  const userId = useSelector(state => state);
  const [otp, setOtp] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const getOtp = (otp) => {
    setOtp(otp);
  };
  const submitForm = () => {
    //props.navigation.navigate("StudentLinkSuccess");
    // console.log(otp)
    // console.log("Verifcation " + VerificationToken)
    if (otp.length < 6) {
      setErrorMessage("Wrong verifcation code");
    } else {
   
      fetch(`${apiUrl}/odata/ConfirmRegistration`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
         // 'Authorization': 'Bearer ' + userId.userDataReducer[0].access_Token
        },
        body: JSON.stringify({
          UserEmail: props.route.params.Email,
          ConfirmationCode: otp,
        }),
      })
        .then((response) => {
          let jsonData = JSON.stringify(response);
          console.log(jsonData)
          let jsonDataPrase = JSON.parse(jsonData);
          console.log(jsonDataPrase.status)
          if (jsonDataPrase.status >= 200 && jsonDataPrase.status < 300) {
            props.navigation.navigate("AccountSuccess");
          } else {
            setErrorMessage("An error has occurred.");
          }
        })
        .catch((response) => {
          setErrorMessage("An error has occurred.");
        });
    }
  };
  const resendForm = () => {
    fetch(`${apiUrl}/odata/RegistrationCode`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        //'Authorization': 'Bearer ' + userId.userDataReducer[0].access_Token
      },
      body: JSON.stringify({
        UserEmail: props.route.params.Email,
      }),
    })
      .then((response) => {
        console.log(response)
        setSuccessMessage('Successfully Sent')
      })
      .catch((response) => {
        setErrorMessage("An error has occurred.");
      });
  }
  const { navigation } = props;
  const { route } = props;
  return (
    <Container style={loginStyle.container}>
      <Content style={loginStyle.spacing} padder>
        <View style={loginStyle.backWrapper}>
          <Text
            onPress={() => props.navigation.navigate("Signup")}
            style={loginStyle.backButtonStyle}
          >
            <Image
              style={loginStyle.backButton}
              source={require("./../../../assets/BackButton.png")}
            />
          </Text>
        </View>

        <Form>
          <Body>
            <Image
              style={verificationStyle.envelop}
              source={require("../../../assets/success.png")}
            />
          </Body>
          <Body style={[loginStyle.bodyContainer, { marginTop: 40 }]}>
            <H3 style={globalStyle.h3}>Enter Verification Codes</H3>
            <Text style={[verificationStyle.subHeading, { fontSize: 22, }]}>
              Please enter
            </Text>
            <Text style={[verificationStyle.subHeading, { lineHeight: 10, fontSize: 22 }]}>
              your verification code
            </Text>
          </Body>
          <View style={verificationStyle.spaceBetween}>
            <OtpInputs getOtp={(otp) => getOtp(otp)} />
          </View>

          <Content style={[loginStyle.formContainer, { paddingRight: 15, paddingLeft: 15 }]}>
            <ImageBackground
              style={[globalStyle.Btn, {
                width: '100%'
              }]}
              source={require('./../../../assets/Oval.png')}
              resizeMode={'stretch'}

            >
              <Button onPress={submitForm} style={loginStyle.buttons} full>
                <Text style={loginStyle.buttonText} >Submit</Text>
              </Button>
            </ImageBackground>
            {/* <Button onPress={submitForm} style={loginStyle.button} full>
              <Text>Send</Text>
            </Button> */}
            {errorMessage != "" ? (
              <Text style={globalStyle.errorText}>{errorMessage}</Text>
            ) : null}
              {successMessage != "" ? (
              <Text style={globalStyle.sucessText}>{successMessage}</Text>
            ) : null}

            <Body style={[verificationStyle.resendSection, { marginTop: 20 }]}>
              <Text style={{ fontSize: 18 }}>
                Didn't recieve code?{" "}
                <Text onPress={resendForm} style={globalStyle.hyperlink}>Resend</Text>
              </Text>
            </Body>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default VerificationSignups;
