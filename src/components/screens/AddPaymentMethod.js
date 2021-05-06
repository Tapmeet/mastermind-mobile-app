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
  const [loader, setloader] = React.useState(true);
  const [Nickname, setNickname] = React.useState('');
  const [CardNumber, setCardNumber] = React.useState('');
  const [CardCode, setCardCode] = React.useState('');
  const [CardExpiration, setCardExpiration] = React.useState('');

  const [checkNickname, setCheckNickname] = React.useState(false);
  const [checkCardnumber, setCheckCardnumber] = React.useState(false);
  const [checkCardCode, setCheckCardCode] = React.useState(false);
  const [checkCardExpiration, setCheckCardExpiration] = React.useState(false);
  const userId = useSelector(state => state);
  const [date, setDate] = React.useState('');
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
    if (Nickname == "") {
      setCheckNickname(true);
      return false;
    }
    if (CardNumber == "") {
      setCardNumber(true);
      return false;
    }
    if (CardCode == "") {
      setCardCode(true);
      return false;
    }
    if (CardExpiration == "") {
      setCardExpiration(true);
      return false;
    }
    fetch(`${apiUrl}/odata/Contract(5)`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      });
  }
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Contract "} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <ImageBackground
          style={{
            width: "100%",
            height: 150,
            position: "absolute"
          }}
          source={require('./../../../assets/bg3.png')}
          resizeMode={'stretch'}
        >
        </ImageBackground>
        <View style={loginStyle.contentContainer}>
          <Body style={loginStyle.bodyContainer}>
            <H2 style={globalStyle.h3}>Add Payment Method</H2>
          </Body>
          {loader ?
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View>
            :
            <View style={{ padding: 15 }}>
              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={Nickname}
                  onChangeText={(text) => setnickname(text)}
                  placeholderTextColor='#ccc'
                  style={
                    checkUsername
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="Nickname"
                />
              </Item>
              {checkNickname ? (
                <Text style={globalStyle.error}>Enter Nickname </Text>
              ) : null}
              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={CardNumber}
                  onChangeText={(text) => setcardNumber(text)}
                  placeholderTextColor='#ccc'
                  style={
                    checkUsername
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="Card Number"
                />
              </Item>
              {checkCardnumber ? (
                <Text style={globalStyle.error}>Enter Card Number </Text>
              ) : null}
              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={CardCode}
                  onChangeText={(text) => setcardCode(text)}
                  placeholderTextColor='#ccc'
                  style={
                    checkUsername
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="Card Code"
                />
              </Item>
              {checkCardCode ? (
                <Text style={globalStyle.error}>Enter Card Code</Text>
              ) : null}
              <View style={globalStyle.formControl}>
                        <DatePicker
                          showIcon={false}
                          androidMode="spinner"
                          date={DOB}
                          mode="date"
                          placeholder="YYYY-MM-DD"
                          format="YYYY-MM-DD"
                          maxDate={moment().format('YYYY-MM-DD')}
                          confirmBtnText="Chọn"
                          cancelBtnText="Hủy"
                          customStyles={{
                            dateInput: {
                              backgroundColor: '#F7F8F9',
                              borderWidth: 0,
                              borderColor: 'black',
                              width: "100%"
                            },
                          }}
                          onDateChange={(date) => { setCardExpiration(date) }}
                        />
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
export default Contract;

