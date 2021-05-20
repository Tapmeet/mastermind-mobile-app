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
import { Picker } from '@react-native-picker/picker';
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
  React.useEffect(() => {
    setContract(props.route.params.contractData)
    dateSolds = new Date(props.route.params.contractData.DateSold).toISOString().slice(0, 10);
    dateStart = new Date(props.route.params.contractData.StartDate).toISOString().slice(0, 10);
    endDate = new Date(props.route.params.contractData.EndDate).toISOString().slice(0, 10);
    setloader(false)
   console.log(props.route.params.contractData.ContractId)
    if(loader){
      fetch(`${apiUrl}/odata/StudentProgramContractInfo(${props.route.params.contractData.ContractId})`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userId[0].access_Token
        },
      })
        .then(response => response.json())
        .then(response => {
          setPersonData(response.value)
          console.log(response.value);
        });
    }
    

  })
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Signed Contract "} navigation={props.navigation} />
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
            <H2 style={globalStyle.h3}>Signed Contract</H2>
          </Body>
          {loader ?
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View> :
            <View style={{
              marginTop: 30,
              padding: 15,
              paddingBottom: 30,
              marginBottom: 50
            }}>
              <View >
                <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0 }}>General</Text>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Full name</Text>
                {contract.StudentFullNames.length > 0 ?
                  contract.StudentFullNames.map(function (student, index) {
                    return (<Item key={index} style={[globalStyle.formGroup, { marginBottom: 10 }]} floatingLabel >
                      <Input
                        value={student}
                        style={globalStyle.formControl}
                        placeholder="Full Name"
                        editable={false}
                      />
                    </Item>
                    );
                  })
                  : null}
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Full Price</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + contract.FullPrice}
                    style={globalStyle.formControl}
                    placeholder="Full Price"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Discount</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + contract.Discount}
                    style={globalStyle.formControl}
                    placeholder="Discount"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0, marginTop: 25 }}>Membership Options</Text>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Date Sold</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={dateSolds}
                    style={globalStyle.formControl}
                    placeholder="Date Sold"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Start Date </Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={dateStart}
                    style={globalStyle.formControl}
                    placeholder="Start Date"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>End Date</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={endDate}
                    style={globalStyle.formControl}
                    placeholder="End Date"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0, marginTop: 25 }}>Financial Information</Text>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Fee</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + contract.Fee}
                    style={globalStyle.formControl}
                    placeholder="Fee"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Down Payment</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + personData[0].DownPayment}
                    style={globalStyle.formControl}
                    placeholder="Down Payment"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Fee</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + personData[0].Fee}
                    style={globalStyle.formControl}
                    placeholder="Fee"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Discount</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + personData[0].Discount}
                    style={globalStyle.formControl}
                    placeholder="Discount"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Payment Schedule Discount</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + personData[0].PaymentScheduleDiscount}
                    style={globalStyle.formControl}
                    placeholder="Payment Schedule Discount"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Payment Schedule Discount Percentage</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={personData[0].PaymentScheduleDiscountPercentage}
                    style={globalStyle.formControl}
                    placeholder="PaymentScheduleDiscountPercentage"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Finance Charge</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + contract.FinanceCharge}
                    style={globalStyle.formControl}
                    placeholder="FinanceCharge"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Transfer Credit</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + contract.TransferCredit}
                    style={globalStyle.formControl}
                    placeholder="Transfer Credit"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Unpaid Balance</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={"$" + contract.UnpaidBalance}
                    style={globalStyle.formControl}
                    placeholder="Unpaid Balance"
                    editable={false}
                  />
                </Item>
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Frequency Type</Text>
                <Item style={globalStyle.formGroup} floatingLabel>
                  <Input
                    value={contract.FrequencyType}
                    style={globalStyle.formControl}
                    placeholder="FrequencyType"
                    editable={false}
                  />
                </Item>

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

