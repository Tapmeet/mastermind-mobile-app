import React, { Children } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { API_URL } from "./../../Utility/AppConst";

import PhoneInput from "react-phone-number-input/react-native-input";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Body,
  H2,
  Icon,
} from "native-base";
import loginStyle from "../../../style/login/loginStyle";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import { SideBarMenu } from "../../sidebar";
import { SignatureView } from "react-native-signature-capture-view";
const PurchaseEvent = (props) => {
  const userId = useSelector((state) => state);
  const [fullName, setFullName] = React.useState("");
  const [checkfullName, setCheckfullName] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [phone1, setPhone1] = React.useState("");
  const [checkPhone1, setCheckPhone1] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [checkAddress1, setCheckAddress1] = React.useState(false);
  const [kidsName, setKidsName] = React.useState("");
  const [checkkidsName, setCheckkidsName] = React.useState(false);
  const [checkCardExpiration, setCheckCardExpiration] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [checkterms, setCheckterms] = React.useState(false);
  const [SuccessMessage, setSuccessMessage] = React.useState("");
  const [year, setYear] = React.useState(" ");
  const [month, setMonth] = React.useState(" ");
  const [day, setDay] = React.useState(" ");
  var max = new Date().getFullYear()
  var min = max - 30
  var yearList = []

  for (var i = max; i >= min; i--) {
    yearList.push({ label: i, value: i })
  }
  //console.log(yearList)
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
  const dayList = [
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
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },

    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
    { label: "26", value: "26" },
    { label: "27", value: "27" },
    { label: "28", value: "28" },
    { label: "29", value: "29" },
    { label: "30", value: "30" },
    { label: "31", value: "31" },
  ];
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      clearData();
    });

  });
  const setfullName = (event) => {
    setFirstName(event);
    if (event == "") {
      setCheckfullName(true);
    } else {
      setErrorMessage("");
      setCheckfullName(false);
    }
  };
  const setkidsName = (event) => {
    setKidsName(event);
    if (event == "") {
      setCheckkidsName(true);
    } else {
      setErrorMessage("");
      setCheckkidsName(false);
    }
  };
  const setemail = (event) => {
    setEmail(event);
    if (event == "") {
      setCheckEmail(true);
    } else {
      setErrorMessage("");
      setCheckEmail(false);
    }
  };
  const setphone1 = (event) => {
    setPhone1(event);
    if (event == "") {
      setCheckPhone1(true);
    } else {
      setCheckPhone1(false);
      setErrorMessage("");
    }
  };
  const setaddress1 = (event) => {
    setAddress1(event);
    if (event == "") {
      setCheckAddress1(true);
    } else {
      setErrorMessage("");
      setCheckAddress1(false);
    }
  };
  const clearData = () => {

  };
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };
  const setterms = () => {
    setTerms(!terms);
    if (terms == false) {
      setCheckterms(false);
    } else {
      setCheckterms(true);
    }
  };
  const placeholder = {
    label: "YYYY",
  };
  const placeholderMonth = {
    label: "MM",
  };
  const placeholderDay = {
    label: "DD",
  };
  const submitForm = () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (fullName == "") {
      setCheckfullName(true);
      return false;
    }
    if (email == "") {
      setCheckEmail(true);
      return false;
    }
    if (phone1 == "") {
      setCheckPhone1(true);
      return false;
    }
    if (day == "" || year == "" || month == "") {
      setCheckCardExpiration(true);
      return false;
    }
    let DOB = year + "-" + month + "-" + day;
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

  };
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Inquiry"} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <View style={loginStyle.contentContainer}>
          <Form style={{marginBottom: 20}}>
            <View
              style={{
                marginTop: 10,
                padding: 15,
                paddingBottom: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 26,
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Purchase
                </Text>
                <Text
                  style={{
                    color: "#555",
                    fontSize: 20,
                    fontWeight: "600",
                    marginBottom: 20,
                  }}
                >
                  Please provide the details below
                </Text>
              </View>
            </View>
            <View
              style={
                checkfullName
                  ? globalStyle.formFieldError
                  : globalStyle.formField
              }
            >
              <Text style={globalStyle.formLabel}>First Name</Text>
              <Input
                value={fullName}
                onChangeText={(text) => setfullName(text)}
                style={globalStyle.formControls}
                placeholder="First Name"
              />
            </View>
            {checkfullName ? (
              <Text style={globalStyle.error}>Enter First Name</Text>
            ) : null}
            <View
              style={
                checkEmail
                  ? globalStyle.formFieldError
                  : globalStyle.formField
              }
            >
              <Text style={globalStyle.formLabel}> Email</Text>
              <Input
                value={email}
                onChangeText={(text) => setemail(text)}
                style={globalStyle.formControls}
                autoCapitalize="none"
                placeholder="Primary Email "
              />
            </View>
            {checkEmail ? (
              <Text style={globalStyle.error}>Enter Valid Email</Text>
            ) : null}
            <View
              style={
                checkPhone1
                  ? globalStyle.formFieldError
                  : globalStyle.formField
              }
            >
              <Text style={globalStyle.formLabel}>Phone</Text>
              <PhoneInput
                defaultCountry="US"
                placeholder="Phone"
                value={phone1}
                style={globalStyle.formControls}
                onChange={(text) => setphone1(text)}
              />
            </View>
            {checkPhone1 ? (
              <Text style={globalStyle.error}>Enter Phone Number </Text>
            ) : null}
            <View
              style={
                checkAddress1
                  ? globalStyle.formFieldError
                  : globalStyle.formField
              }
            >
              <Text style={globalStyle.formLabel}>Address</Text>
              <Input
                value={address1}
                onChangeText={(text) => setaddress1(text)}
                style={globalStyle.formControls}
                placeholder="Address"
              />
            </View>
            {checkAddress1 ? (
              <Text style={globalStyle.error}>Enter Address </Text>
            ) : null}
            <View
              style={
                checkkidsName
                  ? globalStyle.formFieldError
                  : globalStyle.formField
              }
            >
              <Text style={globalStyle.formLabel}>Kids Name</Text>
              <Input
                value={kidsName}
                onChangeText={(text) => setkidsName(text)}
                style={globalStyle.formControls}
                placeholder="Kids Name"
              />
            </View>
            {checkkidsName ? (
              <Text style={globalStyle.error}>Enter Kids Name</Text>
            ) : null}
            <View style={checkCardExpiration ? [globalStyle.formFieldError, { paddingLeft: 15 }] : [globalStyle.formField, { paddingLeft: 15 }]}>
              <Text style={globalStyle.formLabel}>Kid's DOB </Text>
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
                          source={require("../../../../assets/arrow-down.png")}
                          resizeMode={"contain"}
                        />
                      );
                    }}
                  />
                  <RNPickerSelect
                    value={day}
                    items={dayList}
                    placeholder={placeholderDay}
                    onValueChange={(value) => setDay(value)}
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
                          source={require("../../../../assets/arrow-down.png")}
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
                          source={require("../../../../assets/arrow-down.png")}
                          resizeMode={"contain"}
                        />
                      );
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={loginStyle.radioSection}>
              <TouchableOpacity
                style={{ borderColor: "#ddd", borderRadius: 5, borderWidth: 2, height: 25, width: 28, marginRight: 10 }}
                value={terms}
                onPress={setterms}
              >
                {terms ? <Image
                  style={{ height: 15, marginRight: 0, marginTop: 2 }}
                  source={require("../../../../assets/checkTick.png")}
                  resizeMode={'contain'}
                /> : null}
              </TouchableOpacity>
              <Text style={[loginStyle.text,{fontSize: 18}]}>
                Accept Terms and Conditions
              </Text>
            </View>
            {checkterms ? (
              <Text style={globalStyle.error}>
                Please agree to the Terms and Conditions before proceed
              </Text>
            ) : null}
            <Content style={loginStyle.formContainer}>
                <ImageBackground
                  style={[
                    globalStyle.Btn,
                    {
                      width: "100%",
                    },
                  ]}
                  source={require("./../../../../assets/Oval.png")}
                  resizeMode={"stretch"}
                >
                  <Button onPress={submitForm} style={loginStyle.buttons} full>
                    <Text style={loginStyle.buttonText}>Proceed</Text>
                  </Button>
                </ImageBackground>
              </Content>
          </Form>
        </View>
      </Content>
    </Container>
  );
};
export default PurchaseEvent;
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
