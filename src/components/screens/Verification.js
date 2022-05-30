import React, { useRef } from "react";
import { View, Image, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import OtpInputs from "./../Utility/Outinputs";
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
import { API_URL } from "./../Utility/AppConst"
import { useFocusEffect } from '@react-navigation/native';
const VerificationCode = (props) => {
  const userId = useSelector(state => state);
  const [otp, setOtp] = React.useState("");
  const [loader, setloader] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const getOtp = (otp) => {
    setOtp(otp);
  };
  useFocusEffect(
    React.useCallback(() => {
      setloader(true)
      setTimeout(function () {
        setloader(false)
      }, 1000);
    }, [])
  );
  const submitForm = () => {
    if (otp.length < 6) {
      setErrorMessage("Wrong verifcation code");
    } else {
      const apiUrl = API_URL.trim();
      fetch(`${apiUrl}/odata/StudentLink('${props.route.params.studentAccountGuid}')`, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userId.userDataReducer[0].access_Token
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
    <Container style={loginStyle.container}>
      {loader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#29ABE2" />
        </View>
      ) :
        <Content style={loginStyle.spacing} padder>


          <View style={loginStyle.backWrapper}>
            <Text
              onPress={() => props.navigation.navigate("Link Student")}
              style={loginStyle.backButtonStyle}
            >
              <Image
                style={loginStyle.backButton}
                source={require("../../../assets/BackButton.png")}
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
            <Body style={[loginStyle.bodyContainer, { marginTop: 20 }]}>
              <H3 style={globalStyle.h3}>Enter Verification Code</H3>
              <Text style={[verificationStyle.subHeading, { fontSize: 22, }]}>
                Please enter
              </Text>
              <Text style={[verificationStyle.subHeading, { lineHeight: 10, fontSize: 22 }]}>
                your verification code
              </Text>
            </Body>

            <View style={verificationStyle.spaceBetween}>
              <OtpInputs navigation={props.navigation} getOtp={(otp) => getOtp(otp)} />
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

              {/* <Body style={[verificationStyle.resendSection, { marginTop: 20 }]}>
                <Text style={{ fontSize: 18 }}>
                  Didn't recieve code?{" "}
                  <Text style={globalStyle.hyperlink}>Resend</Text>
                </Text>
              </Body> */}
            </Content>
          </Form>
        </Content>
      }

    </Container>
  );
};
export default VerificationCode;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
