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
const AddPaymentMethod = (props) => {
  const [loader, setloader] = React.useState(false);
  const [Nickname, setNickname] = React.useState('');
  const [CardNumber, setCardNumber] = React.useState('');
  const [CardCode, setCardCode] = React.useState('');
  const [CardExpiration, setCardExpiration] = React.useState('');

  const [checkNickname, setCheckNickname] = React.useState(false);
  const [checkCardnumber, setCheckCardnumber] = React.useState(false);
  const [checkCardCode, setCheckCardCode] = React.useState(false);
  const [checkCardExpiration, setCheckCardExpiration] = React.useState(false);
  const [SuccessMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const userId = useSelector(state => state);
  const [date, setDate] = React.useState('');
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      clearData()
    })
  })
  const clearData = () => {
    setNickname('');
    setCardNumber('');
    setCardCode('');
    setCardExpiration('')
  }
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
    setErrorMessage('');
    setSuccessMessage('');
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
    if (CardExpiration == "") {
      setCheckCardExpiration(true);
      return false;
    }
    fetch(`${apiUrl}/odata/PaymentMethod`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
      body: JSON.stringify({
        "PersonPaymentMethodId": 0,
        "Nickname": Nickname,
        "CardNumber": CardNumber,
        "CardCode": CardCode,
        "PaymentType": "1",
        "CardExpiration": CardExpiration
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response["odata.error"]) {
          console.log(response["odata.error"].message.value);
          setErrorMessage(response["odata.error"].message.value);
        } else {
          setSuccessMessage('Card Added Successfully');
        }
      });
  }
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={" Add Payment Method "} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <View style={loginStyle.contentContainer}>
          {loader ?
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View>
            :
            <View style={{ padding: 15 }}>
              <View style={{ marginBottom: 15 }}>
                <View style={checkNickname
                  ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Nickname </Text>
                  <Input
                    value={Nickname}
                    onChangeText={(text) => setnickname(text)}
                    placeholderTextColor='#ccc'
                    style={globalStyle.formControls
                    }
                    placeholder="Nickname"
                  />
                </View>
                {checkNickname ? (
                  <Text style={globalStyle.error}>Enter Nickname </Text>
                ) : null}
              </View>
              <View style={{ marginBottom: 15 }}>
                <View style={checkCardnumber
                  ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Card Number </Text>
                  <Input
                    value={CardNumber}
                    keyboardType="number-pad"
                    onChangeText={(text) => setcardNumber(text)}
                    placeholderTextColor='#ccc'
                    style={globalStyle.formControls
                    }
                    placeholder="Card Number"
                  />
                </View>
                {checkCardnumber ? (
                  <Text style={globalStyle.error}>Enter Card Number </Text>
                ) : null}
              </View>
              <View style={{ marginBottom: 25 }}>
                <View style={checkCardCode
                  ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Card Code </Text>
                  <Input
                    value={CardCode}
                    onChangeText={(text) => setcardCode(text)}
                    placeholderTextColor='#ccc'
                    style={
                      globalStyle.formControls
                    }
                    placeholder="Card Code"
                  />
                </View>
                {checkCardCode ? (
                  <Text style={globalStyle.error}>Enter Card Code</Text>
                ) : null}
              </View>

              <View style={checkCardExpiration
                ? globalStyle.formFieldError : globalStyle.formField}>
                <Text style={globalStyle.formLabel}>Card Expiration </Text>
                <View style={[globalStyle.formControls, { marginBottom: 15 }]}>
                  <DatePicker
                    showIcon={false}
                    androidMode="spinner"
                    date={CardExpiration}
                    mode="date"
                    placeholder="YYYY-MM-DD"
                    format="YYYY-MM-DD"
                    //maxDate={moment().format('YYYY-MM-DD')}
                    confirmBtnText="Chọn"
                    cancelBtnText="Hủy"
                    style={{ fontSize: 20 }}
                    customStyles={{
                      dateInput: {
                        backgroundColor: '#F7F8F9',
                        borderWidth: 0,
                        borderColor: 'black',
                        width: "100%",
                        padding: 0,
                        fontSize: 20
                      },
                    }}
                    onDateChange={(date) => { setCardExpiration(date) }}
                  />
                </View>
              </View>
              {checkCardExpiration ? (
                <Text style={globalStyle.error}>Enter Card Expiry</Text>
              ) : null}
              {errorMessage != "" ? (
                <Text style={globalStyle.errorText}>{errorMessage}</Text>
              ) : null}
              {SuccessMessage != "" ? (
                <Text style={globalStyle.sucessText}>{SuccessMessage}</Text>
              ) : null}
              <View style={{ paddingLeft: 0, paddingRight: 0, marginTop: 20, marginBottom: 30 }}>
                <ImageBackground
                  style={[globalStyle.Btn, {
                    width: '100%'
                  }]}
                  source={require('./../../../assets/Oval.png')}
                  resizeMode={'stretch'}
                >
                  <Button
                    style={[loginStyle.buttons]}
                    onPress={addMethod}
                    full>
                    <Text style={loginStyle.buttonText} >Submit</Text>
                  </Button>
                </ImageBackground>
              </View>

            </View>
          }

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
export default AddPaymentMethod;

