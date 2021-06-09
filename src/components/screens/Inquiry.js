import React, { Children } from "react";
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import { API_URL } from "./../Utility/AppConst";
import { Picker } from '@react-native-picker/picker';
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
  const [counter, setCounter] = React.useState(1)
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

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      clearData()
    })
  })

  const clearData = () => {
    setFirstName('');
    setLastName('');
    setAddress1('');
    setAddress2('');
    setEmail('');
    setSecondaryemail('');
    setState('');
    setZipCode('');
    setOccupation('');
    setCity('');
    setCounter(1);
    setPhone1('');
    setPhone2('');
    setPhone3('');
    setSignature('');
    setEmployer('');
    setShowSignature(false);
    setInquiry('');
    setChildrenList([]);
    setCounters(0)
  }
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

  const [childrenList, setChildrenList] = React.useState([]);
  const [counters, setCounters] = React.useState(0);

  const increment = () => {
    setCounter(parseInt(counter) + 1);
  }
  const decrement = () => {
    setCounter(parseInt(counter) - 1);
  }
  const addSection = () => {
    let newArr = [...childrenList];
    newArr[counters] = {
      FirstName: "",
      LastName: "",
      DOB: "",
    };
    setCounters(parseInt(counters) + 1);
    setChildrenList(newArr);
  };
  const deleteSection = (e) => {
    setCounters(parseInt(counters) - 1);
    childrenList.splice(e, 1);
  };

  const updateFirstNameField = (e, index) => {
    let newArr = [...childrenList]; // copying the old datas array
    newArr[index] = {
      FirstName: e,
      LastName: newArr[index].LastName,
      DOB: newArr[index].DOB
    };
    setChildrenList(newArr);
  };
  const updatelastNameField = (e, index) => {
    let newArr = [...childrenList]; // copying the old datas array
    newArr[index] = {
      FirstName: newArr[index].FirstName,
      LastName: e,
      DOB: newArr[index].DOB
    };
    setChildrenList(newArr);
  };
  // const updateDobField = (index) => (e) => {
  //   let newArr = [...childrenList]; // copying the old datas array
  //   newArr[index] = {
  //     FirstName: newArr[index].FirstName,
  //     LastName: newArr[index].LastName,
  //     DOB: e.target.value
  //   };
  //   setChildrenList(newArr);
  // };
  function checkValue(str, max) {
    if (str.charAt(0) !== '0' || str == '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? '0' + num
          : num.toString();
    }
    return str;
  }
  const dateTimeInputChangeHandler = (e, index) => {
    var input = e;
    var expr = new RegExp(/\D\/$/);
    if (expr.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split('/').map(function (v) {
      return v.replace(/\D/g, '');
    });
    if (values[1]) values[1] = checkValue(values[1], 12);
    if (values[0]) values[0] = checkValue(values[0], 31);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + '/' : v;
    });
    // this.setState({
    //   registrationDate: output.join('').substr(0, 14),
    // });
    let newArr = [...childrenList]; // copying the old datas array
    newArr[index] = {
      FirstName: newArr[index].FirstName,
      LastName: newArr[index].LastName,
      DOB: output.join('').substr(0, 14)
    };
    setChildrenList(newArr);
  };
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
    console.log("here")
    setErrorMessage('')
    setSuccessMessage('')
    setCheckAdultBenifit(false);
    setCheckChildBenifit(false);
    setCheckNSignature(false)
    if (firstName == "") {
      setErrorMessage('Enter First Name')
      setCheckFirstname(true);
      return false;
    }
    if (lastName == "") {
      setErrorMessage('Enter Last Name')
      setChecklastName(true)
      return false;
    }
    if (address1 == "") {
      setErrorMessage('Enter Address ')
      setCheckAddress1(true);
      return false;
    }
    if (city == "") {
      setErrorMessage('Enter City ')
      setCheckCity(true);
      return false;
    }
    if (zipCode == "") {
      setErrorMessage('Enter Postal Code ')
      setCheckZipCode(true);
      return false;
    }
    if (state == "") {
      setErrorMessage('Enter State ')
      setCheckState(true);
      return false;
    }
    if (email == "") {
      setErrorMessage('Enter Email')
      setCheckEmail(true);
      return false;
    }
    let checkemail = ValidateEmail(email);
    if (checkemail == false) {
      setErrorMessage('Enter Valid Email')
      setCheckEmail(true);
      return false;
    }


    if (phone1 == "") {
      setErrorMessage('Enter Phone')
      setCheckPhone1(true);
      return false;
    }
    if (employer == "") {
      setErrorMessage('Enter Employer')
      setCheckEmployer(true);
      return false;
    }
    if (occupation == "") {
      setErrorMessage('Enter Occupation')
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
    console.log("here")
    // var children = '';
    // // var children = [];
    // childrenList.map((data, index) => {
    //   // let datas = JSON.stringify(data);
    //   // children.push(datas);
    //   if (index == 0) {
    //     children = children + data.FirstName + "|" + data.LastName + "|" + data.DOB;
    //   }
    //   else {
    //     children = children + "!" + data.FirstName + "|" + data.LastName + "|" + data.DOB;

    //   }

    // })
    var children = "John|Smith|02/06/1990!Jason|Smith|02/06/2000";
    console.log(children);
    const apiUrl = API_URL.trim();
    fetch(`${apiUrl}/odata/Inquiry`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
      body: JSON.stringify({
        "Person": {
          "FirstName": firstName,
          "LastName": lastName,
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
        "Children": children,
        "InquiryTypeId": inquiry,
        "ChildrenBenefits": childSelectedBenifits,
        "AdultBenefits": adultSelectedBenifits,
        "SignatureUri": signature
      }),
    })
      .then((response) => {
        // console.log("hererssssssssss")
        let jsonData = JSON.stringify(response);
        // console.log(jsonData)
        let jsonDataPrase = JSON.parse(jsonData);
        // console.log(jsonDataPrase.status)
        if (jsonDataPrase.status != 200) {
          setErrorMessage("An error has occurred.");
        } else {
          setSuccessMessage('Successfully Submitted.')
        }
      })
      .catch((response) => {
        console.log(response)
        setErrorMessage("An error has occurred.");
      });
  };

  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Inquiry"} navigation={props.navigation} />
      <Content style={loginStyle.spacing} >
        {/* <ImageBackground
          style={{
            width: "100%",
            height: 150,
            position: "absolute"
          }}
          source={require('./../../../assets/bg3.png')}
          resizeMode={'stretch'}
        >
        </ImageBackground> */}

        <View style={loginStyle.contentContainer}>
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

          <Form>
            <View style={{
              marginTop: 10,
              padding: 15,
              paddingBottom: 30
            }}>
              {counter == 1 ?
                <View>
                  <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 0 }}>Personal Information</Text>
                  <View style={checkFirstname
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>First Name</Text>
                    <Input
                      value={firstName}
                      onChangeText={(text) => setfirstName(text)}
                      style={globalStyle.formControls
                      }
                      placeholder="First Name"
                    />
                  </View>
                  {checkFirstname ? (
                    <Text style={globalStyle.error}>Enter First Name</Text>
                  ) : null}
                  <View style={checklastName
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Last Name</Text>
                    <Input
                      value={lastName}
                      onChangeText={(text) => setlasttName(text)}
                      style={globalStyle.formControls}
                      placeholder="Last Name"
                    />
                  </View>
                  {checklastName ? (
                    <Text style={globalStyle.error}>Enter Last Name </Text>
                  ) : null}
                  <View style={checkAddress1
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Primary Address</Text>
                    <Input
                      value={address1}
                      onChangeText={(text) => setaddress1(text)}
                      style={globalStyle.formControls
                      }
                      placeholder="Primary Address"
                    />
                  </View>
                  {checkAddress1 ? (
                    <Text style={globalStyle.error}>Enter Address </Text>
                  ) : null}
                  <View style={globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Secondary Address</Text>
                    <Input
                      value={address2}
                      onChangeText={(text) => setaddress2(text)}
                      style={globalStyle.formControls}
                      placeholder="Secondary Address"
                    />
                  </View>

                  <View style={checkCity
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>City</Text>
                    <Input
                      value={city}
                      onChangeText={(text) => setcity(text)}
                      style={globalStyle.formControls
                      }
                      placeholder="City "
                    />
                  </View>
                  {checkCity ? (
                    <Text style={globalStyle.error}>Enter City</Text>
                  ) : null}

                  <View style={checkState
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>State</Text>
                    <View style={globalStyle.formControls}>
                      <Picker
                        selectedValue={state}
                        style={{ height: 50, width: '100%', fontSize: 24 }}
                        onValueChange={(itemValue, itemIndex) => setstate({ itemValue })}
                      >
                        <Picker.Item label="State" value="" />
                        {stateList.map((data, index) => <Picker.Item key={data.index + data} label={data} value={index + 1} />)}

                      </Picker>
                    </View>
                  </View>
                  {checkState ? (
                    <Text style={globalStyle.error}>Enter State</Text>
                  ) : null}

                  <View style={checkZipCode
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Postal Code</Text>
                    <Input
                      value={zipCode}
                      onChangeText={(text) => setzipCode(text)}
                      style={globalStyle.formControls}
                      placeholder="Postal Code"
                    />
                  </View>
                  {checkZipCode ? (
                    <Text style={globalStyle.error}>Enter ZipCode</Text>
                  ) : null}

                  <View style={checkEmail
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Primary Email</Text>
                    <Input
                      value={email}
                      onChangeText={(text) => setemail(text)}
                      style={globalStyle.formControls
                      }
                      placeholder="Primary Email "
                    />
                  </View>
                  {checkEmail ? (
                    <Text style={globalStyle.error}>Enter Valid Email</Text>
                  ) : null}
                  <View style={globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Secondary Email</Text>
                    <Input
                      value={secondaryemail}
                      onChangeText={(text) => setsecondaryemail(text)}
                      style={globalStyle.formControls}
                      placeholder="Secondary Email "
                    />
                  </View>

                  <View style={checkPhone1
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Primary Phone</Text>
                    <Input
                      value={phone1}
                      onChangeText={(text) => setphone1(text)}
                      style={globalStyle.formControls
                      }
                      placeholder="Primary Phone"
                    />
                  </View>
                  {checkPhone1 ? (
                    <Text style={globalStyle.error}>Enter Phone Number </Text>
                  ) : null}

                  <View style={globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Secondary Phone</Text>
                    <Input
                      value={phone2}
                      onChangeText={(text) => setphone2(text)}
                      style={globalStyle.formControls}
                      placeholder="Secondary Phone"
                    />
                  </View>

                  <View style={globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Other Phone</Text>
                    <Input
                      value={phone3}
                      onChangeText={(text) => setphone3(text)}
                      style={globalStyle.formControls}
                      placeholder="Other Phone"
                    />
                  </View>

                  <View style={checkEmployer
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Employer</Text>
                    <Input
                      value={employer}
                      onChangeText={(text) => setemployer(text)}
                      style={globalStyle.formControls}
                      placeholder="Employer"
                    />
                  </View>
                  {checkEmployer ? (
                    <Text style={globalStyle.error}>Enter Employement </Text>
                  ) : null}

                  <View style={checkEmployer
                    ? globalStyle.formFieldError : globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Occupation</Text>
                    <Input
                      value={occupation}
                      onChangeText={(text) => setoccupation(text)}
                      style={globalStyle.formControls
                      }
                      placeholder="Occupation"
                    />
                  </View>
                  {checkOccupation ? (
                    <Text style={globalStyle.error}>Enter Occupation </Text>
                  ) : null}
                </View>
                : null}
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
            {counter == 2 ?
              <View style={{
                marginTop: -20,
                padding: 10,
                paddingLeft: 20
              }}>
                <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Child Information</Text>
                {typeof childrenList != undefined && childrenList.length
                  ? childrenList.map((data, index) => {
                    return (
                      <View key={index}>
                        <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold", marginBottom: 0, marginTop: 20 }}>Enter Details Below</Text>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>First Name</Text>
                          <Input
                            value={data.FirstName}
                            onChangeText={(text) => updateFirstNameField(text, index)}
                            style={globalStyle.formControls}
                            placeholder="First Name"
                          />
                        </View>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>Last Name</Text>
                          <Input
                            value={data.LastName}
                            onChangeText={(text) => updatelastNameField(text, index)}
                            style={globalStyle.formControls}
                            placeholder="Last Name"
                          />
                        </View>
                        <View style={globalStyle.formField}>
                          <Text style={globalStyle.formLabel}>DOB</Text>
                          <TextInput
                            keyboardType="number-pad"
                            style={[globalStyle.formControls, { marginTop: 10 }]}
                            maxLength={10}
                            placeholder="DD/MM/YYYY"
                            onChangeText={(e) => dateTimeInputChangeHandler(e, index)}
                            value={data.DOB}
                          />
                        </View>
                      </View>
                    );
                  })
                  : null}

                <View style={{ paddingTop: 20, paddingBottom: 20, }}>
                  <Button onPress={addSection}
                    style={[loginStyle.buttonsSecondary]} full><Image
                      style={{height:15, marginRight:-10}}
                      source={require("../../../assets/plus.png")}
                      resizeMode={'contain'}
                    /><Text style={loginStyle.buttonText}>Add Child Details</Text></Button>
                </View>
              </View>
              : null}
            {counter == 3 ?
              <View style={{
                marginTop: -30,
                padding: 10,
                paddingLeft: 20
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
              </View>
              : null}
            {counter == 4 ?
              showSignature == false ?
                <View style={{ marginTop: -30 }}>
                  <Text style={{ color: "#000", fontSize: 30, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>Signature</Text>
                  {signature != '' ? (<View style={{ marginTop: 20 }}><Text style={{
                    fontSize: 20,
                    fontWeight: "bold",

                  }} >Signature</Text><Image style={{ height: 100, width: 300, resizeMode: 'contain', }} source={{ uri: signature }} /></View>) : null}

                  <Button
                    style={[loginStyle.buttonsSecondary, { marginTop: 30, marginBottom: 30 }]}
                    onPress={() => { setShowSignature(true) }} full>
                    <Text style={loginStyle.buttonText} >{signature != '' ? "Update Signature" : "Add Signature"}</Text>
                  </Button>
                  <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {checkNSignature != "" ? (
                      <Text style={globalStyle.errorText}>Signature Required</Text>
                    ) : null}
                    {errorMessage != "" ? (
                      <Text style={globalStyle.errorText}>{errorMessage}</Text>
                    ) : null}
                    {SuccessMessage != "" ? (
                      <Text style={globalStyle.sucessText}>{SuccessMessage}</Text>
                    ) : null}
                    {signature != '' ?
                      <Content style={loginStyle.formContainer}>
                        <ImageBackground
                          style={[globalStyle.Btn, {
                            width: '100%'
                          }]}
                          source={require('./../../../assets/Oval.png')}
                          resizeMode={'stretch'}
                        >
                          <Button onPress={submitForm} style={loginStyle.buttons} full>
                            <Text style={loginStyle.buttonText} >Send</Text>
                          </Button>
                        </ImageBackground>
                      </Content>
                      : null}
                  </View>
                </View>
                :
                <View >
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
                      setSignature(val)
                    }}
                    onClear={() => {
                      setSignature('')
                    }}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'center', height: 50 }}>
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
                  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Button
                      style={[loginStyle.buttonSecondarys, { marginTop: 20, width: "50%" }]}
                      onPress={() => { setShowSignature(false) }} >
                      <Text style={[loginStyle.buttonText, { color: "#333" }]}>Previous</Text>
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
                        onPress={() => {
                          signatureRef.current.saveSignature();
                          setShowSignature(false)
                          setCheckNSignature(false)
                        }} >
                        <Text style={loginStyle.buttonText}>Save</Text>
                      </Button>
                    </ImageBackground>
                  </View>
                </View>
              : null}
            {showSignature == false ?
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 50, paddingLeft: 20, paddingRight: 20, marginTop: 50 }}>
                {counter > 1 ?
                  <Button
                    style={counter == 4 ? [loginStyle.buttonSecondarys, { marginTop: 20, width: "100%" }] : [loginStyle.buttonSecondarys, { marginTop: 20, width: "50%" }]}
                    onPress={decrement} >
                    <Text style={[loginStyle.buttonText, { color: "#333" }]}>Previous</Text>
                  </Button>
                  : null}
                {counter < 4 ?
                  <ImageBackground
                    style={counter == 1 ? globalStyle.BtnFull : [globalStyle.BtnHalf, { width: '50%' }]
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
              </View>
              : null}
          </Form>

        </View>
      </Content>
    </Container>
  );
};
export default Inquiry;
