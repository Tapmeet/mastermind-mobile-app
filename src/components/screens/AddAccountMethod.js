import React from "react";
import { View, Image, StyleSheet, ImageBackground, useWindowDimensions, ActivityIndicator } from "react-native";
import { API_URL } from "../Utility/AppConst";
import { Container, Content, Form, Item, Input, Label, Button, Text, Body, H2, Icon } from "native-base";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import { useSelector } from "react-redux";
import { SideBarMenu } from "../sidebar";
import DatePicker from "react-native-datepicker";
import FooterTabs from "../footer/Footer";
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';
const apiUrl = API_URL.trim();
const AddAccountMethod = (props) => {
  const [loader, setloader] = React.useState(false);
  const [Nickname, setNickname] = React.useState("");
  const [AccountNumber, setAccountNumber] = React.useState("");
  const [Routing, setRouting] = React.useState("");
  const [CardExpiration, setCardExpiration] = React.useState("");
  const [loaderMessage, setLoaderMessage] = React.useState(false);
  const [checkNickname, setCheckNickname] = React.useState(false);
  const [checkAccountNumber, setCheckAccountNumber] = React.useState(false);
  const [checkRouting, setCheckRouting] = React.useState(false);
  const [checkCardExpiration, setCheckCardExpiration] = React.useState(false);
  const [SuccessMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const userId = useSelector((state) => state);
  const [date, setDate] = React.useState("");
  useFocusEffect(
    React.useCallback(() => {
      clearData();
    }, [])
  );
  const clearData = () => {
    setNickname("");
    setAccountNumber("");
    setRouting("");
  };
  const setnickname = (event) => {
    setNickname(event);
    if (event == "") {
      setCheckNickname(true);
    } else {
      setCheckNickname(false);
    }
  };
  const setaccountNumber = (event) => {
    setAccountNumber(event);
    if (event == "") {
      setCheckAccountNumber(true);
    } else {
      setCheckAccountNumber(false);
    }
  };
  const setrouting = (event) => {
    setRouting(event);
    if (event == "") {
      setCheckRouting(true);
    } else {
      setCheckRouting(false);
    }
  };
  const addMethod = () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (Nickname == "") {
      setCheckNickname(true);
      return false;
    }
    if (AccountNumber == "") {
      setCheckAccountNumber(true);
      return false;
    }
    if (Routing == "") {
      setCheckRouting(true);
      return false;
    }
    setLoaderMessage(true);
    fetch(`${apiUrl}/odata/PaymentMethod`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
      body: JSON.stringify({
        PersonPaymentMethodId: 0,
        Nickname: Nickname,
        Account: AccountNumber,
        Routing: Routing,
        PaymentType: "2",
      }),
    })
      .then((response) => {
        let jsonData = JSON.stringify(response);
        let jsonDataPrase = JSON.parse(jsonData);
        setLoaderMessage(false);
        if (jsonDataPrase.status >= 200 && jsonDataPrase.status < 300) {
          setSuccessMessage("Account Added Successfully");
          setTimeout(function () {
            props.navigation.navigate("Payment Methods");
            setSuccessMessage("");
          }, 3000);
        } else {
          setErrorMessage("Invalid Details");
          setTimeout(function () {
            setErrorMessage("");
          }, 3000);
        }
      })
      .catch((response) => {
        console.log(response)
        setErrorMessage("An error has occurred.");
        setTimeout(function () {
          setErrorMessage("");
        }, 3000);
        setLoaderMessage(false);
      });
  };
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Add Bank Account"} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <View style={loginStyle.contentContainer}>
          {loader ? (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View>
          ) : (
            <View style={{ padding: 15 }}>
              <View style={{ marginBottom: 15 }}>
                <View style={checkNickname ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Nickname </Text>
                  <Input
                    value={Nickname}
                    onChangeText={(text) => setnickname(text)}
                    placeholderTextColor="#ccc"
                    style={globalStyle.formControls}
                    placeholder="Nickname"
                  />
                </View>
                {checkNickname ? <Text style={globalStyle.error}>Enter Nickname </Text> : null}
              </View>
              <View style={{ marginBottom: 25 }}>
                <View style={checkRouting ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Routing </Text>
                  <Input
                    value={Routing}
                    onChangeText={(text) => setrouting(text)}
                    placeholderTextColor="#ccc"
                    style={globalStyle.formControls}
                    placeholder="Routing"
                  />
                </View>
                {checkRouting ? <Text style={globalStyle.error}>Enter Routing</Text> : null}
              </View>
              <View style={{ marginBottom: 15 }}>
                <View style={checkAccountNumber ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Account Number </Text>
                  <Input
                    value={AccountNumber}
                    keyboardType="number-pad"
                    onChangeText={(text) => setaccountNumber(text)}
                    placeholderTextColor="#ccc"
                    style={globalStyle.formControls}
                    placeholder="Account Number "
                  />
                </View>
                {checkAccountNumber ? <Text style={globalStyle.error}>Enter Account Number </Text> : null}
              </View>
              {errorMessage != "" ? <Text style={globalStyle.errorText}>{errorMessage}</Text> : null}
              {SuccessMessage != "" ? <Text style={globalStyle.sucessText}>{SuccessMessage}</Text> : null}
              {loaderMessage ? (
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#29ABE2" />
                </View>
              ) : null}
              <View style={{ paddingLeft: 0, paddingRight: 0, marginTop: 20, marginBottom: 30 }}>
                <ImageBackground
                  style={[
                    globalStyle.Btn,
                    {
                      width: "100%",
                    },
                  ]}
                  source={require("./../../../assets/Oval.png")}
                  resizeMode={"stretch"}
                >
                  <Button style={[loginStyle.buttons]} onPress={addMethod} full>
                    <Text style={loginStyle.buttonText}>Submit</Text>
                  </Button>
                </ImageBackground>
              </View>
            </View>
          )}
        </View>
      </Content>
      <FooterTabs navigation={props.navigation} />
    </Container>
  );
};
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

export default AddAccountMethod;
