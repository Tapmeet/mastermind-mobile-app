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
  const VerificationToken = 'MHK2JG';
  const [errorMessage, setErrorMessage] = React.useState("");
  const getOtp = (otp) => {
    setOtp(otp);
  };
  const submitForm = () => {
    console.log(otp)
    console.log("Verifcation " + VerificationToken)
    if (otp != VerificationToken) {
      setErrorMessage("Wrong verifcation code");
    } else {
      const token = '5Uq6qgGubQj-IgYw280OFfdvfMghaFApCIYSFwEvSYorxxVktp6NQLuzw04EDf8mFpJP6K1__n164FLNSEIwfkfDYccMOUaO6-icDZsV0gprQT3SmyR8yq42DoOyv5sfEehCbqXCKvk33q7NzE8MSWidD1qJog-vGPC2u3uk_XXFfSoqYarwDmb96Oe40-9s0rDFaTTndTndOlQzSjNnKbasU8J_fo8iQaJOr4d_tNOcU4I1Q6BGyTssH7uKiKCzjyNT4JsrSdp3br_GFsFqpBoaBpr9b5-QZbv7OogaA_CTy5iSOKMh5P2e3sbZVL3C-X2xxdN2-60X2m14PwL_BA3spNEOO2DhHv3qwMxkzUjtJ2kJ_uJyQHXTQn-JRnt-T2bPNJZxEz_pvd3ZnpgJTyXAx8zuYhabz0EdywVBpgaQ8tiAxE0nSkcVkCnWjfORYseYqB310dDw9AfZBITYxIkMcaa005dCP7vCBcIXGzgqxe1_u7p2KAswDeHJcUDGZXGYZvr4v8Csz9axw4370A'
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
