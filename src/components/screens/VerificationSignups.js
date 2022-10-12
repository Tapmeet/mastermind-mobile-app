import React, { useRef } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import OtpInputss from "../Utility/Outinputs";
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
    if (otp.length < 6) {
      setErrorMessage("Wrong verifcation code");
    } else {
   
      fetch(`${apiUrl}/odata/ConfirmRegistration`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserEmail: props.route.params.Email,
          ConfirmationCode: otp,
        }),
      })
        .then((response) => {
          let jsonData = JSON.stringify(response);
          let jsonDataPrase = JSON.parse(jsonData);
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
      },
      body: JSON.stringify({
        UserEmail: props.route.params.Email,
      }),
    })
      .then((response) => {
        setSuccessMessage('Successfully Sent')
      })
      .catch((response) => {
        setErrorMessage("An error has occurred.");
      });
  }
  const { navigation } = props;
  const { route } = props;
  return (
     <View style={loginStyle.container}>
       <View style={loginStyle.spacing} padder>
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

         <View>
          <View>
            <Image
              style={verificationStyle.envelop}
              source={require("../../../assets/success.png")}
            />
          </View>
           <View style={[loginStyle.bodyContainer, { marginTop: 40 }]}>
             <Text style={globalStyle.h3}>Enter Verification Codes </Text>
            <Text style={[verificationStyle.subHeading, { fontSize: 22, }]}>
              Please enter
            </Text>
            <Text style={[verificationStyle.subHeading, { lineHeight: 10, fontSize: 22 }]}>
              your verification code
            </Text>
          </View>
          <View style={verificationStyle.spaceBetween}>
            <OtpInputss getOtp={(otp) => getOtp(otp)} />
          </View>

           <View style={[loginStyle.formContainer, { paddingRight: 15, paddingLeft: 15 }]}>
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

             <View style={[verificationStyle.resendSection, { marginTop: 20 }]}>
              <Text style={{ fontSize: 18 }}>
                Didn't recieve code?{" "}
                <Text onPress={resendForm} style={globalStyle.hyperlink}>Resend</Text>
              </Text>
            </View>
           </View  >
      </View>
       </View  >
     </View>
  );
};
export default VerificationSignups;
