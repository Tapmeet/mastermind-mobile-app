import React from "react";
import { View, Image, StyleSheet, ImageBackground, useWindowDimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import { API_URL } from "../Utility/AppConst"
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
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

const apiUrl = API_URL.trim();
const Contract = (props) => {
  const signatureRef = React.useRef(null);
  const [processing, setProcessing] = React.useState(false);
  const signatureRef2 = React.useRef(null);
  const signatureRef3 = React.useRef(null);
  const [personId, setPersonId] = React.useState('')
  const [contractId, setContractId] = React.useState('')
  const [contractData, setContractData] = React.useState([])
  const [paymentMethodCount, setPaymentMethodCount] = React.useState(0)
  const [PayerSignatureTerms, setPayerSignatureTerms] = React.useState('')
  const [PayerSignatureMinor, setPayerSignatureMinor] = React.useState('')
  const [PayerSignatureBilling, setPayerSignatureBilling] = React.useState('')
  const [showSignature, setShowSignature] = React.useState(false);
  const [showSignature2, setShowSignature2] = React.useState(false);
  const [loader, setloader] = React.useState(true);
  const contentWidth = useWindowDimensions().width;

  const [personData, setPersonData] = React.useState([])

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
  const [counter, setCounter] = React.useState(1)

  const increment = () => {
    setCounter(parseInt(counter) + 1);
  }
  const decrement = () => {
    setCounter(parseInt(counter) - 1);
  }
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setloader(true)
      //console.log(props.route.params.contractId);
      if (contractData.length == 0) {
        clearData()
        setContractId(props.route.params.contractId)
        getContract()
        getPersonId()
        getPersonContract()

      }
    });
  })
  const clearData = () => {
    setCounter(1);
    setStep1(true);
    setStep2(false);
    setStep3(false);
    setUserPaymentSelected('');
    setPayerSignatureMinor('');
    setPayerSignatureBilling('');
    setPayerSignatureTerms('');
    setShowSignature(false);
    setShowSignature2(false)
  }
  function getContract() {
    fetch(`${apiUrl}/odata/Contract(${props.route.params.contractId})`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
    })
      .then(response => response.json())
      .then(data => {
        //  console.log(data)
        setHasMinor(data.hasMinor)
        setTerms(data.contractTermTemplate)
        setloader(false)
      });
    fetch(`${apiUrl}/odata/StudentProgramContractInfo(${props.route.params.contractId})`, {
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
        // console.log(response.value);
      });
  }
  const { navigation } = props;
  const steponeSubmit = () => {
    setStep1(false)
    if (hasMinor) {
      setStep2(true)
    } else {
      //setStep2(true)
      setStep3(true)
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
        // console.log(data)
        setPersonId(data.PersonId)
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
        setPaymentMethodCount(data.value.length)
        let methods = []
        data.value.map((method) => {
          methods.push({ label: method.Nickname, value: method.PersonPaymentMethodId });
          if(method.IsDefault){
            setUserPaymentSelected(method.PersonPaymentMethodId)
          }
        })
        setPaymentMethod(methods);
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
        // console.log(data)
        setContractData(data.value)
        let dateSolds = new Date(data.value[0].DateSold).toISOString().slice(0, 10);
        // console.log(dateSolds)
        setDateSold(dateSolds)
      });
  }
  const submitForm = () => {
    setSuccessMessage("");
    setErrorMessage("");
    if (userPaymentSelected == '') {
      setErrorMessage('Select Payment Method');
      return false
    }
    const apiUrl = API_URL.trim();
    console.log(userPaymentSelected)
    //  console.log('heres');
    setProcessing(true)
    fetch(`${apiUrl}/odata/Contract(${props.route.params.contractId})`, {
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
        setProcessing(false)
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
        setProcessing(false)
        setErrorMessage("An error has occurred.");
      });
  };
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Contract "} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <View style={loginStyle.contentContainer}>
          <View style={globalStyle.dflex}>
            <View style={[globalStyle.TopSection, { justifyContent: "flex-start" }]}>
              {step1 == false ?
                <Image style={{ height: 35, width: 35, resizeMode: 'contain', }} source={require('./../../../assets/lastCheck.png')} />
                :
                <Image style={{ height: 30, width: 30, resizeMode: 'contain', }} source={require('./../../../assets/activeicon.png')} />
              }
            </View>
            <View style={[globalStyle.TopSection, { marginLeft: 40 }]}>
              {step3 == true && counter == 1 ?
                <Image style={{ height: 30, width: 30, resizeMode: 'contain', }} source={require('./../../../assets/activeicon.png')} />
                :
                counter > 1 ?
                  <Image style={{ height: 35, width: 35, resizeMode: 'contain', }} source={require('./../../../assets/lastCheck.png')} />
                  :
                  <Image style={{ height: 20, width: 20, resizeMode: 'contain', }} source={require('./../../../assets/iconTop.png')} />
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
            <View style={[globalStyle.TopSection, { justifyContent: "flex-end", alignItems: "flex-end" }]}>
              {counter == 3 ?
                <Image style={{ height: 30, width: 30, resizeMode: 'contain', }} source={require('./../../../assets/activeicon.png')} />
                :
                counter > 3 ?
                  <Image style={{ height: 35, width: 35, resizeMode: 'contain', }} source={require('./../../../assets/lastCheck.png')} />
                  :
                  <Image style={{ height: 20, width: 20, resizeMode: 'contain', }} source={require('./../../../assets/iconTop.png')} />
              }
            </View>
            <View style={globalStyle.line}></View>
          </View>
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

                  }} >Signature</Text><Image style={{ height: 100, resizeMode: 'contain', borderColor: '#efefef', borderWidth: 1 }} source={{ uri: PayerSignatureTerms }} /></View>) : null}
                  <View>
                    <Button
                      style={[loginStyle.buttonsSecondary, { marginTop: 30, }]}
                      onPress={() => { setShowSignature(true) }} full>
                      <Text style={loginStyle.buttonText} >{PayerSignatureTerms != '' ? "Update Signature" : "Add Signature"}</Text>
                    </Button>
                  </View>
                  {PayerSignatureTerms != '' ? (
                    <View>
                      <ImageBackground
                        style={[globalStyle.Btn, {
                          width: '100%'
                        }]}
                        source={require('./../../../assets/Oval.png')}
                        resizeMode={'stretch'}
                      >
                        <Button
                          style={[loginStyle.buttons]}
                          onPress={steponeSubmit}
                          full>
                          <Text style={loginStyle.buttonText} >Submit</Text>
                        </Button>
                      </ImageBackground>
                    </View>
                  ) : null}
                </View>
                :
                <View style={{
                  paddingLeft: 20,
                  paddingRight: 20
                }} >
                  <Text style={{
                    fontSize: 24,
                    paddingLeft: 10,
                    fontWeight: "bold",
                    paddingBottom: 10
                  }}>Signature </Text>
                  <SignatureView
                    style={[globalStyle.signatureField]}
                    ref={signatureRef}
                    onSave={(val) => {
                      setPayerSignatureTerms(val)
                    }}
                    onClear={() => {
                      setPayerSignatureTerms('')
                    }}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: "flex-end", height: 50 }}>
                    <TouchableOpacity
                      style={{ justifyContent: 'center', alignItems: "flex-end", flex: 1 }}
                      onPress={() => {
                        signatureRef.current.clearSignature();
                      }}>
                      <Text style={{ paddingRight: 15, fontWeight: "bold", fontSize: 18 }}>Clear</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                      onPress={() => {
                        signatureRef.current.saveSignature();
                        setShowSignature(false)
                        setCheckNSignature(false)
                      }}>
                      <Text>Save</Text>
                    </TouchableOpacity> */}
                  </View>
                  <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                        onPress={() => {
                          signatureRef.current.saveSignature();
                          setShowSignature(false)
                          setCheckNSignature(false)
                        }} >
                        <Text style={loginStyle.buttonText}>Save</Text>
                      </Button>
                    </ImageBackground>
                    <Button
                      style={[loginStyle.buttonSecondarys, { marginTop: 20, width: "100%" }]}
                      onPress={() => { setShowSignature(false) }} >
                      <Text style={[loginStyle.buttonText, { color: "#333" }]}>Previous</Text>
                    </Button>
                  </View>
                </View>
              : step2 ?
                <View>
                  <View>
                    <H2 style={[globalStyle.h3, { fontSize: 23, textAlign: "center", marginTop: -10, marginBottom: 15 }]}>Student Minor Acknowledgement </H2>
                    <Text style={{
                      fontSize: 20,
                      paddingLeft: 10,
                      fontWeight: "bold",
                      paddingBottom: 10
                    }}>Signature </Text>
                    <SignatureView
                      style={[globalStyle.signatureField]}
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
                        style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}
                        onPress={() => {
                          signatureRef2.current.clearSignature();
                        }}>
                        <Text style={{ paddingRight: 15, fontWeight: "bold", fontSize: 18 }}>Clear</Text>
                      </TouchableOpacity>
                    </View>
                    <ImageBackground
                      style={[globalStyle.Btn, {
                        width: '100%',
                        alignItems: "center"
                      }]}
                      source={require('./../../../assets/Oval.png')}
                      resizeMode={'stretch'}
                    >
                      <Button
                        style={[loginStyle.buttonSave, { alignSelf: "center" }]}
                        onPress={stepTwoSubmit}
                        full>
                        <Text style={loginStyle.buttonText}>Submit</Text>
                      </Button>
                    </ImageBackground>
                  </View>
                </View>
                :
                paymentMethodCount > 0 ?
                  showSignature2 == false ?
                    <View style={{
                      marginTop: 0,
                      padding: 15,
                      paddingBottom: 30
                    }}>
                      {contractData.length > 0 ?
                        contractData.map(function (contact, index) {
                          const dateSolds = new Date(contact.DateSold).toISOString().slice(0, 10);
                          const dateStart = new Date(contact.StartDate).toISOString().slice(0, 10);
                          const endDate = new Date(contact.EndDate).toISOString().slice(0, 10);
                          return (
                            contact.ContractId == contractId ?
                              <View key={index}>
                                {counter == 1 ?
                                  <View>
                                    <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0 }}>General</Text>
                                    <View style={globalStyle.formField}>
                                      <Text style={globalStyle.formLabel}>Full name</Text>

                                      {contact.StudentFullNames.length > 0 ?
                                        contact.StudentFullNames.map(function (student, index) {
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
                                      <Text style={globalStyle.formLabel}>Full Price</Text>
                                      <Item style={globalStyle.formGroup} floatingLabel>
                                        <Input
                                          value={"$" + contact.FullPrice}
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
                                          value={"$" + contact.Discount}
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
                                      <Text style={globalStyle.formLabel}>End Date</Text>
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
                                      <Text style={globalStyle.formLabel}>Fee</Text>
                                      <Item style={globalStyle.formGroup} floatingLabel>
                                        <Input
                                          value={"$" + contact.Fee}
                                          style={globalStyle.formControls}
                                          placeholder="Fee"
                                          editable={false}
                                        />
                                      </Item>
                                    </View>
                                    <View style={globalStyle.formField}>
                                      <Text style={globalStyle.formLabel}>Down Payment</Text>
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
                                      <Text style={globalStyle.formLabel}>Fee</Text>
                                      <Item style={globalStyle.formGroup} floatingLabel>
                                        <Input
                                          value={"$" + personData[0].Fee}
                                          style={globalStyle.formControls}
                                          placeholder="Fee"
                                          editable={false}
                                        />
                                      </Item>
                                    </View>
                                    <View style={globalStyle.formField}>
                                      <Text style={globalStyle.formLabel}>Discount</Text>
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
                                      <Text style={globalStyle.formLabel}>Payment Schedule Discount</Text>
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
                                    <View style={globalStyle.formField}>
                                      <Text style={globalStyle.formLabel}>Finance Charge</Text>
                                      <Item style={globalStyle.formGroup} floatingLabel>
                                        <Input
                                          value={"$" + contact.FinanceCharge}
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
                                          value={"$" + contact.TransferCredit}
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
                                          value={"$" + contact.UnpaidBalance}
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
                                          value={contact.FrequencyType}
                                          style={globalStyle.formControls}
                                          placeholder="FrequencyType"
                                          editable={false}
                                        />
                                      </Item>
                                    </View>
                                    <View>
                                      <View style={[globalStyle.formField]}>
                                        <Text style={globalStyle.formLabel}>Select Payment Method</Text>
                                        <View style={globalStyle.formControls}>
                                          <RNPickerSelect
                                            value={userPaymentSelected}
                                            items={paymentMethod}
                                            placeholder={{
                                              label: 'Select Payment Method',
                                              value: null,
                                            }}
                                            onValueChange={(value) => setUserPaymentSelected(value)}
                                            style={{
                                              ...pickerSelectStyles,
                                              iconContainer: {
                                                top: Platform.OS === 'android' ? 20 : 30,
                                                right: 10,
                                              },
                                              placeholder: {
                                                color: '#8a898e',
                                                fontSize: 12,
                                                fontWeight: 'bold',
                                              },
                                            }}
                                            Icon={() => {
                                              return <Image
                                                style={{ width: 12, position: "absolute", top: -15, right: 15 }}
                                                source={require("../../../assets/arrow-down.png")}
                                                resizeMode={'contain'}
                                              />;
                                            }}
                                          />
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                  : null}
                                {counter == 4 ?
                                  <View>
                                    {PayerSignatureBilling != '' ? (
                                      <View style={{ marginTop: 20 }}>
                                        <Text style={{
                                          fontSize: 20,
                                          fontWeight: "bold",

                                        }} >Signature</Text><Image style={{ height: 100, width: 300, resizeMode: 'contain', }} source={{ uri: PayerSignatureBilling }} /></View>) : null}
                                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                                      <Button
                                        style={[loginStyle.buttonsSecondary]}
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
                                    {processing ?
                                      <View style={[styles.container, styles.horizontal]}>
                                        <ActivityIndicator size="large" color="#29ABE2" />
                                      </View> : null
                                    }
                                    {PayerSignatureBilling != '' ? (
                                      <View >
                                        <ImageBackground
                                          style={[globalStyle.Btn, {
                                            width: '100%'
                                          }]}
                                          source={require('./../../../assets/Oval.png')}
                                          resizeMode={'stretch'}
                                        >
                                          <Button
                                            style={[loginStyle.buttons]}
                                            onPress={submitForm}
                                            full>
                                            <Text style={loginStyle.buttonText} >Submit</Text>
                                          </Button>
                                        </ImageBackground>
                                      </View>
                                    ) : null}
                                  </View>
                                  : null}
                              </View>
                              : null
                          );
                        })
                        : null}
                    </View>
                    : <View style={{
                      paddingLeft: 20,
                      paddingRight: 20
                    }} >
                      <Text style={{
                        fontSize: 24,
                        paddingLeft: 10,
                        fontWeight: "bold",
                        paddingBottom: 10
                      }}>Signature </Text>
                      <SignatureView
                        style={[globalStyle.signatureField]}
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
                          style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}
                          onPress={() => {
                            signatureRef3.current.clearSignature();
                          }}>
                          <Text style={{ paddingRight: 15, fontWeight: "bold", fontSize: 18 }}>Clear</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                            onPress={() => {
                              signatureRef3.current.saveSignature();
                              setShowSignature2(false)

                            }} >
                            <Text style={[loginStyle.buttonText, { textAlign: "center" }]}>Save</Text>
                          </Button>
                        </ImageBackground>
                        <Button
                          style={[loginStyle.buttonSecondarys, { marginTop: 20, width: "100%" }]}
                          onPress={() => { setShowSignature2(false) }} >
                          <Text style={[loginStyle.buttonText, { color: "#333" }]}>Previous</Text>
                        </Button>
                      </View>
                    </View>
                  :
                  <View>
                    <View style={{
                      paddingLeft: 20,
                      paddingRight: 20
                    }} >
                      <H2 style={[globalStyle.h3, { fontSize: 20, textAlign: "center" }]}>Payment Method Required </H2>
                      <Text style={{ color: "#000", fontSize: 18, textAlign: "center", lineHeight: 30, marginTop: 20 }}>You don't have any payment method, Please add one and try again</Text>
                      <Button
                        style={[loginStyle.buttonSecondary, { marginTop: 30 }]}
                        onPress={() => props.navigation.navigate("Payment Method")} full>
                        <Text>Add Payment Method</Text>
                      </Button>

                    </View>
                  </View>
          }
        </View>
        {step3 == true ?
          showSignature2 == false ?
            <View style={{ display: "flex", flexDirection: "columns", alignItems: "center", marginBottom: 0, paddingLeft: 40, paddingRight: 40, marginTop: 0 }}>
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
                  style={counter == 4 ? [loginStyle.buttonSecondarys, { marginTop: 0, borderRadius: 20, alignSelf: "middle", width: "100%" }] : [loginStyle.buttonSecondarys, { marginTop: 20, width: "100%" }]}
                  onPress={decrement} >
                  <Text style={[loginStyle.buttonText, { color: "#333" }]}>Previous</Text>
                </Button>
                : null}
            </View>
            : null
          : null}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: '#fff',
    borderRadius: 0,
    color: '#8a898e',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 0,
    borderColor: '#fff',
    borderRadius: 0,
    color: '#8a898e',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
