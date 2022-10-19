import React from "react";
import { View, Image, StyleSheet, ImageBackground, useWindowDimensions,ScrollView, TouchableOpacity, Text, ActivityIndicator, Alert, TextInput } from "react-native";
import { API_URL } from "../Utility/AppConst"
// import {
//   Container,
//   Content,
//   Form,
//   Item,
//   Input,
//   Label,
//   Button,
//   Text,
//   Body,
//   H2,
//   Icon,
// } from "native-base";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import { useSelector } from 'react-redux'
import { SideBarMenu } from "../sidebar";
import DatePicker from 'react-native-datepicker';
import FooterTabs from "../footer/Footer";
import moment from 'moment';
const apiUrl = API_URL.trim();
const PaymentMethodListings = (props) => {
  const userId = useSelector(state => state);
  const [loader, setloader] = React.useState(false);
  const [personId, setPersonId] = React.useState('');
  const [defaultId, setDefaultId] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState([])
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setloader(true)
      if (paymentMethod.length == 0) {
        getPersonId()
      }
    });
  })
  function getPersonId() {
    fetch(`${apiUrl}/odata/StudentAccount`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId.userDataReducer[0].access_Token
      },
    })
      .then(response => response.json())
      .then(data => {
        getPaymentMethod(data.PersonId)
        setPersonId(data.PersonId)
      });
  }
  function getPaymentMethod(personIds) {
    fetch(`${apiUrl}/odata/People(${personIds})/PersonPaymentMethods`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId.userDataReducer[0].access_Token
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.value) {
          setloader(false)
          setPaymentMethod(data.value)
          data.value.length > 0 ?
            data.value.map(function (payment, index) {
              payment.IsDefault ? setDefaultId(payment.PersonPaymentMethodId) : null
            })
            : null
        }
        else {
          setloader(false)
        }
      });
  }
  function setDefault(methodId) {
    setDefaultId(methodId)
    fetch(`${apiUrl}/odata/PaymentMethod(${methodId})`, {
      method: "patch",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => {
        getPaymentMethod(personId)
      })
      .catch((response) => {
        getPaymentMethod(personId)
      });
  }
  function alertDelete(methodId) {
    Alert.alert(
      "Confirm",
      `Are you sure you want to delete this payment method ?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteAccount(methodId) }
      ],
      { cancelable: false }
    );
  }
  function deleteAccount(methodId) {
    fetch(`${apiUrl}/odata/PaymentMethod(${methodId})`, {
      method: "delete",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => {
        getPaymentMethod(personId)
      })
      .catch((response) => {
        getPaymentMethod(personId)
      });
  }
  const { navigation } = props;
  return (
     <View style={loginStyle.container}>
      <SideBarMenu title={"Payment Methods "} navigation={props.navigation} />
      <View style={{ backgroundColor: "#fff", height: "100%" }}>
       <ScrollView style={[loginStyle.spacing, {marginBottom: 160, backgroundColor:"#fff"}]}>
        <View style={loginStyle.contentContainer}>
          {loader ?
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View>
            :
            paymentMethod.length > 0 ?
              paymentMethod.map(function (payment, index) {
                const Expiry = new Date(payment.Expiration).toISOString().slice(0, 10);
                return (
                  <View key={index} style={[globalStyle.Boxshadow, { padding: 15 }]}>
                    <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", paddingTop:10, marginBottom: 10 }}>{payment.PaymentTypeId == 2 ? "Bank Details " : "Credit card "}</Text>
                    {payment.PaymentTypeId != 2 ?
                      <View>
                        <View style={{ marginBottom: 15 }}>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>Nickname </Text>
                            <TextInput
                              value={payment.Nickname}
                              placeholderTextColor='#ccc'
                              style={globalStyle.formControls
                              }
                              placeholder="Nickname"
                              editable={false}
                            />
                          </View>
                        </View>
                        <View style={{ marginBottom: 15 }}>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>Card Number </Text>
                            <TextInput
                              value={"XXXX-XXXX-XXXX-" + payment.Last4Digits}
                              keyboardType="number-pad"
                              placeholderTextColor='#ccc'
                              style={globalStyle.formControls
                              }
                              placeholder="Card Number"
                              editable={false}
                            />
                          </View>
                        </View>
                        <View style={{ marginBottom: 25 }}>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>Card Code </Text>
                            <TextInput
                              value={' ' + payment.SecurityCode}

                              placeholderTextColor='#ccc'
                              style={
                                globalStyle.formControls
                              }
                              editable={false}
                              placeholder="Card Code"
                            />
                          </View>
                        </View>
                        <View style={{ marginBottom: 25 }}>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>Card Expiration </Text>
                            <TextInput
                              value={Expiry}
                              placeholderTextColor='#ccc'
                              style={
                                globalStyle.formControls
                              }
                              editable={false}
                              placeholder="Card Expiration"
                            />
                          </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                          {/* <Button
                            style={defaultId == payment.PersonPaymentMethodId ? [{ alignSelf: "center", justifyContent: "center", backgroundColor: "#4585ff", borderRadius: 6 }] : [{ alignSelf: "center", justifyContent: "center", backgroundColor: "#fff", borderRadius: 6 }]}
                            onPress={() => setDefault(payment.PersonPaymentMethodId)}
                          >
                            <Text style={defaultId == payment.PersonPaymentMethodId ? [loginStyle.buttonText, { textAlign: "center", color: "#fff" }] : [loginStyle.buttonText, { textAlign: "center", color: "#000" }]}>Set as Default</Text>
                          </Button> */}
                          <View style={[loginStyle.radioSection, { marginTop: 0 }]}>
                            <TouchableOpacity
                              style={{ borderColor: "#ddd", borderRadius: 5, borderWidth: 2, height: 25, width: 28, marginRight: 10 }}
                              // value={terms}
                              onPress={() => setDefault(payment.PersonPaymentMethodId)}
                            >
                              {defaultId == payment.PersonPaymentMethodId ? <Image
                                style={{ height: 15, marginRight: 0, marginTop: 2 }}
                                source={require("../../../assets/checkTick.png")}
                                resizeMode={'contain'}
                              /> : null}
                            </TouchableOpacity>
                            <Text style={loginStyle.text}>
                              Set as Default
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={[{ alignSelf: "center", justifyContent: "center", padding:10,  backgroundColor: "#dc3545", borderRadius: 6 }]}
                            onPress={() =>
                              alertDelete(payment.PersonPaymentMethodId)}
                          >
                            <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff", }]}>Delete Card</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      : <View>
                        <View style={{ marginBottom: 15 }}>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>Nickname </Text>
                            <TextInput
                              value={' ' + payment.Nickname}
                              keyboardType="number-pad"
                              placeholderTextColor='#ccc'
                              style={globalStyle.formControls
                              }
                              placeholder="Nickname"
                              editable={false}
                            />
                          </View>
                        </View>
                        <View style={{ marginBottom: 15 }}>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>Account </Text>
                            <TextInput
                              value={"XXXXXX-" + payment.Last4Digits}
                              placeholderTextColor='#ccc'
                              style={globalStyle.formControls
                              }
                              placeholder="Account"
                              editable={false}
                            />
                          </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                          <View style={[loginStyle.radioSection, { marginTop: 0 }]}>
                            <TouchableOpacity
                              style={{ borderColor: "#ddd", borderRadius: 5, borderWidth: 2, height: 25, width: 28, marginRight: 10 }}
                              // value={terms}
                              onPress={() => setDefault(payment.PersonPaymentMethodId)}
                            >
                              {defaultId == payment.PersonPaymentMethodId ? <Image
                                style={{ height: 15, marginRight: 0, marginTop: 2 }}
                                source={require("../../../assets/checkTick.png")}
                                resizeMode={'contain'}
                              /> : null}
                            </TouchableOpacity>
                            <Text style={loginStyle.text}>
                              Set as Default
                            </Text>
                          </View>
                          {/* <Button
                            style={defaultId == payment.PersonPaymentMethodId ? [{ alignSelf: "center", justifyContent: "center", backgroundColor: "#4585ff", borderRadius: 6 }] : [{ alignSelf: "center", justifyContent: "center", backgroundColor: "#fff", borderRadius: 6 }]}
                            onPress={() => setDefault(payment.PersonPaymentMethodId)}
                          >
                            <Text style={defaultId == payment.PersonPaymentMethodId ? [loginStyle.buttonText, { textAlign: "center", color: "#fff" }] : [loginStyle.buttonText, { textAlign: "center", color: "#000" }]}>Set Default</Text>
                          </Button> */}
                          <TouchableOpacity
                            style={[{ alignSelf: "center", padding:10, justifyContent: "center", backgroundColor: "#dc3545", borderRadius: 6 }]}
                            onPress={() =>
                              alertDelete(payment.PersonPaymentMethodId)}
                          >
                            <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff", }]}>Delete </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    }
                  </View>
                );
              })
              : <View style={[globalStyle.tableBoxshadow, {
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                marginBottom: 60,
                marginTop: 60
              }]}>
                <Text style={{ padding: 15, fontSize: 22, alignSelf: "center" }}>No Payment Method Added</Text>
              </View>
          }
          {loader == false
            ?
            <View style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 50 }}>
              <ImageBackground
                style={[globalStyle.Btn, {
                  width: '100%',
                  alignItems: "center"
                }]}
                source={require('./../../../assets/Oval.png')}
                resizeMode={'stretch'}
              >
                <TouchableOpacity
                  style={[loginStyle.buttonSave, { alignSelf: "center", justifyContent: "center" }]}
                  onPress={() => props.navigation.navigate("Payment Method Card")}
                >
                  <Text style={[loginStyle.buttonText, { textAlign: "center" }]}>Add Credit Card</Text>
                </TouchableOpacity>
              </ImageBackground>
              <ImageBackground
                style={[globalStyle.Btn, {
                  width: '100%',
                  alignItems: "center"
                }]}
                source={require('./../../../assets/Oval.png')}
                resizeMode={'stretch'}
              >
                <TouchableOpacity
                  style={[loginStyle.buttonSave, { alignSelf: "center", justifyContent: "center" }]}
                  onPress={() => props.navigation.navigate("Add Payment Account")}
                >
                  <Text style={[loginStyle.buttonText, { textAlign: "center" }]}>Add Bank Account</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
            : null}
        </View>
       </ScrollView  >
       </View>
     </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default PaymentMethodListings;

