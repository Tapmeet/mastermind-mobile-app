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
const Contract = (props) => {
  const signatureRef = React.useRef(null);
  const signatureRef2 = React.useRef(null);
  const signatureRef3 = React.useRef(null);
  const [personId, setPersonId] = React.useState('')
  const [contractData, setContractData] = React.useState([])
  const [paymentMethodCount, setPaymentMethodCount] = React.useState(0)
  const [PayerSignatureTerms, setPayerSignatureTerms] = React.useState('')
  const [PayerSignatureMinor, setPayerSignatureMinor] = React.useState('')
  const [PayerSignatureBilling, setPayerSignatureBilling] = React.useState('')
  const [showSignature, setShowSignature] = React.useState(false);
  const [showSignature2, setShowSignature2] = React.useState(false);
  const [loader, setloader] = React.useState(true);
  const contentWidth = useWindowDimensions().width;

  const [checkNSignature, setCheckNSignature] = React.useState(false);
  const [terms, setTerms] = React.useState("");
  const [hasMinor, setHasMinor] = React.useState(false);
  const userId = useSelector(state => state);
  const [step1, setStep1] = React.useState(true)
  const [step2, setStep2] = React.useState(false)
  const [step3, setStep3] = React.useState(false)

  const [dateSold, setDateSold] = React.useState("");
  const [userPaymentSelected, setUserPaymentSelected] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState([])
  const [SuccessMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  React.useEffect(() => {
    if (contractData.length == 0) {
      getContract()
      getPersonId()
      getPaymentMethod()
      getPersonContract()
    }
  })
  function getContract() {
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
        // console.log(data)
        setloader(false)
        setHasMinor(data.hasMinor)
        setTerms(data.contractTermTemplate)
      });
  }
  const { navigation } = props;
  const steponeSubmit = () => {
    setStep1(false)
    if (hasMinor) {
      setStep2(true)
    } else {
      setStep2(true)
      //setStep3(true)
    }
  };
  const stepTwoSubmit = () => {
    setStep1(false)
    setStep2(false)
    setStep3(true)
  };
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
        //console.log(data)
        setPersonId(data.PersonId)
      });
  }
  function getPaymentMethod() {
    fetch(`${apiUrl}/odata/People(${personId})/PersonPaymentMethods`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
    })
      .then(response => response.json())
      .then(data => {
        setPaymentMethodCount(data.value.length)
        setPaymentMethod(data.value)
      });
  }
  function getPersonContract() {
    fetch(`${apiUrl}/odata/Contract?$filter=ContractStatus eq 'Pending'`, {
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
        setContractData(data.value)
        let dateSolds = new Date(data.value[0].DateSold).toISOString().slice(0, 10);
        console.log(dateSolds)
        setDateSold(dateSolds)
      });
  }
  const submitForm = () => {
    console.log('here');
    setSuccessMessage("");
    const apiUrl = API_URL.trim();
    console.log(userPaymentSelected)
    console.log('heres');
    fetch(`${apiUrl}/odata/Contract(5)`, {
      method: "patch",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
      body: JSON.stringify({
        "PersonPaymentMethodId": userPaymentSelected,
        "PayerSignatureMinor": PayerSignatureMinor,
        "PayerSignatureTerms": PayerSignatureTerms,
        "PayerSignatureBilling": PayerSignatureBilling,
      }),
    })
      .then((response) => {
        let jsonData = JSON.stringify(response);
        console.log(jsonData)
        let jsonDataPrase = JSON.parse(jsonData);
        console.log(jsonDataPrase.status)
        if (jsonDataPrase.status >= 200 && jsonDataPrase.status < 300) {
          setSuccessMessage("Update Successfully");
        } else {
          setErrorMessage("An error has occurred.");
        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred.");
      });
  };
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
            <H2 style={globalStyle.h3}>Contract</H2>
          </Body>
          {loader ?
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View>
            :
            step1 ?
              showSignature == false ?
                <View style={{ padding: 15 }}>
                  <HTML source={{ html: terms }} contentWidth={contentWidth} />
                  {PayerSignatureTerms != '' ? (<View style={{ marginTop: 20 }}><Text style={{
                    fontSize: 20,
                    fontWeight: "bold",

                  }} >Signature</Text><Image style={{ height: 100, width: 300, resizeMode: 'contain', }} source={{ uri: PayerSignatureTerms }} /></View>) : null}
                  <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Button
                      style={[loginStyle.buttonSecondary, { marginTop: 30, }]}
                      onPress={() => { setShowSignature(true) }} full>
                      <Text style={loginStyle.buttonText} >{PayerSignatureTerms != '' ? "Update Signature" : "Add Signature"}</Text>
                    </Button>
                  </View>
                  {PayerSignatureTerms != '' ? (
                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                      <Button
                        style={[loginStyle.buttonSecondary, { marginTop: 30, }]}
                        onPress={steponeSubmit}
                        full>
                        <Text style={loginStyle.buttonText} >Submit</Text>
                      </Button>
                    </View>
                  ) : null}
                </View>
                :
                <View style={{
                  paddingLeft: 20,
                  paddingRight: 20
                }} >
                  <Text style={{
                    fontSize: 20,
                    paddingLeft: 10,
                    fontWeight: "bold",
                    paddingBottom: 10
                  }}>Signature </Text>
                  <SignatureView
                    style={{
                      borderWidth: 2,
                      height: 180,
                    }}
                    ref={signatureRef}
                    onSave={(val) => {
                      setPayerSignatureTerms(val)
                    }}
                    onClear={() => {
                      setPayerSignatureTerms('')
                    }}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'center', height: 50 }}>
                    <TouchableOpacity
                      style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                      onPress={() => {
                        signatureRef.current.clearSignature();
                      }}>
                      <Text>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                      onPress={() => {
                        signatureRef.current.saveSignature();
                        setShowSignature(false)
                        setCheckNSignature(false)
                      }}>
                      <Text>Save</Text>
                    </TouchableOpacity>
                  </View>
                  <Button
                    style={[loginStyle.buttonSecondary, { marginTop: 30 }]}
                    onPress={() => { setShowSignature(false) }} full>
                    <Text>Back</Text>
                  </Button>
                </View>
              : step2 ?
                <View>
                  <View style={{
                    paddingLeft: 20,
                    paddingRight: 20
                  }} >
                    <H2 style={[globalStyle.h3, { fontSize: 20 }]}>Student Minor acknowledgement </H2>
                    <Text style={{
                      fontSize: 20,
                      paddingLeft: 10,
                      fontWeight: "bold",
                      paddingBottom: 10
                    }}>Signature </Text>
                    <SignatureView
                      style={{
                        borderWidth: 2,
                        height: 180,
                      }}
                      ref={signatureRef2}
                      onSave={(val) => {
                        setPayerSignatureMinor(val)
                      }}
                      onClear={() => {
                        setPayerSignatureMinor('')
                      }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', height: 50 }}>
                      <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                        onPress={() => {
                          signatureRef2.current.clearSignature();
                        }}>
                        <Text>Clear</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                        onPress={() => {
                          signatureRef2.current.saveSignature();
                        }}>
                        <Text>Save</Text>
                      </TouchableOpacity> */}
                    </View>
                    <Button
                      style={[loginStyle.buttonSecondary, { marginTop: 30 }]}
                      onPress={stepTwoSubmit}
                      full>
                      <Text>Submit</Text>
                    </Button>
                  </View>
                </View>
                :
                paymentMethodCount > 0 ?
                  showSignature2 == false ?
                    <View style={{
                      marginTop: 30,
                      padding: 15,
                      paddingBottom: 30
                    }}>
                      <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0 }}>General</Text>
                      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Full name</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={contractData[0].StudentFullNames[0]}
                          style={globalStyle.formControl}
                          placeholder="Full Name"
                          editable={false}
                        />
                      </Item>
                      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Discount</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={contractData[0].Discount}
                          style={globalStyle.formControl}
                          placeholder="Full Name"
                          editable={false}
                        />
                      </Item>
                      <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0, marginTop: 25 }}>Membership Options</Text>
                      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Date Sold</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={dateSold}
                          style={globalStyle.formControl}
                          placeholder="Date Sold"
                          editable={false}
                        />
                      </Item>
                      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Fee</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={contractData[0].Fee}
                          style={globalStyle.formControl}
                          placeholder="Fee"
                          editable={false}
                        />
                      </Item>
                      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Finance Charge</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={contractData[0].FinanceCharge}
                          style={globalStyle.formControl}
                          placeholder="FinanceCharge"
                          editable={false}
                        />
                      </Item>
                      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Frequency Type</Text>
                      <Item style={globalStyle.formGroup} floatingLabel>
                        <Input
                          value={contractData[0].FrequencyType}
                          style={globalStyle.formControl}
                          placeholder="FrequencyType"
                          editable={false}
                        />
                      </Item>
                      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 25 }}>Select Payment Method</Text>
                      <View style={globalStyle.formControl}>
                        <Picker
                          selectedValue={userPaymentSelected}
                          style={{ height: 50, width: '100%' }}
                          onValueChange={(itemValue, itemIndex) => setUserPaymentSelected(itemValue)}
                        ><Picker.Item label="Select Payment Method" value='' />
                          {paymentMethod.map((data) => <Picker.Item key={data.Nickname + data.PersonPaymentMethodId} label={data.Nickname} value={data.PersonPaymentMethodId} />)}
                        </Picker>
                      </View>
                      {PayerSignatureBilling != '' ? (<View style={{ marginTop: 20 }}><Text style={{
                        fontSize: 20,
                        fontWeight: "bold",

                      }} >Signature</Text><Image style={{ height: 100, width: 300, resizeMode: 'contain', }} source={{ uri: PayerSignatureBilling }} /></View>) : null}
                      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Button
                          style={[loginStyle.buttonSecondary, { marginTop: 30, }]}
                          onPress={() => { setShowSignature2(true) }} full>
                          <Text style={loginStyle.buttonText} >{PayerSignatureBilling != '' ? "Update Signature" : "Add Signature"}</Text>
                        </Button>
                      </View>
                      {errorMessage != "" ? (
                        <Text style={globalStyle.errorText}>{errorMessage}</Text>
                      ) : null}
                      {SuccessMessage != "" ? (
                        <Text style={globalStyle.sucessText}>{SuccessMessage}</Text>
                      ) : null}
                      {PayerSignatureBilling != '' ? (
                        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                          <Button
                            style={[loginStyle.buttonSecondary, { marginTop: 30, }]}
                            onPress={submitForm}
                            full>
                            <Text style={loginStyle.buttonText} >Submit</Text>
                          </Button>
                        </View>
                      ) : null}
                    </View>
                    : <View style={{
                      paddingLeft: 20,
                      paddingRight: 20
                    }} >
                      <Text style={{
                        fontSize: 20,
                        paddingLeft: 10,
                        fontWeight: "bold",
                        paddingBottom: 10
                      }}>Signature </Text>
                      <SignatureView
                        style={{
                          borderWidth: 2,
                          height: 180,
                        }}
                        ref={signatureRef3}
                        onSave={(val) => {
                          setPayerSignatureBilling(val)
                        }}
                        onClear={() => {
                          setPayerSignatureBilling('')
                        }}
                      />
                      <View style={{ flexDirection: 'row', justifyContent: 'center', height: 50 }}>
                        <TouchableOpacity
                          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                          onPress={() => {
                            signatureRef3.current.clearSignature();
                          }}>
                          <Text>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                          onPress={() => {
                            signatureRef3.current.saveSignature();
                            setShowSignature2(false)

                          }}>
                          <Text>Save</Text>
                        </TouchableOpacity>
                      </View>
                      <Button
                        style={[loginStyle.buttonSecondary, { marginTop: 30 }]}
                        onPress={() => { setShowSignature2(false) }} full>
                        <Text>Back</Text>
                      </Button>
                    </View>
                  :
                  <Text>Submit here</Text>
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

