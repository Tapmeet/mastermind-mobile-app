import React from "react";
import { View, Image, StyleSheet, ImageBackground, useWindowDimensions, ActivityIndicator, TouchableOpacity } from "react-native";
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
import HTML from "react-native-render-html";
import { SignatureView } from 'react-native-signature-capture-view';
//import AddPaymentMethod from './AddPaymentMethod';
const apiUrl = API_URL.trim();
var dateSolds, dateStart, endDate
const SignedContract = (props) => {
  const [loader, setloader] = React.useState(true);
  const [contractId, setContractId] = React.useState('')
  const [contract, setContract] = React.useState('')
  const userId = useSelector(state => state);
  const [personData, setPersonData] = React.useState([])
  const [counter, setCounter] = React.useState(1)

  const increment = () => {
    setCounter(parseInt(counter) + 1);
  }
  const decrement = () => {
    setCounter(parseInt(counter) - 1);
  }
  React.useEffect(() => {
    setContract(props.route.params.contractData)
    dateSolds = new Date(props.route.params.contractData.DateSold).toISOString().slice(0, 10);
    dateStart = new Date(props.route.params.contractData.StartDate).toISOString().slice(0, 10);
    endDate = new Date(props.route.params.contractData.EndDate).toISOString().slice(0, 10);

    if (loader) {
      fetch(`${apiUrl}/odata/StudentProgramContractInfo(${props.route.params.contractData.ContractId})`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userId.userDataReducer[0].access_Token
        },
      })
        .then(response => response.json())
        .then(response => {
          setPersonData(response.value)
          setloader(false)
        });
    }


  })
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Signed Contract "} navigation={props.navigation} />
      <Content style={loginStyle.spacings}>
        <View style={loginStyle.contentContainer}>
          {loader ?
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View> :
            <View style={{
              marginTop: 0,
              padding: 15,
              paddingBottom: 30,
              marginBottom: 50
            }}>
              <View style={globalStyle.dflex}>
                <View style={[globalStyle.TopSection, { justifyContent: "flex-start" }]}>
                  {counter > 1 ?
                    <Image style={{ height: 35, width: 35, resizeMode: 'contain', }} source={require('./../../../assets/lastCheck.png')} />
                    :
                    <Image style={{ height: 30, width: 30, resizeMode: 'contain', }} source={require('./../../../assets/activeicon.png')} />
                  }
                </View>
                <View style={[globalStyle.TopSection, { marginLeft: 40 }]}>
                  {counter == 2 ?
                    <Image style={{ height: 30, width: 30, resizeMode: 'contain', }} source={require('./../../../assets/activeicon.png')} />
                    :
                    counter > 2 ?
                      <Image style={{ height: 35, width: 35, resizeMode: 'contain', }} source={require('./../../../assets/lastCheck.png')} />
                      :
                      <Image style={{ height: 20, width: 20, resizeMode: 'contain', }} source={require('./../../../assets/iconTop.png')} />
                  }
                </View>
                <View style={[globalStyle.TopSection, { marginLeft: 40 }]}>
                  {counter == 3 ?
                    <Image style={{ height: 30, width: 30, resizeMode: 'contain', }} source={require('./../../../assets/activeicon.png')} />
                    :
                    counter > 3 ?
                      <Image style={{ height: 35, width: 35, resizeMode: 'contain', }} source={require('./../../../assets/lastCheck.png')} />
                      :
                      <Image style={{ height: 20, width: 20, resizeMode: 'contain', }} source={require('./../../../assets/iconTop.png')} />
                  }
                </View>
                <View style={[globalStyle.TopSection, { justifyContent: "flex-end", alignItems: "flex-end" }]}>
                  {counter == 4 ?
                    <Image style={{ height: 30, width: 30, resizeMode: 'contain', }} source={require('./../../../assets/activeicon.png')} />
                    :
                    counter > 4 ?
                      <Image style={{ height: 35, width: 35, resizeMode: 'contain', }} source={require('./../../../assets/lastCheck.png')} />
                      :
                      <Image style={{ height: 20, width: 20, resizeMode: 'contain', }} source={require('./../../../assets/iconTop.png')} />
                  }
                </View>
                <View style={globalStyle.line}></View>
              </View>
              <View >
                {counter == 1 ?
                  <View>
                    <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0 }}>General</Text>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Full name</Text>
                      {contract.StudentFullNames.length > 0 ?
                        contract.StudentFullNames.map(function (student, index) {
                          return (<Item key={index} style={[globalStyle.formGroup, { marginBottom: 10 }]} floatingLabel >
                            <Input
                              value={student}
                              style={globalStyle.formControls}
                              placeholder="Full Name"
                              editable={false}
                            />
                          </Item>
                          );
                        })
                        : null}
                    </View>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Price</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={"$" + contract.FullPrice}
                          style={globalStyle.formControls}
                          placeholder="Full Price"
                          editable={false}
                        />
                      </Item>
                    </View>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Discount</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={"$" + contract.Discount}
                          style={globalStyle.formControls}
                          placeholder="Discount"
                          editable={false}
                        />
                      </Item>
                    </View>
                  </View>
                  : null}
                {counter == 2 ?
                  <View>
                    <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0, marginTop: 25 }}>Membership Options</Text>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Date Sold</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={dateSolds}
                          style={globalStyle.formControls}
                          placeholder="Date Sold"
                          editable={false}
                        />
                      </Item>
                    </View>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Start Date </Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={dateStart}
                          style={globalStyle.formControls}
                          placeholder="Start Date"
                          editable={false}
                        />
                      </Item>
                    </View>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>End Date </Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={endDate}
                          style={globalStyle.formControls}
                          placeholder="End Date"
                          editable={false}
                        />
                      </Item>
                    </View>
                  </View>
                  : null}
                {counter == 3 ?
                  <View>
                    <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0, marginTop: 25 }}>Financial Information</Text>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Fee </Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={"$" + contract.Fee}
                          style={globalStyle.formControls}
                          placeholder="Fee"
                          editable={false}
                        />
                      </Item>
                    </View>
                    {personData.length > 0 ?
                      <View>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>Down Payment </Text>
                          <Item style={globalStyle.formGroup} floatingLabel>
                            <Input
                              value={"$" + personData[0].DownPayment}
                              style={globalStyle.formControls}
                              placeholder="Down Payment"
                              editable={false}
                            />
                          </Item>
                        </View>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>Finance Charge </Text>
                          <Item style={globalStyle.formGroup} floatingLabel>
                            <Input
                              value={"$" + contract.FinanceCharge}
                              style={globalStyle.formControls}
                              placeholder="Finance Charge"
                              editable={false}
                            />
                          </Item>
                        </View>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>Discount </Text>
                          <Item style={globalStyle.formGroup} floatingLabel>
                            <Input
                              value={"$" + personData[0].Discount}
                              style={globalStyle.formControls}
                              placeholder="Discount"
                              editable={false}
                            />
                          </Item>
                        </View>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>Payment Schedule Discount </Text>
                          <Item style={globalStyle.formGroup} floatingLabel>
                            <Input
                              value={"$" + personData[0].PaymentScheduleDiscount}
                              style={globalStyle.formControls}
                              placeholder="Payment Schedule Discount"
                              editable={false}
                            />
                          </Item>
                        </View>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>Payment Schedule Discount Percentage</Text>
                          <Item style={globalStyle.formGroup} floatingLabel>
                            <Input
                              value={personData[0].PaymentScheduleDiscountPercentage}
                              style={globalStyle.formControls}
                              placeholder="PaymentScheduleDiscountPercentage"
                              editable={false}
                            />
                          </Item>
                        </View>
                      </View>
                      : null
                    }
                  </View>
                  : null}
                {counter == 4 ?
                  <View>
                    <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0, marginTop: 25 }}>Other Financial Information</Text>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Finance Charge</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={"$" + contract.FinanceCharge}
                          style={globalStyle.formControls}
                          placeholder="FinanceCharge"
                          editable={false}
                        />
                      </Item>
                    </View>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Transfer Credit</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={"$" + contract.TransferCredit}
                          style={globalStyle.formControls}
                          placeholder="Transfer Credit"
                          editable={false}
                        />
                      </Item>
                    </View>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Unpaid Balance</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={"$" + contract.UnpaidBalance}
                          style={globalStyle.formControls}
                          placeholder="Unpaid Balance"
                          editable={false}
                        />
                      </Item>
                    </View>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Frequency Type</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={contract.FrequencyType}
                          style={globalStyle.formControls}
                          placeholder="Frequency Type"
                          editable={false}
                        />
                      </Item>
                    </View>
                    <View style={globalStyle.formField}>
                      <Text style={globalStyle.formLabel}>Monthly Price</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={"$" + contract.MonthlyPrice}
                          style={globalStyle.formControls}
                          placeholder="Monthly Price"
                          editable={false}
                        />
                      </Item>
                    </View>

                  </View>
                  : null}
              </View>
              <View style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 50, paddingLeft: 0, paddingRight: 0, marginTop: 20 }}>
                {counter < 4 ?
                  <ImageBackground
                    style={counter == 1 ? globalStyle.BtnFull : [globalStyle.BtnHalf, { width: '100%' }]
                    }
                    source={require('./../../../assets/Oval.png')}
                    resizeMode={'stretch'}
                  >
                    <Button
                      style={[loginStyle.buttonSave, { alignSelf: "center" }]}
                      onPress={increment}
                      full
                    >
                      <Text style={loginStyle.buttonText}>Next</Text>
                    </Button>
                  </ImageBackground>
                  : null}
                {counter > 1 ?
                  <Button
                    style={counter == 4 ? [loginStyle.buttonSecondarys, { marginTop: 20, width: "100%" }] : [loginStyle.buttonSecondarys, { marginTop: 20, width: "100%" }]}
                    onPress={decrement} >
                    <Text style={[loginStyle.buttonText, { color: "#333" }]}>Previous</Text>
                  </Button>
                  : null}
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
export default SignedContract;

