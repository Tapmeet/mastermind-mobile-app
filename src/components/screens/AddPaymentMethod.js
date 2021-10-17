import React from "react";
import { View, Image, StyleSheet, ImageBackground, useWindowDimensions, ActivityIndicator } from "react-native";
import { API_URL } from "../Utility/AppConst";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Container, Content, Form, Item, Input, Label, Button, Text, Body, H2, Icon } from "native-base";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import { useSelector } from "react-redux";
import { SideBarMenu } from "../sidebar";
import DatePicker from "react-native-datepicker";

import moment from "moment";
const apiUrl = API_URL.trim();
const AddPaymentMethod = (props) => {
  const [loader, setloader] = React.useState(false);
  const [Nickname, setNickname] = React.useState("");
  const [CardNumber, setCardNumber] = React.useState("");
  const [CardCode, setCardCode] = React.useState("");
  const [CardExpiration, setCardExpiration] = React.useState("");

  const [checkNickname, setCheckNickname] = React.useState(false);
  const [checkCardnumber, setCheckCardnumber] = React.useState(false);
  const [checkCardCode, setCheckCardCode] = React.useState(false);
  const [checkCardExpiration, setCheckCardExpiration] = React.useState(false);
  const [checkCardExpirationDate, setCheckCardExpirationDate] = React.useState(false);
  const [loaderMessage, setLoaderMessage] = React.useState(false);
  const [SuccessMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const userId = useSelector((state) => state);
  const [date, setDate] = React.useState("");
  const [year, setYear] = React.useState(" ");
  const [month, setMonth] = React.useState(" ");
  const yearList = [
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" },
    { label: "2029", value: "2029" },
    { label: "2030", value: "2030" },
  ];
  const monthList = [
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ];
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      clearData();
    });
  });
  const clearData = () => {
    setNickname("");
    setCardNumber("");
    setCardCode("");
    setCardExpiration("");
    setErrorMessage("");
    setCheckCardExpirationDate(false);
  };
  const setnickname = (event) => {
    setNickname(event);
    if (event == "") {
      setCheckNickname(true);
    } else {
      setCheckNickname(false);
    }
  };
  const setcardNumber = (event) => {
    setCardNumber(event);
    if (event == "") {
      setCheckCardnumber(true);
    } else {
      setCheckCardnumber(false);
    }
  };
  const setcardCode = (event) => {
    setCardCode(event);
    if (event == "") {
      setCheckCardCode(true);
    } else {
      setCheckCardCode(false);
    }
  };
  const addMethod = () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (Nickname == "") {
      setCheckNickname(true);
      return false;
    }
    if (CardNumber == "") {
      setCheckCardnumber(true);
      return false;
    }
    if (CardCode == "") {
      setCheckCardCode(true);
      return false;
    }
    if (year == "" || month == "") {
      setCheckCardExpiration(true);
      return false;
    }
    let day = 30;
    let cardexpiration = year + "-" + month + "-" + day;
    setCardExpiration(year + "-" + month + "-" + day);
    console.log(CardExpiration);
    var dates = year + "-" + month + "-" + day;
    var varDate = new Date(dates); //dd-mm-YYYY
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (varDate <= today) {
      setCheckCardExpirationDate(true);
      return false;
    } else {
      setCheckCardExpirationDate(false);
    } 
    setLoaderMessage(true);
    console.log(CardCode);
    console.log(cardexpiration);
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
        CardNumber: CardNumber,
        CardCode: CardCode,
        PaymentType: "1",
        CardExpiration: cardexpiration,
      }),
    })
      .then((response) => {
        setLoaderMessage(false);
        let jsonData = JSON.stringify(response);
        console.log(jsonData);
        let jsonDataPrase = JSON.parse(jsonData);
        console.log(jsonDataPrase.status);
        if (jsonDataPrase.status >= 200 && jsonDataPrase.status < 300) {
          setSuccessMessage("Card Added Successfully");
          setTimeout(function () {
            props.navigation.navigate("Payment Methods");
            setSuccessMessage("");
          }, 3000);
        } else {
          setErrorMessage("Invalid Card");
          setTimeout(function () {
            setErrorMessage("");
          }, 3000);
        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred.");
        setTimeout(function () {
          setErrorMessage("");
        }, 3000);
      });
  };
  const placeholder = {
    label: "YYYY",
  };
  const placeholderMonth = {
    label: "MM",
  };
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Add Credit Card"} navigation={props.navigation} />
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
              <View style={{ marginBottom: 15 }}>
                <View style={checkCardnumber ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Card Number </Text>
                  <Input
                    value={CardNumber}
                    keyboardType="number-pad"
                    onChangeText={(text) => setcardNumber(text)}
                    placeholderTextColor="#ccc"
                    style={globalStyle.formControls}
                    placeholder="Card Number"
                  />
                </View>
                {checkCardnumber ? <Text style={globalStyle.error}>Enter Card Number </Text> : null}
              </View>
              <View style={{ marginBottom: 25 }}>
                <View style={checkCardCode ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Security Code (CVV)</Text>
                  <Input
                    value={CardCode}
                    keyboardType="number-pad"
                    onChangeText={(text) => setcardCode(text)}
                    placeholderTextColor="#ccc"
                    style={globalStyle.formControls}
                    placeholder="Card Code"
                  />
                </View>
                {checkCardCode ? <Text style={globalStyle.error}>Enter Card Code</Text> : null}
              </View>

              <View style={checkCardExpiration ? [globalStyle.formFieldError, { paddingLeft: 15 }] : [globalStyle.formField, { paddingLeft: 15 }]}>
                <Text style={globalStyle.formLabel}>Card Expiration </Text>
                <View style={[globalStyle.formControls, { marginBottom: 15 }]}>
                  <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "100%" }}>
                    <RNPickerSelect
                      value={month}
                      items={monthList}
                      placeholder={placeholderMonth}
                      onValueChange={(value) => setMonth(value)}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: Platform.OS === "android" ? 20 : 30,
                          right: 10,
                        },
                        placeholder: {
                          color: "#8a898e",
                          fontSize: 16,
                          fontWeight: "bold",
                        },
                      }}
                      Icon={() => {
                        return (
                          <Image
                            style={{
                              width: 12,
                              position: "absolute",
                              top: -15,
                              right: 0,
                            }}
                            source={require("../../../assets/arrow-down.png")}
                            resizeMode={"contain"}
                          />
                        );
                      }}
                    />
                    <RNPickerSelect
                      key={yearList}
                      value={year}
                      items={yearList}
                      placeholder={placeholder}
                      onValueChange={(value) => setYear(value)}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: Platform.OS === "android" ? 20 : 30,
                          right: 10,
                        },
                        placeholder: {
                          color: "#8a898e",
                          fontSize: 16,
                          fontWeight: "bold",
                        },
                      }}
                      Icon={() => {
                        return (
                          <Image
                            style={{
                              width: 12,
                              position: "absolute",
                              top: -15,
                              right: 0,
                            }}
                            source={require("../../../assets/arrow-down.png")}
                            resizeMode={"contain"}
                          />
                        );
                      }}
                    />
                  </View>
                </View>
              </View>
              {checkCardExpiration ? <Text style={globalStyle.error}>Enter Card Expiry</Text> : null}
              {checkCardExpirationDate ? <Text style={globalStyle.error}>Invalid Card Expiry</Text> : null}
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
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    minWidth: 105,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    minWidth: 105,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default AddPaymentMethod;
