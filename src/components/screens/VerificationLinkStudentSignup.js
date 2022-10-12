import React, { useRef } from "react";
import { View, Image, StyleSheet } from "react-native";
import OtpInputss from "./../Utility/Outinputs";
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
import { API_URL } from "./../Utility/AppConst"
const VerificationLinkStudentSignup = (props) => {
  const [otp, setOtp] = React.useState("");
  const VerificationToken = 'X9HXK6';
  const [errorMessage, setErrorMessage] = React.useState("");
  const getOtp = (otp) => {
    setOtp(otp);
  };
  const submitForm = () => {
    if (otp.length < 6) {
      setErrorMessage("Wrong verifcation code");
    } else {
      const apiUrl =API_URL.trim();
      fetch(`${apiUrl}/odata/StudentLink('${props.route.params.studentAccountGuid}')`, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + props.route.params.accessToken
        },
        body: JSON.stringify({
          Email: props.route.params.Email,
          FirstName: props.route.params.FirstName,
          LastName: props.route.params.LastName,
          StudentId: props.route.params.studentId,
          VerificationToken: otp,
        }),
      })
        .then((response) => {
          let jsonData = JSON.stringify(response);
          let jsonDataPrase = JSON.parse(jsonData);
          if (jsonDataPrase.status >= 200 && jsonDataPrase.status < 300) {
            props.navigation.navigate("StudentLinkSuccess");
          } else {
            setErrorMessage("An error has occurred.");
          }
        })
        .catch((response) => {
          setErrorMessage("An error has occurred.");
        });
    }
  };

  const { navigation } = props;
  const { route } = props;
  return (
     <View style={loginStyle.container}>
       <View style={loginStyle.spacing} padder>
        <View style={loginStyle.backWrapper}>
          <Text
            onPress={() => this.props.navigation.navigate("Link Student")}
            style={loginStyle.backButtonStyle}
          >
            <Image
              style={loginStyle.backButton}
              source={require("../../../assets/BackButton.png")}
            />
          </Text>
        </View>
         <View style={loginStyle.bodyContainer}>
           <Text style={globalStyle.h3}>Enter Email Code </Text>
          <Text style={verificationStyle.subHeading}>
            Please enter your the verification code.
          </Text>
        </View>
         <View>
          <View>
            <Image
              style={verificationStyle.envelop}
              source={require("../../../assets/Envelop.png")}
            />
          </View>
          <View style={verificationStyle.spaceBetween}>
            <OtpInputss getOtp={(otp) => getOtp(otp)} />
          </View>
           <View style={loginStyle.formContainer}>
            <Button onPress={submitForm} style={loginStyle.button} full>
              <Text>Send</Text>
            </Button>
            {errorMessage != "" ? (
              <Text style={globalStyle.errorText}>{errorMessage}</Text>
            ) : null}

             <View style={verificationStyle.resendSection}>
              <Text>
                Didn't recieve code?{" "}
                <Text style={globalStyle.hyperlink}>Resend</Text>
              </Text>
            </View>
           </View  >
      </View>
       </View  >
     </View>
  );
};
export default VerificationLinkStudentSignup;
