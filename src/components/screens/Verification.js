import React, { useRef } from "react";
import { View, Image, StyleSheet } from "react-native";
import OtpInputs from "./../Utility/Outinputs";
import {
  Container,
  CheckBox,
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
import { API_URL } from "@env"
const VerificationCode = (props) => {
  const [otp, setOtp] = React.useState("");
  const VerificationToken = 'QPC4R3';
  const [errorMessage, setErrorMessage] = React.useState("");
  const getOtp = (otp) => {
    setOtp(otp);
  };
 
  const submitForm = () => {
    console.log(otp)
    if (otp != VerificationToken) {
      setErrorMessage("Wrong verifcation code");
    } else {
      const token = 'yKuc4ra75LpO8us0VmZKEYapV9V_4AQh5Yr1daWD3xfGZNKyw5WmE3pRdnmXsELfWY-QdPR74tv5IYcP7o4dVBxUZXGCXlL5pjiL8i0xIW_T4zW9XViitZSpXtgnANMnpDg906_a8_ysUU6lkC_Q1Que_VhkRojq-PlyMsgkqlxRvB7u_wg6pgf__uyxwVjyWZbq63IWSB6VeDBFy3e1OHLDZmKl3u23CxpfRIVut7pYfmOvJSeuXh8mQX2C8cSknyOZi7p27woth7puA8v0hA6BngHNzO1D3SV7hTGcXFotpm7PLuVDpWBIyBCIo9KTAPnnw1DJ6vhaYIsvTA5KYLAD3oUE125Vp5SKtsIcHvFzj8jGVpcCsjhXrzvOY3-63ijG6Frq5qTxsz66DKE04QipnuBIb3xe8FsokORaYKbzrlLnIQZbigziByLX2lJUnctqIk63SWEPkNZin4_vfgb97_aW_be5NIhQaE9L_SiCpA7pahaN_odqXfplu2FlITgJ-aMqnPqgx-yL1utJ0A'
      fetch(`${API_URL}/odata/StudentLink('${props.route.params.studentAccountGuid}')`, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          Email: props.route.params.Email,
          FirstName: props.route.params.FirstName,
          LastName: props.route.params.LastName,
          StudentId: props.route.params.studentId,
          VerificationToken: VerificationToken,
        }), 
      })
      .then((response) => {
        let jsonData = JSON.stringify(response);
        console.log(jsonData)
        let jsonDataPrase = JSON.parse(jsonData);
        console.log(jsonDataPrase.status)
        if (jsonDataPrase.status != 204) {
          setErrorMessage("An error has occurred.");
        } else {
          setSuccessMessage('Successfully Submitted.')
         // props.navigation.navigate("ResetSuccess");
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
      <Content style={loginStyle.spacing} padder>
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
        <Body style={loginStyle.bodyContainer}>
          <H3 style={globalStyle.h3}>Enter Email Code</H3>
          <Text style={verificationStyle.subHeading}>
            Please enter your the verification code.
          </Text>
        </Body>
        <Form>
          <Body>
            <Image
              style={verificationStyle.envelop}
              source={require("../../../assets/Envelop.png")}
            />
          </Body>
          <Body style={verificationStyle.spaceBetween}>
            <OtpInputs getOtp={(otp) => getOtp(otp)} />
          </Body>
          <Content style={loginStyle.formContainer}>
            <Button onPress={submitForm} style={loginStyle.button} full>
              <Text>Send</Text>
            </Button>
            {errorMessage != "" ? (
              <Text style={globalStyle.errorText}>{errorMessage}</Text>
            ) : null}
            <Body style={verificationStyle.resendSection}>
              <Text>
                Didn't recieve code?{" "}
                <Text style={globalStyle.hyperlink}>Resend</Text>
              </Text>
            </Body>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default VerificationCode;
