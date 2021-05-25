import React from "react";
import { View, Image, StyleSheet, ImageBackground, useWindowDimensions, ActivityIndicator } from "react-native";
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
        console.log("here")
        console.log(data.PersonId)
        getPaymentMethod(data.PersonId)
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
        console.log("heres")
        console.log(data.value)
        setloader(false)
        setPaymentMethod(data.value)

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
            paymentMethod.map(function (payment, index) {
              const Expiry = new Date(payment.Expiration).toISOString().slice(0, 10);
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
                    </View>
                    : <View>
                      <View style={{ marginBottom: 15 }}>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>Account </Text>
                          <Input
                            value={' ' + payment.Account}
                            placeholderTextColor='#ccc'
                            style={globalStyle.formControls
                            }
                            placeholder="Account"
                            editable={false}
                          />
                        </View>
                      </View>
                      <View style={{ marginBottom: 15 }}>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>Routing </Text>
                          <Input
                            value={' ' + payment.Routing}
                            keyboardType="number-pad"
                            placeholderTextColor='#ccc'
                            style={globalStyle.formControls
                            }
                            placeholder="Routing"
                            editable={false}
                          />
                        </View>
                      </View>
                    </View>
                  }
                </View>
              );
            })
          }
          {loader == false
            ?
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 50 }}>
              <Button
                style={[loginStyle.buttonSecondarys, { marginTop: 20, width: "50%" }]}
                onPress={() => props.navigation.navigate("Payment Method Card")}
              >
                <Text style={[loginStyle.buttonText, { color: "#333" }]}>Add Card</Text>
              </Button>
              <ImageBackground
                style={[globalStyle.Btn, {
                  width: '50%',
                  alignItems: "center"
                }]}
                source={require('./../../../assets/Oval.png')}
                resizeMode={'stretch'}
              >
                <Button
                  style={[loginStyle.buttonSave, { alignSelf: "center", justifyContent: "center" }]}
                  onPress={() => props.navigation.navigate("Add Payment Account")}
                >
                  <Text style={[loginStyle.buttonText, { textAlign: "center" }]}>Add Account</Text>
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

