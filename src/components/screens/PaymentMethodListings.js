import React from "react";
import { View, Image, StyleSheet, ImageBackground, useWindowDimensions, ActivityIndicator, Alert } from "react-native";
import { API_URL } from "../Utility/AppConst"
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
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import { useSelector } from 'react-redux'
import { SideBarMenu } from "../sidebar";
import DatePicker from 'react-native-datepicker';

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
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log("here")
        // console.log(data.PersonId)
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
        'Authorization': 'Bearer ' + userId[0].access_Token
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
        Authorization: "Bearer " + userId[0].access_Token,
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
          onPress: () => console.log("Cancel Pressed"),
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
        Authorization: "Bearer " + userId[0].access_Token,
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
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Payment Methods "} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <View style={loginStyle.contentContainer}>
          {loader ?
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View>
            :
            paymentMethod.length > 0 ?
              paymentMethod.map(function (payment, index) {
                const Expiry = new Date(payment.Expiration).toISOString().slice(0, 10);
              //  console.log(payment)
                return (
                  <View key={index} style={[globalStyle.Boxshadow, { padding: 15 }]}>
                    <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>{payment.PaymentTypeId == 2 ? "Bank Details " : "Credit card "}</Text>
                    {payment.PaymentTypeId != 2 ?
                      <View>
                        <View style={{ marginBottom: 15 }}>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>Nickname </Text>
                            <Input
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
                            <Input
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
                            <Input
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
                            <Input
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
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                          <Button
                            style={defaultId == payment.PersonPaymentMethodId ? [{ alignSelf: "center", justifyContent: "center", backgroundColor: "#4585ff", borderRadius: 6 }] : [{ alignSelf: "center", justifyContent: "center", backgroundColor: "#fff", borderRadius: 6 }]}
                            onPress={() => setDefault(payment.PersonPaymentMethodId)}
                          >
                            <Text style={defaultId == payment.PersonPaymentMethodId ? [loginStyle.buttonText, { textAlign: "center", color: "#fff" }] : [loginStyle.buttonText, { textAlign: "center", color: "#000" }]}>Set Default</Text>
                          </Button>
                          <Button
                            style={[{ alignSelf: "center", justifyContent: "center", backgroundColor: "#3B9DDC", borderRadius: 6 }]}
                            onPress={() => 
                              alertDelete(payment.PersonPaymentMethodId)}
                          >
                            <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff", }]}>Delete Card</Text>
                          </Button>
                        </View>
                      </View>
                      : <View>
                        <View style={{ marginBottom: 15 }}>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>Nickname </Text>
                            <Input
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
                            <Input
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
                          <Button
                            style={defaultId == payment.PersonPaymentMethodId ? [{ alignSelf: "center", justifyContent: "center", backgroundColor: "#4585ff", borderRadius: 6 }] : [{ alignSelf: "center", justifyContent: "center", backgroundColor: "#fff", borderRadius: 6 }]}
                            onPress={() => setDefault(payment.PersonPaymentMethodId)}
                          >
                            <Text style={defaultId == payment.PersonPaymentMethodId ? [loginStyle.buttonText, { textAlign: "center", color: "#fff" }] : [loginStyle.buttonText, { textAlign: "center", color: "#000" }]}>Set Default</Text>
                          </Button>
                          <Button
                            style={[{ alignSelf: "center", justifyContent: "center", backgroundColor: "#3B9DDC", borderRadius: 6 }]}
                            onPress={() => 
                              alertDelete(payment.PersonPaymentMethodId)}
                          >
                            <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff", }]}>Delete Account</Text>
                          </Button>
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
                <Button
                  style={[loginStyle.buttonSave, { alignSelf: "center", justifyContent: "center" }]}
                  onPress={() => props.navigation.navigate("Payment Method Card")}
                >
                  <Text style={[loginStyle.buttonText, { textAlign: "center" }]}>Add Credit Card</Text>
                </Button>
              </ImageBackground>
              <ImageBackground
                style={[globalStyle.Btn, {
                  width: '100%',
                  alignItems: "center"
                }]}
                source={require('./../../../assets/Oval.png')}
                resizeMode={'stretch'}
              >
                <Button
                  style={[loginStyle.buttonSave, { alignSelf: "center", justifyContent: "center" }]}
                  onPress={() => props.navigation.navigate("Add Payment Account")}
                >
                  <Text style={[loginStyle.buttonText, { textAlign: "center" }]}>Add Bank Account</Text>
                </Button>
              </ImageBackground>
            </View>
            : null}
        </View>
      </Content>
    </Container>
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

