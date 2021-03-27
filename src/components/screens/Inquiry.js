import React from "react";
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, } from "react-native";
import { API_URL } from "@env";
import { Picker } from "@react-native-community/picker";
import CheckBox from "@react-native-community/checkbox";
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
import { SignatureView } from 'react-native-signature-capture-view';
const Inquiry = (props) => {
  
  const signatureRef = React.useRef(null);
  const [signature, setSignature] = React.useState('')
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [secondaryemail, setSecondaryemail] = React.useState("");

  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");

  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");

  const [phone1, setPhone1] = React.useState("");
  const [phone2, setPhone2] = React.useState("");
  const [phone3, setPhone3] = React.useState("");
  const [employer, setEmployer] = React.useState("");
  const [occupation, setOccupation] = React.useState("");

  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [checklastName, setChecklastName] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);

  const [checkCity, setCheckCity] = React.useState(false);
  const [checkState, setCheckState] = React.useState(false);
  const [checkZipCode, setCheckZipCode] = React.useState(false);


  const [checkAddress1, setCheckAddress1] = React.useState(false);
  const [checkPhone1, setCheckPhone1] = React.useState(false);
  const [checkEmployer, setCheckEmployer] = React.useState(false);
  const [checkOccupation, setCheckOccupation] = React.useState(false);


  const [checkAdultBenifit, setCheckAdultBenifit] = React.useState(false);
  const [checkChildBenifit, setCheckChildBenifit] = React.useState(false);
  const [checkNSignature, setCheckNSignature] = React.useState(false);
  const [showSignature, setShowSignature] = React.useState(false);
  const [inquiry, setInquiry] = React.useState("");
  const [SuccessMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };
  const userId = useSelector(state => state);
  const enquiry = [
    {
      label: 'Auction',
      value: '1',
    },
    {
      label: 'Auto Show',
      value: '2',
    },
    {
      label: 'Back to school pc',
      value: '3',
    },
    {
      label: 'Birthday Party',
      value: '4',
    },
    {
      label: 'Bring a Friend',
      value: '5',
    },
    {
      label: 'Buddy Week',
      value: '6',
    },

  ];
  const stateList = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
  const adultBenefitsList = [
    { id: 1, txt: 'Fitness', isChecked: false },
    { id: 2, txt: 'Family Time', isChecked: false },
    { id: 3, txt: 'Confidence', isChecked: false },
    { id: 4, txt: 'Self Defense', isChecked: false },
    { id: 5, txt: 'Improve Focus', isChecked: false },
    { id: 6, txt: 'New Activity', isChecked: false },
  ];
  const childrenBenefitsList = [
    { id: 1, txt: 'Fitness', isChecked: false },
    { id: 2, txt: 'Confidence', isChecked: false },
    { id: 3, txt: 'Socialization', isChecked: false },
    { id: 4, txt: 'Discipline', isChecked: false },
    { id: 5, txt: 'Fun Activity', isChecked: false },
    { id: 6, txt: 'Focus', isChecked: false },
  ];

  const [adultBenefits, setAdultBenefits] = React.useState(adultBenefitsList);
  const [childrenBenefits, setChildrenBenefits] = React.useState(childrenBenefitsList);

  const handleChange = (id) => {
    let temp = adultBenefits.map((adultBenefits) => {
      if (id === adultBenefits.id) {
        return { ...adultBenefits, isChecked: !adultBenefits.isChecked };
      }
      return adultBenefits;
    });
    setAdultBenefits(temp);
  };
  const handleChangeBenifits = (id) => {
    let temp = childrenBenefits.map((childrenBenefits) => {
      if (id === childrenBenefits.id) {
        return { ...childrenBenefits, isChecked: !childrenBenefits.isChecked };
      }
      return childrenBenefits;
    });
    setChildrenBenefits(temp);
  };


  // Setting data to variables and validations

  const setfirstName = (event) => {
    setFirstName(event);
    if (event == "") {
      setCheckFirstname(true);
    } else {
      setCheckFirstname(false);
    }
  };

  const setlasttName = (event) => {
    setLastName(event);
    if (event == "") {
      setChecklastName(true);
    } else {
      setChecklastName(false);
    }
  };
  const setaddress1 = (event) => {
    setAddress1(event);
    if (event == "") {
      setCheckAddress1(true);
    } else {
      setCheckAddress1(false);
    }
  };
  const setaddress2 = (event) => {
    setAddress2(event);
  };
  const setcity = (event) => {
    setCity(event);
    if (event == "") {
      setCheckCity(true);
    } else {
      setCheckCity(false);
    }
  };
  const setstate = (event) => {
    setState(event.itemValue);
    if (event == "") {
      setCheckState(true);
    } else {
      setCheckState(false);
    }
  };
  const setzipCode = (event) => {
    setZipCode(event);
    if (event == "") {
      setCheckZipCode(true);
    } else {
      setCheckZipCode(false);
    }
  };

  const setemail = (event) => {
    setEmail(event);
    if (event == "") {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };
  const setsecondaryemail = (event) => {
    setSecondaryemail(event);
  };

  const setphone1 = (event) => {
    setPhone1(event);
    if (event == "") {
      setCheckPhone1(true);
    } else {
      setCheckPhone1(false);
    }
  };
  const setphone2 = (event) => {
    setPhone2(event);
  };
  const setphone3 = (event) => {
    setPhone3(event);
  };
  const setemployer = (event) => {
    setEmployer(event);
    if (event == "") {
      setCheckEmployer(true);
    } else {
      setCheckEmployer(false);
    }
  };
  const setoccupation = (event) => {
    setOccupation(event);
    if (event == "") {
      setCheckOccupation(true);
    } else {
      setCheckOccupation(false);
    }
  };

  //Form Submission
  const submitForm = () => {
    setErrorMessage('')
    setSuccessMessage('')
    setCheckAdultBenifit(false);
    setCheckChildBenifit(false);
    setCheckNSignature(false)
    if (firstName == "") {
      setCheckFirstname(true);
      return false;
    }
    if (lastName == "") {
      setChecklastName(true)
      return false;
    }
    if (address1 == "") {
      setCheckAddress1(true);
      return false;
    }
    if (city == "") {
      setCheckCity(true);
      return false;
    }
    if (zipCode == "") {
      setCheckZipCode(true);
      return false;
    }
    if (state == "") {
      setCheckState(true);
      return false;
    }
    if (email == "") {
      setCheckEmail(true);
      return false;
    }
    let checkemail = ValidateEmail(email);
    if (checkemail == false) {
      setCheckEmail(true);
      return false;
    }


    if (phone1 == "") {
      setCheckPhone1(true);
      return false;
    }
    if (employer == "") {
      setCheckEmployer(true);
      return false;
    }
    if (occupation == "") {
      setCheckOccupation(true);
      return false;
    }

    let selected = adultBenefits.filter((adultBenefits) => adultBenefits.isChecked);
    let selectedBenifts = childrenBenefits.filter((childrenBenefits) => childrenBenefits.isChecked);
    let adultSelectedBenifits = selected.map(a => a.txt);
    let childSelectedBenifits = selectedBenifts.map(a => a.txt);

    if (Array.isArray(adultSelectedBenifits) && !adultSelectedBenifits.length) {
      setCheckAdultBenifit(true);
      return false;
    }
    if (Array.isArray(childSelectedBenifits) && !childSelectedBenifits.length) {
      setCheckChildBenifit(true);
      return false;
    }
    if (signature == '') {
      setCheckNSignature(true)
      return false;
    }
    // console.log(API_URL);
    // console.log("here")
    fetch(`${API_URL}/odata/Inquiry`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
      body: JSON.stringify({
        "Person": {
          "FirstName": firstName,
          "LastName":lastName,
          "Address1": address1,
          "Address2": address1,
          "City": city,
          "StateId": state,
          "PostalCode": zipCode,
          "Email": email,
          "Email2": secondaryemail,
          "Phone1": phone1,
          "Phone2": phone2,
          "Phone3": phone3,
          "Employer": employer,
          "Occupation": occupation
        },
        "InquiryTypeId": inquiry,
        "ChildrenBenefits": childSelectedBenifits,
        "AdultBenefits": adultSelectedBenifits,
        "SignatureUri": signature
      }),
    })
      .then((response) => {
        let jsonData = JSON.stringify(response);
        console.log(jsonData)
        let jsonDataPrase = JSON.parse(jsonData);
        console.log(jsonDataPrase.status)
        if (jsonDataPrase.status != 200) {
          setErrorMessage("An error has occurred.");
        } else {
          setSuccessMessage('Successfully Submitted.')
        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred.");
      });
  };
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Inquiry"} navigation={props.navigation} />
      <Content style={loginStyle.spacing} padder>
        <View style={loginStyle.backWrapper}>
          {/* <Image
            style={loginStyle.backButton}
            source={require("../../../assets/BackButton.png")}
          /> */}
        </View>
        <Body style={loginStyle.bodyContainer}>
          <H2 style={globalStyle.h2}>Inquiry!</H2>
          <Text style={globalStyle.small}>Fill out the form below </Text>
        </Body>
        {showSignature == false ?
          <Form>
            <View style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: "#f7f7f7",
              marginTop: 30,
              padding: 15,
              paddingBottom: 30
            }}>
              <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0 }}>Personal Information</Text>
              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={firstName}
                  onChangeText={(text) => setfirstName(text)}
                  style={
                    checkFirstname
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="First Name"
                />
              </Item>
              {checkFirstname ? (
                <Text style={globalStyle.error}>Enter First Name</Text>
              ) : null}
              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={lastName}
                  onChangeText={(text) => setlasttName(text)}
                  style={globalStyle.formControl}
                  placeholder="Last Name"
                />
              </Item>
              {checklastName ? (
                <Text style={globalStyle.error}>Enter Last Name </Text>
              ) : null}
              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={address1}
                  onChangeText={(text) => setaddress1(text)}
                  style={
                    checkAddress1
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="Address1"
                />
              </Item>
              {checkAddress1 ? (
                <Text style={globalStyle.error}>Enter Address </Text>
              ) : null}
              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={address2}
                  onChangeText={(text) => setaddress2(text)}
                  style={globalStyle.formControl}
                  placeholder="Address2"
                />
              </Item>

              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={city}
                  onChangeText={(text) => setcity(text)}
                  style={
                    checkCity
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="City "
                />
              </Item>
              {checkCity ? (
                <Text style={globalStyle.error}>Enter City</Text>
              ) : null}

              <Text style={{
                marginBottom: 10,
                marginTop: 0
              }}></Text>
              <View style={globalStyle.formControl}>
                <Picker
                  selectedValue={state}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue, itemIndex) => setstate({ itemValue })}
                >
                  <Picker.Item label="State" value="" />
                  {stateList.map((data, index) => <Picker.Item key={data.index + data} label={data} value={index + 1} />)}

                </Picker>
              </View>
              {checkState ? (
                <Text style={globalStyle.error}>Enter State</Text>
              ) : null}

              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={zipCode}
                  onChangeText={(text) => setzipCode(text)}
                  style={
                    checkZipCode
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="Postal Code"
                />
              </Item>
              {checkZipCode ? (
                <Text style={globalStyle.error}>Enter ZipCode</Text>
              ) : null}

              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={email}
                  onChangeText={(text) => setemail(text)}
                  style={
                    checkEmail
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="Primary Email "
                />
              </Item>
              {checkEmail ? (
                <Text style={globalStyle.error}>Enter Valid Email</Text>
              ) : null}
              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={secondaryemail}
                  onChangeText={(text) => setsecondaryemail(text)}
                  style={globalStyle.formControl}
                  placeholder="Secondary Email "
                />
              </Item>

              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={phone1}
                  onChangeText={(text) => setphone1(text)}
                  style={
                    checkPhone1
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="Phone1"
                />
              </Item>
              {checkPhone1 ? (
                <Text style={globalStyle.error}>Enter Phone Number </Text>
              ) : null}

              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={phone2}
                  onChangeText={(text) => setphone2(text)}
                  style={globalStyle.formControl}
                  placeholder="Phone2"
                />
              </Item>

              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={phone3}
                  onChangeText={(text) => setphone3(text)}
                  style={globalStyle.formControl}
                  placeholder="Phone3"
                />
              </Item>

              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={employer}
                  onChangeText={(text) => setemployer(text)}
                  style={
                    checkEmployer
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="Employer"
                />
              </Item>
              {checkEmployer ? (
                <Text style={globalStyle.error}>Enter Employement </Text>
              ) : null}

              <Item style={globalStyle.formGroup} floatingLabel>
                <Input
                  value={occupation}
                  onChangeText={(text) => setoccupation(text)}
                  style={
                    checkOccupation
                      ? globalStyle.formControlError
                      : globalStyle.formControl
                  }
                  placeholder="Occupation"
                />
              </Item>
              {checkOccupation ? (
                <Text style={globalStyle.error}>Enter Occupation </Text>
              ) : null}
            </View>
            {/* <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={InquiryTypeId}
              onChangeText={(text) => setsource(text)}
              style={
                checkSource
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              } style={globalStyle.formControl}
              placeholder="Source"
            />
          </Item>
          {checkSource ? (
            <Text style={globalStyle.error}>Enter Source </Text>
          ) : null} */}
            <View style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: "#f7f7f7",
              marginTop: 30,
              padding: 10
            }}>
              <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Additional Information</Text>
              <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>How did you find out about our school?</Text>
              <View style={globalStyle.formControl}>
                <Picker
                  selectedValue={inquiry}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue, itemIndex) => setInquiry(itemValue)}
                >
                  {enquiry.map((data) => <Picker.Item key={data.label + data.value} label={data.label} value={data.value} />)}
                </Picker>
              </View>

              <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", lineHeight: 26, marginBottom: 10, marginTop: 20 }}>Please check the benefits you are interested in:</Text>
              <View >
                {adultBenefits.map((item) => (<View
                  key={item.id + item.txt}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: "center"
                  }}>
                  <CheckBox

                    value={item.isChecked}
                    onChange={() => {
                      handleChange(item.id);
                    }}
                  />
                  <Text style={{
                    fontSize: 20,
                    paddingLeft: 10
                  }}>{item.txt}</Text>
                </View>))}
                {checkAdultBenifit ? (
                  <Text style={globalStyle.error}>Please Check Options </Text>
                ) : null}
              </View>
              <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", lineHeight: 26, marginBottom: 10, marginTop: 20 }}>Please check the benefits Child interested in:</Text>
              <View >
                {childrenBenefits.map((item) => (<View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: "center"
                  }}
                  key={item.id + 100}
                >
                  <CheckBox

                    value={item.isChecked}
                    onChange={() => {
                      handleChangeBenifits(item.id);
                    }}
                  />
                  <Text style={{
                    fontSize: 20,
                    paddingLeft: 10
                  }}>{item.txt}</Text>
                </View>))}
                {checkChildBenifit ? (
                  <Text style={globalStyle.error}>Please Check Options </Text>
                ) : null}
              </View>
              {signature != '' ? (<View style={{ marginTop: 20 }}><Text>Signature</Text><Image style={{ height: 100, width: 300, resizeMode: 'contain', }} source={{ uri: signature }} /></View>) : null}
            </View>
            <Button
              style={loginStyle.button, { marginTop: 30 }}
              onPress={() => { setShowSignature(true) }} full>
              <Text>{signature != '' ? "Change Signature" : "Add Signature"}</Text>
            </Button>
            {checkNSignature != "" ? (
              <Text style={globalStyle.errorText}>Signature Required</Text>
            ) : null}
            {errorMessage != "" ? (
              <Text style={globalStyle.errorText}>{errorMessage}</Text>
            ) : null}
            {SuccessMessage != "" ? (
              <Text style={globalStyle.sucessText}>{SuccessMessage}</Text>
            ) : null}
            <Content style={loginStyle.formContainer}>
              <Button onPress={submitForm} style={loginStyle.button} full>
                <Text>Send</Text>
              </Button>
            </Content>
          </Form>
          :
          <View >
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
                setSignature(val)
              }}
              onClear={() => {
                setSignature('')
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
              style={loginStyle.button, { marginTop: 30 }}
              onPress={() => { setShowSignature(false) }} full>
              <Text>Back</Text>
            </Button>
          </View>
        }
      </Content>
    </Container>
  );
};
export default Inquiry;
